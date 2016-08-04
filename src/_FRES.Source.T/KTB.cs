using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.WebUtilities;
using System.IO;
using Newtonsoft.Json;

namespace FRES.Source.Extract
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class KTB
    {
        public const string URL_LIST = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
        public const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        public const string USL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/AjaxSearchGIS?collgrp=";

        public const int PARALLELISM_DEGREE = 5;
        public const int TIMEOUT = 60;
        
        public KTB()
        {
        }

        public RealEstate[] Transform()
        {
            var str = File.ReadAllText("D:/KTBUrlList.txt");
            var urls = JsonConvert.DeserializeObject<string[]>(str);
            var re = GetDetails(urls);
            return re;

            //var asdf = GetItemUrls(URL_LIST, "50").Result;
            //var a = GetDetails("http://www.npashowroom.ktb.co.th/WebShowRoom/ViewPropServlet?propID=144240&check=0&p=n").Result;
            //var b = GetDetails("http://www.npashowroom.ktb.co.th/WebShowRoom/ViewPropServlet?propID=23890&check=1&p=n").Result;
            //return null;
        }
        
        public RealEstate[] GetDetails(string[] urls)
        {
            var ret = urls
                        .AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(urlDetail => GetDetails(urlDetail).Result);
            return ret.ToArray();
        }

        private async Task<RealEstate> GetDetails(string url)
        {
            //Console.WriteLine(url);
            var re = new RealEstate();
            try
            {
                var doc = await Client.RetrieveHtmlGet(url);

                re.Url = url;

                var detailTitles = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_detail_col1"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var detailDescs = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_detail_col2"))
                            .Select(x => RegexHelper.StripHTML(x.FirstChild.InnerHtml)).ToList();

                var details = new List<KeyValuePair<string, string>>();

                for (int i = 0; i < detailTitles.Count(); i++)
                {
                    details.Add(new KeyValuePair<string, string>(detailTitles[i], detailDescs[i]));
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

                var propId = QueryHelpers.ParseQuery(url.Split('?')[1])["propId"];
                var mapUrl = USL_MAPS + propId;
                var nvc = new List<KeyValuePair<string, string>>();
                var mapStr = await Client.RetrieveHtmlStrPost(mapUrl, nvc);
                var mapObj = JsonConvert.DeserializeObject<KTBMap>(mapStr);

                if (mapObj.poi.Count > 0 && !string.IsNullOrEmpty(mapObj.poi[0].lat) && !string.IsNullOrEmpty(mapObj.poi[0].lon))
                {
                    re.Map.Lat = double.Parse(mapObj.poi[0].lat);
                    re.Map.Lon = double.Parse(mapObj.poi[0].lon);
                }
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/KTBLog.txt", ex.GetBaseException().Message);
                File.AppendAllText("D:/KTBLog.txt", "\r\n" + url + "\r\n");
            }
            return re;
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
    }

    public class KTBMap
    {
        public List<Poi> poi { get; set; }
    }

    public class Poi
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
