using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;

namespace FRES.Source.E
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class KTB : ISourceExtractor
    {
        public const string URL_LIST = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
        public const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        public const string USL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/AjaxSearchGIS?collgrp=";

        public const int PARALLELISM_DEGREE = 3;

        public HttpClientHelper Client;

        public KTB()
        {
            Client = new HttpClientHelper();
        }

        public RealEstateEntity[] Extract()
        {
            //var total = GetTotalPages(URL_LIST);
            //var urls = GetItemUrls(total);
            //File.WriteAllText("D:/KTBUrlList.txt", JsonConvert.SerializeObject(urls));

            var str = File.ReadAllText("D:/KTBUrlList.txt");
            var urls = JsonConvert.DeserializeObject<string[]>(str);
            var re = GetDetails(urls.Skip(1751).ToArray());


            //var table = new CloudTableStorageHelper("ExtractKTB");
            //table.Insert(re);

            return re;
        }

        public string[] GetItemUrls(int totalPages)
        {
            var arr = new List<string>();
            var sync = new object();
            var pages = Enumerable.Range(1, totalPages).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE).ForAll((page) =>
            {
                //Console.WriteLine(page + "   " + URL_LIST);
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
                //Console.WriteLine(url);
                var nvc = new List<KeyValuePair<string, string>>() { new KeyValuePair<string, string>("numPage", pageNumber) };
                var htmlDoc = await Client.RetrieveHtmlPost(url, nvc);
                items = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("href") && x.Attributes["href"].Value.Contains("ViewPropServlet") && x.Attributes["href"].Value.Contains("&check=")).Select(x => URL_DTLS + x.GetAttributeValue("href", string.Empty)).ToList();
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

        public RealEstateEntity[] GetDetails(string[] urls)
        {
            var ret = urls
                        //.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(url => GetDetails(url));
            return ret.ToArray();
        }

        public object syn = new object();
        public RealEstateEntity GetDetails(string url)
        {
            var res = default(RealEstateEntity);
            var html = string.Empty;
            try
            {
                html = Client.RetrieveHtmlStrGet(url).Result;
                res = new RealEstateEntity(url, html);
                lock (syn)
                {
                    File.AppendAllText("D:/KTBHTML.txt", JsonConvert.SerializeObject(res) + "\r\n");
                }
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/KTBLog.txt", url + "," + ex.GetBaseException().Message + "\r\n");
            }
            return res;
        }
    }
}
