using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using FRES.Structure;

namespace FRES.Data
{
    // This project can output /*the*/ Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class SCB
    {
        public const string URL_MAIN = "http://www.buyatsiam.com/";
        public const string URL_PAGE = "APropertyHome.html?page=";
        public const string URL_DTLS = "APropertyDetail.html?id=";
        public SCB()
        {
        }

        public static void Extract()
        {
            var urlPages = GetPageUrls(URL_MAIN + URL_PAGE).Result;
            var urlDetls = GetItemUrls(urlPages.Take(2).ToArray()).Take(1).ToArray();
            var realEstate = GetDetails("http://www.buyatsiam.com/APropertyDetail.html;jsessionid=26921fa1fd411ebb4f2857d171b6?id=23318").Result;
        }

        public static async Task<RealEstate> GetDetails(string urlDetail)
        {
            var doc = await GetHtmlDocument(urlDetail);

            var re = new RealEstate();

            re.Icon = URL_MAIN + doc.DocumentNode.Descendants("p")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("Thumb-s"))
                        .FirstOrDefault().ChildNodes["img"].GetAttributeValue("src", string.Empty);
            re.Name = doc.DocumentNode.Descendants("div").Where(x => x.Id == "Lname").FirstOrDefault().ChildNodes["h3"].InnerText;


            re.PropertyCode = doc.DocumentNode.Descendants("div")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[0].InnerHtml;

            re.Size = doc.DocumentNode.Descendants("div")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[1].InnerHtml;

            re.Map.Desc = doc.DocumentNode.Descendants("div")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[2].InnerHtml;

            re.Images = doc.DocumentNode.Descendants("ul")
                        .Where(x => x.Id == "imageGallery").FirstOrDefault().Elements("li")
                        .Select(x => URL_MAIN + x.Descendants("img").FirstOrDefault()
                        .GetAttributeValue("src", string.Empty))
                        .Select(x => new Image() { Url = x }).ToList();

            re.Contact = doc.DocumentNode.Descendants("div")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("C_label")).FirstOrDefault()
                        .Element("div").InnerHtml.Trim();
            
            var loc = doc.DocumentNode.Descendants("div")
                        .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("chromemenu")).FirstOrDefault().InnerHtml.Trim();

            if (loc.Contains("พิกัด Latitude(X):"))
            {
                var arr = loc.Replace("พิกัด Latitude(X):", string.Empty).Replace("Longitude(Y):", string.Empty).Substring(0, loc.IndexOf("<br>")).Replace("<br>", string.Empty).Trim().Split(',');
                re.Map.Latt = double.Parse(arr[0].Trim());
                re.Map.Long = double.Parse(arr[1].Trim());
            }

            var mapImg = URL_MAIN + doc.DocumentNode.Descendants("div").Where(x => x.Id == "imagetab").FirstOrDefault().Element("img").GetAttributeValue("src", string.Empty);

            re.Map.Images.Add(new Image() { Url = mapImg });

            return re;
        }

        public static string[] GetItemUrls(string[] urlPages)
        {
            var arr = new List<string>();
            var sync = new object();

            urlPages.AsParallel().WithDegreeOfParallelism(2).ForAll((urlPage) =>
            {
                var detailUrls = GetItemUrls(urlPage).Result;
                lock (sync)
                {
                    arr.AddRange(detailUrls);
                }
            });
            
            return arr.ToArray();
        }

        public static async Task<IEnumerable<string>> GetItemUrls(string urlPage)
        {
            var pageHtml = await GetHtmlDocument(urlPage);
            var urlDetails = pageHtml.DocumentNode.Descendants("div")
                .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("MainColumn"))
                .Select(x => URL_MAIN + x.Descendants("a").FirstOrDefault().Attributes["href"].Value);
                //.Select(x => QueryHelpers.ParseQuery(x)["id"].FirstOrDefault());

            #if DEBUG
            //Console.WriteLine(urlPage);
            #endif

            return urlDetails;
        }
        
        public static async Task<string[]> GetPageUrls(string url)
        {
            string[] pages = new string[0];

            var htmlDoc = await GetHtmlDocument(url);

            var nodes = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Id == "CTBlockTable").ToList();
            var pageCtrl = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("p-begin")).ToList();
            var pageUrls = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("page_o")).Select(x => x.Attributes["href"].Value).ToList();

            var max = int.Parse(QueryHelpers.ParseQuery(pageUrls.LastOrDefault())["page"].FirstOrDefault());

            var baseUrl = URL_MAIN + URL_PAGE;
            pages = Enumerable.Range(1, max).Select(x => baseUrl + x).ToArray();

            return pages;

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

        public static async Task<string> GetHtmlText(string url)
        {
            var html = string.Empty;

            try
            {
                using (HttpClient client = new HttpClient() { Timeout = TimeSpan.FromSeconds(15) })
                using (HttpResponseMessage response = await client.GetAsync(url))
                using (HttpContent content = response.Content)
                {
                    html = await content.ReadAsStringAsync();

                    var start = html.IndexOf("<html");
                    var end = html.IndexOf("</html>", start);
                    html = html.Substring(start, end - start);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return html;
        }

        public static async Task<string> GetHtmlTextWithRetry(string url)
        {
            string html = string.Empty;
            try { return await GetHtmlText(url); }
            catch (Exception ex1)
            {
                #if DEBUG
                Console.WriteLine(ex1.Message);
                #endif
                try { return await GetHtmlText(url); }
                catch (Exception ex2)
                {
                    #if DEBUG
                    Console.WriteLine(ex2.Message);
                    #endif
                    try { return await GetHtmlText(url); }
                    catch (Exception ex3)
                    {
                        #if DEBUG
                        Console.WriteLine(ex3.Message);
                        #endif
                        throw ex3;
                    }
                }
            }
        }

        public static async Task<HtmlAgilityPack.HtmlDocument> GetHtmlDocument(string url)
        {
            var html = await GetHtmlTextWithRetry(url);
            var htmlDoc = new HtmlAgilityPack.HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc;

        }
    }
}
