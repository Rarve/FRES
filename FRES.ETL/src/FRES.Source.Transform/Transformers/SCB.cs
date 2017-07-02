using FRES.Common;
using FRES.Data;
using FRES.Source.Transform;
using FRES.Structure;
using Microsoft.Azure.Documents.Spatial;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;

namespace FRES.Source.Transform
{
    public class SCB : Transformer
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const int PARALLELISM_DEGREE = 5;

        public SCB()
        {
            Client = new HttpClientHelper();
        }

        public override void Transform()
        {
            var objs = DataHelper.GetRealEstateE("SCB", int.Parse(DateTime.UtcNow.ToString("yyyyMMdd")));
            GetDetails(objs.ToArray());
        }

        public override void GetDetails(SourceObj[] objs)
        {
            objs.AsParallel()
                .WithDegreeOfParallelism(PARALLELISM_DEGREE)
                .ForAll(urlDetail => GetDetails(urlDetail));
        }

        public override void GetDetails(SourceObj obj)
        {
            Console.WriteLine(obj.Url);
            var re = new RealEstateObj();
            var doc = new HtmlAgilityPack.HtmlDocument();
            try
            {
                if (string.IsNullOrEmpty(obj.Data))
                {
                    obj.Data = Client.GetStringGet(obj.Url).Result;
                }

                doc.LoadHtml(obj.Data);

                if (string.IsNullOrEmpty(obj.RealEstateJson))
                    re = new RealEstateObj();
                else
                    re = obj.RealEstateJson.Deserialize<RealEstateObj>();

                re.Url = obj.Url;

                var isSoldout = doc.DocumentNode.Descendants("a")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("thumb-label label-sold-s")).FirstOrDefault();

                if (isSoldout != null)
                {
                    re.IsSoldOut = true;
                }

                re.Url = obj.Url;
                re.Source = SourceName;

                re.Icon = URL_MAIN + doc.DocumentNode.Descendants("p")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("Thumb-s"))
                            .FirstOrDefault().ChildNodes["img"].GetAttributeValue("src", string.Empty);

                var html = doc.DocumentNode.Descendants("div").Where(x => x.Id == "Lname").FirstOrDefault().ParentNode.ParentNode.InnerHtml;
                html = WebUtility.HtmlDecode(html);
                var titleDetails = RegexHelper.SplitTag(html);

                re.Name = titleDetails[0];
                re.PropertyType = titleDetails[0].Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();

                if (titleDetails[1].Contains("ไร่-งาน-วา"))
                {
                    var tmp = titleDetails[1].Split(new char[] { '-', ' ' }).Select(x => x.Replace('(', ' ').Replace(')', ' ')).ToList();
                    if (tmp.Count == 6)
                    {
                        var rai = decimal.Parse(tmp[0]) * 400;
                        var ngn = decimal.Parse(tmp[1]) * 100;
                        var war = decimal.Parse(tmp[2]);
                        re.SizeTotal = (rai + ngn + war).ToString();
                        re.SizeTotalUnit = "ตร.ว.";
                    }
                }
                else if (titleDetails[1].Contains("ตร.ม."))
                {
                    var tmp = titleDetails[1].Split(new char[] { '-', ' ' }).Select(x => x.Replace('(', ' ').Replace(')', ' ')).ToList();
                    if (tmp.Count == 4)
                    {
                        re.SizeTotal = tmp[2].GetMatchStr(RegexHelper.REGEX_NUMBER).FirstOrDefault();
                        re.SizeTotalUnit = "ตร.ม.";
                    }
                }

                re.SizeTotalText = titleDetails[1];


                if (titleDetails.Length > 3)
                {
                    re.BedRoom = titleDetails[2];
                    re.BathRoom = titleDetails[4];
                    re.ParkingSpace = titleDetails[6];
                    re.Price = titleDetails[8].GetMatchStr(RegexHelper.REGEX_MONEY).FirstOrDefault().ToDecimal();
                }
                else
                {
                    re.Price = titleDetails[2].GetMatchStr(RegexHelper.REGEX_MONEY).FirstOrDefault().ToDecimal();
                }

