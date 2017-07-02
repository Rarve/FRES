using FRES.Common;
using FRES.Data;
using FRES.Source.Transform;
using FRES.Structure;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace FRES.Source.Transform
{
    public class TNB : Transformer
    {
        private const string URL_MAIN = "http://www.thanachartnpa.com/";
        private const int PARALLELISM_DEGREE = 5;

        public TNB()
        {
            Client = new HttpClientHelper();
        }

        public override void Transform()
        {
            var objs = DataHelper.GetRealEstateE("TNB", int.Parse(DateTime.UtcNow.ToString("yyyyMMdd")))
                //.Where(x => x.Url == "http://www.thanachartnpa.com/assetdetail.asp?code=9B015FA011F41D8F5C993E0EEC1869D760A5BF91E58A2A2E45B96FBEA86E2F22F7D3B5F753424EDB36B60C00C619843CBAB0A8E635715250444370728ECD13F0&p1=85C0B2FFED8E4BCA57CB9C95D4B81C57935D0CA9A88831D58092A1A9732E00FFD95195CE5B0F4E6AE9CD8E0A1FE242E250A710DB2A23C10C4719D6BD756067A2")
                .ToList();
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
                    obj.Data = Client.GetStringGet(obj.Url, Encoding.GetEncoding(874)).Result;
                }

                doc.LoadHtml(obj.Data);

                if (string.IsNullOrEmpty(obj.RealEstateJson))
                    re = new RealEstateObj();
                else
                    re = obj.RealEstateJson.Deserialize<RealEstateObj>();

                re.Url = obj.Url;
                re.Source = SourceName;

                var info = doc.DocumentNode.Descendants("td")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("font_normal2"))
                            .Select(x => WebUtility.HtmlDecode(x.InnerHtml.Trim()).StripHTML()).ToList();

                if (info.Count > 0)
                {
                    re.Code = info[0];
                    re.Name = info[1];
                    re.Project = info[2];
                    re.Map.Desc = info[3];
                    re.DocumentOfRightType = info[4];
                    re.Map.ParcelNumber = RegexHelper.GetMatchStr(info[5], RegexHelper.REGEX_NUMBER).ToArray();

                    var tmp = info[6].Split('-');
                    if (tmp.Length == 3)
                    {
                        var rai = decimal.Parse(tmp[0]) * 400;
                        var ngn = decimal.Parse(tmp[1]) * 100;
                        var war = decimal.Parse(tmp[2]);
                        re.SizeTotal = (rai + ngn + war).ToString();
                        re.SizeTotalUnit = "ตร.ว.";
                    }
                    re.SizeTotalText = info[6].Replace(" ", string.Empty);

                    re.SizeUtility = info[7];
                    re.Width = info[8];
                    re.Depth = info[9];
                    re.WidthRoadFrontage = info[10];
                    re.Age = info[11];
                    re.Desc = info[12];
                    
                    var province = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_PROVINCE);
                    var district = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_DISTRICT);
                    var subProvince = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_SUB_DISTRICT);
                    re.Map.Village = info[1];
                    var road = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_ROAD);
                    var number = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_PROPERTYNUMBER);
                    var villageNo = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_VILLAGENO);
                    var alley = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_ALLEY);
                    var lane = RegexHelper.GetMatchStr(info[3], RegexHelper.REGEX_LANE);

                    if (number.Count > 0)
                        re.Map.Number = number[0].Trim();
                    if (province.Count > 0)
                        re.Map.Province = province[0].Replace("จังหวัด", string.Empty).Trim();
                    if (district.Count > 0)
                        re.Map.District = district[0].Replace("อำเภอ", string.Empty).Replace("เขต", string.Empty).Trim();
                    if (subProvince.Count > 0)
                        re.Map.SubDistrict = subProvince[0].Replace("ตำบล", string.Empty).Replace("แขวง", string.Empty).Trim();
                    if (road.Count > 0)
                        re.Map.Road = road[0].Replace("ถนน", string.Empty).Replace("ถ.", string.Empty).Trim();
                    if (villageNo.Count > 0)
                        re.Map.VillageNo = villageNo[0].Replace("หมู่", string.Empty).Trim();
                    if (alley.Count > 0)
                        re.Map.Alley = alley[0].Replace("ตรอก", string.Empty).Trim();
                    if (lane.Count > 0)
                        re.Map.Lane = lane[0].Replace("ซอย", string.Empty).Trim();
                }

                //re.Price = obj.Data.GetMatchStr(@"((<b>)(\d{1,3}(,\d{3})*)?(\.\d+)(<\/b>))").FirstOrDefault().StripHTML();

                var images = RegexHelper.GetMatchStr(obj.Data, "(\\/asset_images\\/(.*?)\")").Distinct().Select(x => URL_MAIN + x.TrimEnd('"')).ToList();

                if (images.Count > 1)
                {
                    re.Images.Add(images[0]);
                    re.Map.Images.Add(images[1]);
                }

                var contact = new Contact();
                contact.TellNo.Add("0-2260-6100");
                contact.Email.Add("assetforsales@thanachart.co.th");
                re.Contacts.Add(contact);

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
                    Source = "TNB"
                };

                DataHelper.InsertRealEstateT(t);
            }
            catch (Exception ex)
            {
                File.AppendAllText("C:/RE/T_TNB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + obj.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }
}
