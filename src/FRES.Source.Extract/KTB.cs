using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.WebUtilities;

namespace FRES.Source.Extract
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class KTB : ISourceExtractor
    {
        public const string URL_LIST = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
        public const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        public const string URL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/quickview_properties.jsp?coll_id=121876&id=";
        public const int PARALLELISM_DEGREE = 10;
        public const int TIMEOUT = 60;

        public HttpClientHelper Client;

        public KTB()
        {
            Client = new HttpClientHelper();
        }

        public RealEstate[] Extract()
        {
            var total = GetTotalPages(URL_LIST);
            var urls = GetItemUrls(total);
            var re = GetDetails(urls);
            return re;

            //var a = GetDetails("http://www.npashowroom.ktb.co.th/WebShowRoom/ViewPropServlet?propID=74298&check=1&p=r").Result;
            //var b = GetDetails("http://www.npashowroom.ktb.co.th/WebShowRoom/ViewPropServlet?propID=30832&check=0&p=n").Result;
            //return null;
        }

        public string[] GetItemUrls(int totalPages)
        {
            var arr = new List<string>();
            var sync = new object();
            var pages = Enumerable.Range(1, totalPages).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE).ForAll((page) =>
            {
                Console.WriteLine(page + "   " + URL_LIST);
                var items = GetItemUrls(URL_LIST, page.ToString()).Result;
                lock (sync) { arr.AddRange(items); }
            });

            return arr.ToArray();
        }

        private async Task<List<string>> GetItemUrls(string url, string pageNumber)
        {
            var items = new List<string>();
            try
            {
                Console.WriteLine(url);
                var nvc = new List<KeyValuePair<string, string>>() { new KeyValuePair<string, string>("numPage", pageNumber) };
                var htmlDoc = await Client.RetrieveHtmlPost(url, nvc);
                items = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("href") && x.Attributes["href"].Value.Contains("ViewPropServlet") && x.Attributes["href"].Value.Contains("&check=0&p=n")).Select(x => URL_DTLS + x.GetAttributeValue("href", string.Empty)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                Console.ReadKey();
                //throw ex;
            }
            return items;
        }

        public int GetTotalPages(string url)
        {
            int totalPages = 0;

            var nvc = new List<KeyValuePair<string, string>>() { new KeyValuePair<string, string>("numPage", "1") };
            var htmlDoc = Client.RetrieveHtmlPost(url, nvc).Result;
            var htmlTotalPage = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("text_more_info")).FirstOrDefault();

            if (htmlTotalPage == null)
            {
            }            
            else
            {
                var totalItemPerPage = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_all_column1")).Count();
                var str = htmlTotalPage.InnerHtml.Replace("พบทั้งหมด", string.Empty);
                str = str.Replace("รายการ", string.Empty);
                int totalItems = 0;
                int.TryParse(str, out totalItems);
                totalPages = totalItems / totalItemPerPage;
            }

            return totalPages;
        }

        public RealEstate[] GetDetails(string[] urls)
        {
            var ret = urls.AsParallel()
                        .WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(urlDetail => GetDetails(urlDetail).Result);
            return ret.ToArray();
        }

        private async Task<RealEstate> GetDetails(string url)
        {
            Console.WriteLine(url);
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
                            .Distinct().Select(x => new Image() { Url = x }).ToList();

                var remark = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && (x.Attributes["class"].Value.Contains("text_contact_detail1")))
                            .FirstOrDefault().InnerHtml;

                re.Remark = RegexHelper.StripHTML(WebUtility.HtmlDecode(remark));

                string mapImage = doc.DocumentNode
                            .Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("map_detail_col1")).FirstOrDefault()
                            .Descendants("a").FirstOrDefault().GetAttributeValue("href", string.Empty);

                re.Map.Images.Add(new Image() { Url = mapImage });


                var propId = QueryHelpers.ParseQuery(url.Split('?')[1])["propId"];
                var mapUrl = URL_MAPS + propId;

                var map = await Client.RetrieveHtmlStrGet(mapUrl);

                var tmp = map.Split(new string[] { "Math.round(" }, StringSplitOptions.RemoveEmptyEntries);
                var lat = tmp[1].Split(new string[] { "*" }, StringSplitOptions.RemoveEmptyEntries)[0];
                var lng = tmp[2].Split(new string[] { "*" }, StringSplitOptions.RemoveEmptyEntries)[0];

                re.Map.Lat = double.Parse(lat);
                re.Map.Long = double.Parse(lng);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                Console.ReadKey();
                throw;
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
}
