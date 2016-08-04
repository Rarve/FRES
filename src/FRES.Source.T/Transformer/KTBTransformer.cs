using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.WebUtilities;
using System.IO;
using FRES.Common;

namespace FRES.Source.T
{
    public class KTBTransformer
    {
        private const string URL_LIST = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
        private const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        private const string USL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/AjaxSearchGIS?collgrp=";
        private const int PARALLELISM_DEGREE = 2;

        private HttpClientHelper Client;
        
        public KTBTransformer()
        {
            Client = new HttpClientHelper();
        }

        public RealEstate[] Transform()
        {
            var str = File.ReadAllText("D:/RE/E_KTB.txt");
            var objs = JsonHelper.Deserialize<RealEstateExtrctObj[]>(str);
            var res = GetDetails(objs.ToArray());

            File.WriteAllText("D:/RE/T_KTB.txt", JsonHelper.Serialize(res, true));

            return res;
        }
        
        private RealEstate[] GetDetails(RealEstateExtrctObj[] htmls)
        {
            var ret = htmls
                        .AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(html => GetDetails(html));
            return ret.ToArray();
        }

        private RealEstate GetDetails(string url)
        {
            var html = Client.RetrieveHtmlStrGet(url).Result;
            var obj = new RealEstateExtrctObj(url, html);
            return GetDetails(obj);
        }

        private RealEstate GetDetails(RealEstateExtrctObj htmlObj)
        {
            var re = new RealEstate();
            var doc = new HtmlAgilityPack.HtmlDocument();
            try
            {
                doc.LoadHtml(htmlObj.HTML);

                re.Url = htmlObj.URL;

                var detailTitles = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_detail_col1"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var detailDescs = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_detail_col2"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var details = new Dictionary<string, string>();

                for (int i = 0; i < detailTitles.Count(); i++)
                {
                    details.Add(detailTitles[i], detailDescs[i]);
                }

                re.Details = details;

                re.BedRooom = details.Where(x => x.Key.Contains("ห้องนอน")).Count() > 0 ? string.Empty : details.Where(x => x.Key == "ห้องนอน").FirstOrDefault().Value;
                re.BathRoom = details.Where(x => x.Key.Contains("ห้องน้ำ")).Count() > 0 ? string.Empty : details.Where(x => x.Key == "ห้องน้ำ").FirstOrDefault().Value;
                re.ParkingSpace = details.Where(x => x.Key.Contains("ที่จอดรถ")).Count() > 0 ? string.Empty : details.Where(x => x.Key == "ที่จอดรถ").FirstOrDefault().Value;
                re.Price = details.Where(x => x.Key == "ราคาพิเศษ").Count() > 0 ? string.Empty : details.Where(x => x.Key == "ราคาพิเศษ").FirstOrDefault().Value;
                re.PropertyType = details.Where(x => x.Key == "ประเภททรัพย์").Count() > 0 ? string.Empty : details.Where(x => x.Key == "ประเภททรัพย์").FirstOrDefault().Value;

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
                    contacts.Add(new Contact() { Name = contactNames[i], TellNo = contactTells[i], Email = contactEmails[i] });
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

                var propId = QueryHelpers.ParseQuery(htmlObj.URL.Split('?')[1])["propId"];
                var mapUrl = USL_MAPS + propId;
                var nvc = new List<KeyValuePair<string, string>>();
                var mapStr = Client.RetrieveHtmlStrPost(mapUrl, nvc).Result;
                var mapObj = JsonHelper.Deserialize<KTBMap>(mapStr);

                if (mapObj.poi.Count > 0 && !string.IsNullOrEmpty(mapObj.poi[0].lat) && !string.IsNullOrEmpty(mapObj.poi[0].lon))
                {
                    re.Map.Lat = double.Parse(mapObj.poi[0].lat);
                    re.Map.Lon = double.Parse(mapObj.poi[0].lon);
                }

                var province = RegexHelper.GetMatchStr(htmlObj.HTML, RegexHelper.REGEX_PROVINCE);
                var amphur = RegexHelper.GetMatchStr(htmlObj.HTML, RegexHelper.REGEX_AMPHUR);
                
                re.Map.Province = details["จังหวัด"];
                re.Map.ParcelNumber = details["เลขที่เอกสารสิทธิ์"].Split(new char[] { ',' }, StringSplitOptions.None); ;

                if (details.Count > 0)
                {
                    re.Map.Amphur = amphur[0].Replace("อำเภอ", string.Empty).Trim();
                }
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/T_KTB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + htmlObj.URL + "," + ex.GetBaseException().Message + "\r\n");
            }
            return re;
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