                var detailTitles = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2"))
                            .Select(x => WebUtility.HtmlDecode(RegexHelper.StripHTML(x.PreviousSibling.InnerHtml))).ToList();

                var detailDescs = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2"))
                            .Select(x => WebUtility.HtmlDecode(RegexHelper.StripHTML(x.InnerHtml))).ToList();

                var details = new Dictionary<string, string>();

                for (int i = 0; i < detailTitles.Count(); i++)
                {
                    details.Add(detailTitles[i], detailDescs[i]);
                }

                //var price = doc.DocumentNode.Descendants("div")
                //            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("price")).FirstOrDefault().InnerHtml;

                re.Code = details.ContainsKey("รหัสทรัพย์:") ? details["รหัสทรัพย์:"] : string.Empty;
                re.SizeTotal = string.IsNullOrEmpty(re.SizeTotal) ? details.ContainsKey("เนื้อที่:") ? details["เนื้อที่:"].GetMatchStr(RegexHelper.REGEX_NUMBER).FirstOrDefault() : re.SizeTotal : re.SizeTotal;
                re.Map.Desc = details.ContainsKey("ที่ตั้งทรัพย์:") ? details["ที่ตั้งทรัพย์:"].CleanNewLine() : string.Empty;
                re.Storeys = details.ContainsKey("จำนวนชั้น:") ? details["จำนวนชั้น:"].Replace("ชั้น", string.Empty).Trim() : string.Empty;


                var parcels = details.ContainsKey("โฉนดเลขที่:") ? RegexHelper.GetMatchStr(details["โฉนดเลขที่:"], RegexHelper.REGEX_NUMBER).ToArray() : new string[] { };

                if (parcels.Count() == 0)
                {
                    parcels = details.ContainsKey("กรรมสิทธิ์เลขที่:") ? RegexHelper.GetMatchStr(details["กรรมสิทธิ์เลขที่:"], RegexHelper.REGEX_NUMBER).ToArray() : new string[] { };
                }

                if (parcels.Count() == 0)
                {
                    parcels = details.ContainsKey("น.ส. 3ก.เลขที่:") ? RegexHelper.GetMatchStr(details["น.ส. 3ก.เลขที่:"], RegexHelper.REGEX_NUMBER).ToArray() : new string[] { };
                }

                if (parcels.Count() == 0)
                {
                    parcels = details.ContainsKey("น.ส. 3เลขที่:") ? RegexHelper.GetMatchStr(details["น.ส. 3เลขที่:"], RegexHelper.REGEX_NUMBER).ToArray() : new string[] { };
                }

                if (parcels.Count() == 0)
                {
                    parcels = details.ContainsKey("อื่นๆเลขที่:") ? RegexHelper.GetMatchStr(details["อื่นๆเลขที่:"], RegexHelper.REGEX_NUMBER).ToArray() : new string[] { };
                }

                if (parcels.Count() > 0)
                {
                    re.Map.ParcelNumber = parcels.Select(x => x.Trim()).ToArray();
                }

                //details.Add("price", RegexHelper.StripHTML(price));                
                //re.Details = details;

                var gallery = doc.DocumentNode.Descendants("ul").Where(x => x.Id == "imageGallery").FirstOrDefault();

                if (gallery != null)
                {
                    re.Images = gallery.Elements("li")
                                .Select(x => URL_MAIN + x.Descendants("img").FirstOrDefault()
                                .GetAttributeValue("src", string.Empty)).Where(x => !x.Contains("M0")).ToList();
                }

