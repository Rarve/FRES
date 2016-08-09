using FRES.Common;
using FRES.Data;
using FRES.Data.Models;
using FRES.Structure;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FRES.Source.T
{
    public class SCBTransformer
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const int PARALLELISM_DEGREE = 100;
        
        public SCBTransformer()
        {
        }

        public List<RealEstateT> Transform()
        {
            var objs = DataHelper.GetRealEstateE("SCB");
            var jsons = GetDetails(objs.ToArray());

            var reObjs = jsons.Select(x => new RealEstateT
            {
                Data = JsonHelper.Serialize(x, true),
                Url = x.Url.Trim(),
                Lat = x.Map.Lat,
                Lon = x.Map.Lon,
                State = 0,
                RecordStatus = 1,
                Source = "SCB"
            }).ToList();

            DataHelper.InsertRealEstateT(reObjs);

            return reObjs;
        }

        private RealEstateObj[] GetDetails(SourceObj[] urls)
        {
            var ret = urls.AsParallel()
                        .WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(urlDetail => GetDetails(urlDetail));
            return ret.ToArray();
        }

        private RealEstateObj GetDetails(SourceObj htmlObj)
        {
            Console.WriteLine(htmlObj.Url);
            var re = new RealEstateObj();
            var doc = new HtmlAgilityPack.HtmlDocument();
            try
            {
                doc.LoadHtml(htmlObj.Data);

                re.Url = htmlObj.Url;

                var isSoldout = doc.DocumentNode.Descendants("a")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("thumb-label label-sold-s")).FirstOrDefault();

                if (isSoldout != null)
                {
                    re.IsSoldOut = true;
                }

                re.Url = htmlObj.Url;

                re.Icon = URL_MAIN + doc.DocumentNode.Descendants("p")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("Thumb-s"))
                            .FirstOrDefault().ChildNodes["img"].GetAttributeValue("src", string.Empty);
                
                var html = doc.DocumentNode.Descendants("div").Where(x => x.Id == "Lname").FirstOrDefault().ParentNode.ParentNode.InnerHtml;
                html = WebUtility.HtmlDecode(html);
                var titleDetails = RegexHelper.SplitTag(html);
                
                re.Name = titleDetails[0];
                re.SizeTotal = titleDetails[1];
                
                if (titleDetails.Length > 3)
                {
                    re.BedRooom = titleDetails[2];
                    re.BathRoom = titleDetails[4];
                    re.ParkingSpace = titleDetails[6];
                    re.Price = titleDetails[8];
                }
                else
                {
                    re.Price = titleDetails[2];
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
                re.SizeTotal = string.IsNullOrEmpty(re.SizeTotal) ? details.ContainsKey("เนื้อที่:") ? details["เนื้อที่:"] : re.SizeTotal : re.SizeTotal;
                re.Map.Desc = details.ContainsKey("ที่ตั้งทรัพย์:") ? details["ที่ตั้งทรัพย์:"] : string.Empty;
                re.Storeys = details.ContainsKey("จำนวนชั้น:") ? details["จำนวนชั้น:"] : string.Empty;


                var parcels = details.ContainsKey("โฉนดเลขที่:") ? RegexHelper.GetMatchStr(details["โฉนดเลขที่:"], RegexHelper.REGEX_NUMBER).ToArray() : new string[] { };
               
                if (parcels.Count() > 0)
                {
                    re.Map.ParcelNumber = parcels.Select(x => x.Trim()).ToArray();
                }
                //details.Add("price", RegexHelper.StripHTML(price));
                
                re.Details = details;
                
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
                contact.Name = details.ContainsKey("สอบถามรายละเอียด:") ? details["สอบถามรายละเอียด:"] : string.Empty;
                re.Contacts.Add(contact);

                var loc = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("chromemenu")).FirstOrDefault().InnerHtml.Trim();

                if (loc.Contains("พิกัด Latitude(X):"))
                {
                    var arr = loc.Replace("พิกัด Latitude(X):", string.Empty).Replace("Longitude(Y):", string.Empty).Substring(0, loc.IndexOf("<br>")).Replace("<br>", string.Empty).Trim().Split(',');
                    re.Map.Lat = double.Parse(arr[0].Trim());
                    re.Map.Lon = double.Parse(arr[1].Trim());
                }

                var mapImg = URL_MAIN + doc.DocumentNode.Descendants("div").Where(x => x.Id == "imagetab").FirstOrDefault().Element("img").GetAttributeValue("src", string.Empty);

                re.Map.Images.Add(mapImg);

                var province = RegexHelper.GetMatchStr(htmlObj.Data, RegexHelper.REGEX_PROVINCE);
                var amphur = RegexHelper.GetMatchStr(htmlObj.Data, RegexHelper.REGEX_DISTRICT);

                if (province.Count > 0)
                {
                    re.Map.Province = province[0].Replace("จังหวัด", string.Empty).Trim();
                }

                if (amphur.Count > 0)
                {
                    re.Map.District = amphur[0].Replace("อำเภอ", string.Empty).Trim();
                }
                
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/T_SCB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + htmlObj.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
            return re;
        }
    }
}
