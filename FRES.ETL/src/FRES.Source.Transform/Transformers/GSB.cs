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
    public class GSB : Transformer
    {
        private const string URL_MAIN = "http://properties.gsb.or.th";
        private const int PARALLELISM_DEGREE = 5;

        public GSB()
        {
            Client = new HttpClientHelper();
        }

        public override void Transform()
        {
            var objs = DataHelper.GetRealEstateE("GSB", int.Parse(DateTime.UtcNow.ToString("yyyyMMdd")))
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
                    obj.Data = Client.RetrieveHtmlStrGet(obj.Url, Encoding.GetEncoding(874)).Result;
                }

                if (string.IsNullOrEmpty(obj.RealEstateJson))
                    re = new RealEstateObj();
                else
                    re = obj.RealEstateJson.Deserialize<RealEstateObj>();

                re.Url = obj.Url;
                re.Source = SourceName;


                var idxStart = obj.Data.IndexOf("<!--  Start Content -->");
                var idxEnd = obj.Data.IndexOf("<!--  End Content -->");
                if (idxStart < 0 || idxEnd < 0)
                {
                    obj.Data = Client.RetrieveHtmlStrGet(obj.Url, Encoding.GetEncoding(874)).Result;
                }

                var html = obj.Data.GetStrBtw("<!--  Start Content -->", "<!--  End Content -->");
                var info = html.SplitTag();

                re.IsSoldOut = info[7] != "รอการขาย";
                re.Map.ParcelNumber = info[11].Replace("โฉนดที่ดิน", "").Replace(",", "").SplitRemoveEmpty(" ");
                re.Desc = info[24].StripHTML();
                re.PropertyType = info[9];

                var province = info[20].GetMatchStr(RegexHelper.REGEX_PROVINCE);
                var district = info[20].GetMatchStr(RegexHelper.REGEX_DISTRICT);
                var subDistrict = info[20].GetMatchStr(RegexHelper.REGEX_SUB_DISTRICT);
                var village = info[20].GetMatchStr(RegexHelper.REGEX_VILLAGE);
                var road = info[20].GetMatchStr(RegexHelper.REGEX_ROAD);
                var number = info[20].GetMatchStr(RegexHelper.REGEX_PROPERTYNUMBER);
                var villageNo = info[20].GetMatchStr(RegexHelper.REGEX_VILLAGENO);
                var alley = info[20].GetMatchStr(RegexHelper.REGEX_ALLEY);
                var lane = info[20].GetMatchStr(RegexHelper.REGEX_LANE);

                if (number.Count > 0)
                    re.Map.Number = number[0].Trim();
                if (province.Count > 0)
                    re.Map.Province = province[0].RemovePrefix_Province();
                if (district.Count > 0)
                    re.Map.District = district[0].RemovePrefix_District();
                if (subDistrict.Count > 0)
                    re.Map.SubDistrict = subDistrict[0].RemovePrefix_SubDistrict();
                if (village.Count > 0)
                    re.Map.Village = village[0].RemovePrefix_Village();
                if (road.Count > 0)
                    re.Map.Road = road[0].RemovePrefix_Road();
                if (villageNo.Count > 0)
                    re.Map.VillageNo = villageNo[0].RemovePrefix_VillageNo();
                if (alley.Count > 0)
                    re.Map.Alley = alley[0].Replace("ตรอก", string.Empty).Trim();
                if (lane.Count > 0)
                    re.Map.Lane = lane[0].RemovePrefix_Lane();

                doc.LoadHtml(html);
                var rows = doc.DocumentNode.Descendants("tr").ToList();
                var imageRows = rows.Where(x => x.InnerHtml.Contains(@"/upload/properties/")).ToList();

                if (imageRows.Count > 0)
                {
                    var images = imageRows[1].InnerHtml.GetMatchStr(@"(\/upload\/properties\/)[a-zA-z0-9/-]{5,100}.(jpg|JPG)").Distinct().Select(x => URL_MAIN + x).ToList();
                    re.Images = images;
                }
                if (imageRows.Count > 1)
                {
                    var maps = imageRows[2].InnerHtml.GetMatchStr(@"(\/upload\/properties\/)[a-zA-z0-9/-]{5,100}.(jpg|JPG)").Distinct().Select(x => URL_MAIN + x).ToList();
                    re.Map.Images = maps;
                }

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
                    Source = this.GetType().Name
                };

                //DataHelper.InsertRealEstateT(t);
            }
            catch (Exception ex)
            {
                File.AppendAllText("C:/RE/T_GSB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + obj.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }
}
