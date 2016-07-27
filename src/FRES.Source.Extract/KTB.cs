using FRES.Structure;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace FRES.Source.Extract
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class KTB : ISourceExtractor
    {
        public const string URL_MAIN = "http://www.npashowroom.ktb.co.th/";
        public const string URL_LIST = "WebShowRoom/SearchServlet";
        public const string URL_DTLS = "WebShowRoom/";
        public const int PARALLELISM_DEGREE = 10;
        public const int TIMEOUT = 60;

        public HttpClientHelper Client;

        public KTB()
        {
            Client = new HttpClientHelper();
        }

        public RealEstate[] Extract()
        {
            //var total = GetTotalPages(URL_MAIN + URL_LIST);
            //var urls = GetItemUrls(total);
            //var re = GetDetails(urls);
            //return re;

            var a = GetDetails("http://www.npashowroom.ktb.co.th/WebShowRoom/ViewPropServlet?propID=30832&check=0&p=n").Result;
            return null;
        }

        public string[] GetItemUrls(int totalPages)
        {
            var arr = new List<string>();
            var sync = new object();
            var url = URL_MAIN + URL_LIST;

            var pages = Enumerable.Range(1, totalPages).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE).ForAll((page) =>
            {
                Console.WriteLine(page + "   " + url);
                var items = GetItemUrls(url, page.ToString()).Result;
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
                items = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("href") && x.Attributes["href"].Value.Contains("ViewPropServlet") && x.Attributes["href"].Value.Contains("&check=0&p=n")).Select(x => URL_MAIN + URL_DTLS + x.GetAttributeValue("href", string.Empty)).ToList();
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

                var details = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_detail_col2"))
                            .Select(x => x.FirstChild.InnerHtml).ToList();

                re.PropertyCode = details[0];
                re.PropertyType = details[1];
                re.Map.Province = details[2];
                re.Size = details[3];
                re.TitleDeed = details[4];
                re.TitleDeedNumber = details[5];
                re.TitleDeedDetail = details[6];

                bool isSuccess = false;
                decimal price = 0;
                isSuccess = decimal.TryParse(details[7], out price);
                if (isSuccess) { re.Price = price; } else { re.Price = null; }

                int number = 0;
                isSuccess = int.TryParse(details[8], out number);
                if (isSuccess) { re.NumberOfBedRoom = number; } else { re.NumberOfBedRoom = null; }
                isSuccess = int.TryParse(details[9], out number);
                if (isSuccess) { re.NumberOfBedRoom = number; } else { re.NumberOfBedRoom = null; }

                re.Map.Desc = details[10];

                re.Images = doc.DocumentNode.Descendants("img").Where(x => x.Id == "image")
                            .Select(x => x.GetAttributeValue("src", string.Empty))
                            .Distinct().Select(x => new Image() { Url = x }).ToList();

                var asdf = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") 
                                && (x.Attributes["class"].Value.Contains("box_contact_col2")
                                || x.Attributes["class"].Value.Contains("box_contact_col3")
                                || x.Attributes["class"].Value.Contains("box_contact_col4")))
                            //.Select(x => x.FirstChild.InnerHtml)
                            .ToList();




                re.PropertyCode = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[0].InnerHtml;

                re.Size = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[1].InnerHtml;

                re.Map.Desc = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[2].InnerHtml;

                var gallery = doc.DocumentNode.Descendants("ul").Where(x => x.Id == "imageGallery").FirstOrDefault();
                if (gallery != null)
                {
                    re.Images = gallery.Elements("li")
                                .Select(x => URL_MAIN + x.Descendants("img").FirstOrDefault()
                                .GetAttributeValue("src", string.Empty))
                                .Select(x => new Image() { Url = x }).ToList();

                }
                
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