                var contact = new Contact();
                var contactStr = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("C_label")).FirstOrDefault()
                            .Element("div").InnerHtml.Trim();
                var contactTells = RegexHelper.GetMatchStr(contactStr, RegexHelper.REGEX_TELL_NO);
                contact.TellNo = contactTells.ToList<string>();
                contact.Name = details.ContainsKey("สอบถามรายละเอียด:") ? details["สอบถามรายละเอียด:"].CleanNewLine() : string.Empty;
                re.Contacts.Add(contact);

                var loc = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("chromemenu")).FirstOrDefault().InnerHtml.Trim();

                if (loc.Contains("พิกัด Latitude(X):"))
                {
                    var arr = loc.Replace("พิกัด Latitude(X):", string.Empty).Replace("Longitude(Y):", string.Empty).Substring(0, loc.IndexOf("<br>")).Replace("<br>", string.Empty).Trim().Split(',');
                    re.Map.Lat = double.Parse(arr[0].Trim());
                    re.Map.Lon = double.Parse(arr[1].Trim());
                    //re.Map.Coordinate = new Point(double.Parse(arr[1].Trim()), double.Parse(arr[0].Trim()));
                }

                var mapImg = URL_MAIN + doc.DocumentNode.Descendants("div").Where(x => x.Id == "imagetab").FirstOrDefault().Element("img").GetAttributeValue("src", string.Empty);

                re.Map.Images.Add(mapImg);

                var province = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_PROVINCE);
                var district = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_DISTRICT);
                var subProvince = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_SUB_DISTRICT);
                var village = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_VILLAGE);
                var road = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_ROAD);
                var number = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_PROPERTYNUMBER);
                var villageNo = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_VILLAGENO);
                var alley = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_ALLEY);
                var lane = RegexHelper.GetMatchStr(details["ที่ตั้งทรัพย์:"], RegexHelper.REGEX_LANE);

                if (number.Count > 0)
                    re.Map.Number = number[0].Trim();
                if (province.Count > 0)
                    re.Map.Province = province[0].Replace("จังหวัด", string.Empty).Trim();
                if (district.Count > 0)
                    re.Map.District = district[0].Replace("อำเภอ", string.Empty).Replace("เขต", string.Empty).Trim();
                if (subProvince.Count > 0)
                    re.Map.SubDistrict = subProvince[0].Replace("ตำบล", string.Empty).Replace("แขวง", string.Empty).Trim();
                if (village.Count > 0)
                    re.Map.Village = village[0].Replace("หมู่บ้าน", string.Empty).Replace("อาคาร", string.Empty).Replace("ชุด", string.Empty).Replace("ถนน", string.Empty).Trim();
                if (road.Count > 0)
                    re.Map.Road = road[0].Replace("ถนน", string.Empty).Replace("ถ.", string.Empty).Trim();
                if (villageNo.Count > 0)
                    re.Map.VillageNo = villageNo[0].Replace("หมู่", string.Empty).Trim();
                if (alley.Count > 0)
                    re.Map.Alley = alley[0].Replace("ตรอก", string.Empty).Trim();
                if (lane.Count > 0)
                    re.Map.Lane = lane[0].Replace("ซอย", string.Empty).Trim();

                re = DataHelper.DownloadImage(re);

                var t = new RealEstateT
                {
                    Data = JsonHelper.Serialize(re, true),
                    Province = re.Map.Province,
                    District = re.Map.District,
                    ParcelNo = JsonHelper.Serialize(re.Map.ParcelNumber),
                    Url = re.Url.Trim(),
                    Lat = re.Map.Lat,
                    Lon = re.Map.Lon,
                    State = 0,
                    RecordStatus = 1,
                    Source = "SCB"
                };

                DataHelper.InsertRealEstateT(t);
            }
            catch (Exception ex)
            {
                lock (sync)
                {
                    File.AppendAllText("C:/RE/T_SCB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + obj.Url + "," + ex.GetBaseException().Message + "\r\n");
                }
            }
        }
        public static object sync = new object();
    }
}
