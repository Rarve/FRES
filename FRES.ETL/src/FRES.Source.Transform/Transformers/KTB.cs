using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using FRES.Common;
using FRES.Data;
using System.Web;
using FRES.Source.Transform;
using Microsoft.Azure.Documents.Spatial;

namespace FRES.Source.Transform
{
    public class KTB : Transformer
    {
        private const string URL_LIST = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
        private const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        private const string USL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/AjaxSearchGIS?collgrp=";
        private const int PARALLELISM_DEGREE = 5;
        
        public KTB()
        {
            Client = new HttpClientHelper();
        }

        public override void Transform()
        {
            var objs = DataHelper.GetRealEstateE("KTB", int.Parse(DateTime.UtcNow.ToString("yyyyMMdd")));
            GetDetails(objs.ToArray());
        }

        public override void GetDetails(SourceObj[] obj)
        {
            obj.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE)
                 .ForAll(html => GetDetails(html));
        }

        public override void GetDetails(SourceObj obj)
        {
            var re = new RealEstateObj();
            var doc = new HtmlAgilityPack.HtmlDocument();
            try
            {
                if (!obj.Url.Contains("&check=1&p=na"))
                {
                    obj.Url = obj.Url + "&check=1&p=na";
                    obj.Data = Client.RetrieveHtmlStrGet(obj.Url).Result;
                }

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

                var detailTitles = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_detail_col1"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var detailDescs = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_detail_col2"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var details = new Dictionary<string, string>();

                re.Map.Province = detailDescs[2];

                for (int i = 0; i < detailTitles.Count(); i++)
                {
                    details.Add(detailTitles[i], detailDescs[i]);
                }
                
                //re.Code = details.ContainsKey("รหัสรายการทรัพย์") ? details["รหัสรายการทรัพย์"] : string.Empty;
                //re.PropertyType = details.ContainsKey("ประเภททรัพย์") ? details["ประเภททรัพย์"] : string.Empty;
                //re.Map.Province = details.ContainsKey("จังหวัด") ? details["จังหวัด"] : string.Empty;

                if (details.ContainsKey("เนื้อที่(ไร่-งาน-วา)"))
                {
                    var tmp = re.SizeTotalText.Split('-'); ;
                    //var tmp = details["เนื้อที่(ไร่-งาน-วา)"].Split('-');
                    if (tmp.Length == 3)
                    {
                        var rai = decimal.Parse(tmp[0]) * 400;
                        var ngn = decimal.Parse(tmp[1]) * 100;
                        var war = decimal.Parse(tmp[2]);
                        re.SizeTotal = (rai + ngn + war).ToString();
                        re.SizeTotalUnit = "ตร.ว.";
                    }
                    re.SizeTotalText = details["เนื้อที่(ไร่-งาน-วา)"];
                }


                re.DocumentOfRightType = details.ContainsKey("ประเภทเอกสารสิทธิ์") ? details["ประเภทเอกสารสิทธิ์"] : string.Empty;
                re.DocumentOfRightDesc = details.ContainsKey("รายละเอียดเลขที่เอกสารสิทธิ์") ? details["รายละเอียดเลขที่เอกสารสิทธิ์"] : string.Empty;
                //re.Price = details.ContainsKey("ราคาพิเศษ") ? details["ราคาพิเศษ"] : string.Empty;
                re.BedRoom = details.ContainsKey("ห้องนอน") ? details["ห้องนอน"] : string.Empty;
                re.BathRoom = details.ContainsKey("ห้องน้ำ") ? details["ห้องน้ำ"] : string.Empty;
                re.Map.Desc = details.ContainsKey("ที่ตั้งรหัสทรัพย์") ? details["ที่ตั้งรหัสทรัพย์"] : string.Empty;

                //re.BedRooom = details.Where(x => x.Key.Contains("ห้องนอน")).Count() > 0 ? string.Empty : details.Where(x => x.Key == "ห้องนอน").FirstOrDefault().Value;
                //re.BathRoom = details.Where(x => x.Key.Contains("ห้องน้ำ")).Count() > 0 ? string.Empty : details.Where(x => x.Key == "ห้องน้ำ").FirstOrDefault().Value;
                //re.ParkingSpace = details.Where(x => x.Key.Contains("ที่จอดรถ")).Count() > 0 ? string.Empty : details.Where(x => x.Key == "ที่จอดรถ").FirstOrDefault().Value;
                //re.Price = details.Where(x => x.Key == "ราคาพิเศษ").Count() > 0 ? string.Empty : details.Where(x => x.Key == "ราคาพิเศษ").FirstOrDefault().Value;
                //re.PropertyType = details.Where(x => x.Key == "ประเภททรัพย์").Count() > 0 ? string.Empty : details.Where(x => x.Key == "ประเภททรัพย์").FirstOrDefault().Value;

                var contactNames = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("box_contact_col2"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var contactTells = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("box_contact_col3"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var contactEmails = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("box_contact_col4"))
                            .Select(x => RegexHelper.StripHTML(x.InnerHtml).Replace("คลิกที่นี่เพื่อติดต่อเจ้าหน้าที่", string.Empty)).ToList();

                var contacts = new List<Contact>();

                for (int i = 0; i < contactNames.Count(); i++)
                {
                    contacts.Add(new Contact() { Name = contactNames[i], TellNo = contactTells.ToList(), Email = contactEmails.ToList() });
                }

                re.Contacts = contacts;

                re.Images = doc.DocumentNode.Descendants("img").Where(x => x.Id == "image")
                            .Select(x => x.GetAttributeValue("src", string.Empty))
                            .Distinct().ToList();

                //var remark = doc.DocumentNode.Descendants("div")
                //            .Where(x => x.Attributes.Contains("class") && (x.Attributes["class"].Value.Contains("text_contact_detail1")))
                //            .FirstOrDefault().InnerHtml;
                //re.Remark = RegexHelper.StripHTML(WebUtility.HtmlDecode(remark));

                var mapImage = doc.DocumentNode
                            .Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("map_detail_col1")).FirstOrDefault()
                            .Descendants("a").FirstOrDefault();

                if (mapImage != null)
                {
                    re.Map.Images.Add(mapImage.GetAttributeValue("href", string.Empty));
                }

                var propId = HttpUtility.ParseQueryString(obj.Url.Split('?')[1])["propId"];
                var mapUrl = USL_MAPS + propId;
                var nvc = new List<KeyValuePair<string, string>>();
                var mapStr = Client.RetrieveHtmlStrPost(mapUrl, nvc).Result;
                var mapObj = JsonHelper.Deserialize<KTBMap>(mapStr);

                if (mapObj.poi.Count > 0 && !string.IsNullOrEmpty(mapObj.poi[0].lat) && !string.IsNullOrEmpty(mapObj.poi[0].lon))
                {
                    re.Map.Lat = double.Parse(mapObj.poi[0].lat);
                    re.Map.Lon = double.Parse(mapObj.poi[0].lon);
                    //re.Map.Coordinate = new Point(double.Parse(mapObj.poi[0].lon), double.Parse(mapObj.poi[0].lat));
                }

                //var amphur = RegexHelper.GetMatchStr(obj.Data, RegexHelper.REGEX_DISTRICT);
                //re.Map.ParcelNumber = RegexHelper.GetMatchStr(details["เลขที่เอกสารสิทธิ์"], RegexHelper.REGEX_NUMBER).ToArray();

                //if (amphur.Count > 0)
                //{
                //    re.Map.District = amphur[0].Replace("อำเภอ", string.Empty).Replace("เขต", string.Empty).Trim();
                //}

                re = DataHelper.DownloadImage(re);

                var reT = new RealEstateT
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
                    Source = "KTB"
                };

                DataHelper.InsertRealEstateT(reT);
            }
            catch (Exception ex)
            {
                File.AppendAllText("C:/RE/T_KTB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + obj.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }

    internal class KTBMap
    {
        public List<Poi> poi { get; set; }
    }

    internal class Poi
    {
        public int poiType { get; set; }
        public string lon { get; set; }
        public string insertById { get; set; }
        public string poiActiveFlag { get; set; }
        public string name { get; set; }
        public string refGrp { get; set; }
        public string refId { get; set; }
        public int poiNpaId { get; set; }
        public string url { get; set; }
        public string lat { get; set; }
        public string updateById { get; set; }
        public string poiSubType { get; set; }
    }
}

//var lcUrl = "http://www.mysite.com/page.aspx";

//var loHttp = (HttpWebRequest)WebRequest.Create(lcUrl);


//// *** Send any POST data

//var lcPostData = "gvEmployees=" + WebUtility.UrlEncode("Page$2");

//loHttp.Method = "POST";

//var lbPostBuffer = Encoding.GetEncoding(1252).GetBytes(lcPostData);

//loHttp.ContentLength = lbPostBuffer.Length;

//var loPostData = loHttp.GetRequestStream();

//loPostData.Write(lbPostBuffer, 0, lbPostBuffer.Length);

//loPostData.Close();

//var loWebResponse = (HttpWebResponse)loHttp.GetResponse();

//var enc = System.Text.Encoding.GetEncoding(1252);

//var loResponseStream = new StreamReader(loWebResponse.GetResponseStream(), enc);

//var lcHtml = loResponseStream.ReadToEnd();

//loWebResponse.Close();

//loResponseStream.Close();
//return "value";