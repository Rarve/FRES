using FRES.Common;
using FRES.Data;
using FRES.Source.Transform;
using FRES.Structure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FRES.Source.Transform
{
    public class GHB : Transformer
    {
        private const string URL_MAIN = "http://www.ghbhomecenter.com/";
        private const int PARALLELISM_DEGREE = 100;

        public GHB()
        {
            Client = new HttpClientHelper();
        }

        public override void Transform()
        {
            var objs = DataHelper.GetRealEstateE("GHB");
            GetDetails(objs.ToArray());

            //var reObjs = jsons.Select(x => new RealEstateT
            //{
            //    Data = JsonHelper.Serialize(x, true),
            //    Url = x.Url.Trim(),
            //    Lat = x.Map.Lat,
            //    Lon = x.Map.Lon,
            //    State = 0,
            //    RecordStatus = 1,
            //    Source = "GHB"
            //}).ToList();

            //DataHelper.InsertRealEstateT(reObjs);

            //return reObjs;
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
                    obj.Data = Client.RetrieveHtmlStrGet(obj.Url).Result;
                }

                doc.LoadHtml(obj.Data);

                if (string.IsNullOrEmpty(obj.RealEstateJson))
                    re = new RealEstateObj();
                else
                    re = obj.RealEstateJson.Deserialize<RealEstateObj>();

                re.Url = obj.Url;
                re.Source = SourceName;

                var titlesHtml = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("asset_name_detail"))
                            .Select(x => x.InnerHtml).FirstOrDefault();

                if (titlesHtml != null)
                {
                    var titles = titlesHtml.Split(new string[] { "<br>" }, StringSplitOptions.None);
                    re.Name = titles[0] == null ? string.Empty : titles[0].StripHTML();
                }

                re.Code = obj.Data.GetStrBtw("ทรัพย์รอการขาย  รหัส", "<");

                var imageHtml = doc.DocumentNode.Descendants("a")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("highslide")).FirstOrDefault();

                if (imageHtml != null)
                {
                    var image = URL_MAIN + imageHtml.InnerHtml.GetStrBtw("src=\"", "\"");
                    re.Images.Add(image);
                }

                var promotionHtml = doc.DocumentNode.Descendants("div")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("promotion_detail_section"))
                        .Select(x => x.InnerHtml).FirstOrDefault();
                
                re.Promotion = promotionHtml == null ? string.Empty : promotionHtml.StripHTML();

                var detailsHtml = doc.DocumentNode.Descendants("div")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("normal_detail_section"))
                        .Select(x => x.InnerHtml).FirstOrDefault();

                if (detailsHtml != null)
                {
                    var details = detailsHtml.Split(new string[] { "</li>" }, StringSplitOptions.None).Select(x => x.StripHTML().CleanNewLineChar()).ToArray();
                    
                    re.Name = details[1].Length < 3 ? re.Name : details[1];

                    re.Map.Number = details[3];
                    re.Map.Lane = details[5];
                    re.Map.Road = details[7];
                    re.Map.SubDistrict = details[9];
                    re.Map.District = details[11];
                    re.Map.Province = details[13];
                    
                    var type = details.Where(x => x.Contains("ประเภท")).FirstOrDefault();
                    re.PropertyType = type == null ? string.Empty : type.CleanInfo();

                    var size = details.Where(x => x.Contains("เนื้อที่")).FirstOrDefault();
                    re.SizeTotal = size == null ? string.Empty : size.CleanInfo();

                    var storeys = details.Where(x => x.Contains("จำนวนชั้น")).FirstOrDefault();
                    re.Storeys = storeys == null ? string.Empty : storeys.CleanInfo();

                    var reCondition = details.Where(x => x.Contains("สภาพ")).FirstOrDefault();
                    re.RealEstateCondition = reCondition == null ? string.Empty : reCondition.CleanInfo();

                    var desc = details.Where(x => x.Contains("รายละเอียดเพิ่มเติม")).FirstOrDefault();
                    re.Desc = desc == null ? string.Empty : desc.CleanInfo();

                    var owner = details.Where(x => x.Contains("เจ้าของทรัพย์")).FirstOrDefault();
                    re.Owner = owner == null ? string.Empty : owner.CleanInfo();

                    var contact = new Contact();
                    var contactName = details.Where(x => x.Contains("ข้อมูลการติดต่อ")).FirstOrDefault();
                    var contactTel = details.Where(x => x.Contains("เบอร์ติดต่อ")).FirstOrDefault();
                    contact.Name = contactName == null ? string.Empty : contactName.CleanInfo();
                    contact.TellNo = contactTel == null ? new List<string>() : contactTel.CleanInfo().Split(new string[] { ":" }, StringSplitOptions.RemoveEmptyEntries).ToList();
                    re.Contacts.Add(contact);

                    var timestamp = details.Where(x => x.Contains("ประกาศเมื่อวันที่")).FirstOrDefault();
                    re.Timestamp = timestamp == null ? string.Empty : timestamp.CleanInfo();
                }

                var mapImageHtml = doc.DocumentNode
                            .Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("map_boder")).FirstOrDefault();

                if (mapImageHtml != null)
                {
                    re.Map.Images.Add(URL_MAIN + mapImageHtml.InnerHtml.GetStrBtw("<img src=\"", "\""));
                }


                var t = new RealEstateT
                {
                    Data = JsonHelper.Serialize(re, true),
                    Url = re.Url.Trim(),
                    Province = re.Map.Province,
                    District = re.Map.District,
                    ParcelNo = JsonHelper.Serialize(re.Map.ParcelNumber),
                    Lat = re.Map.Lat,
                    Lon = re.Map.Lon,
                    State = 0,
                    RecordStatus = 1,
                    Source = "GHB"
                };

                DataHelper.InsertRealEstateT(t);
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/T_GHB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + obj.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }
}
