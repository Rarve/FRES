using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FRES.Source.E
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class SCB : ISourceExtractor
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const string URL_PAGE = "APropertyHome.html?page=";
        private const string URL_DTLS = "APropertyDetail.html?id=";
        private const int PARALLELISM_DEGREE = 10;

        private HttpClientHelper Client;

        public SCB()
        {
            Client = new HttpClientHelper();
        }

        public RealEstateEntity[] Extract()
        {
            //var total = GetTotalPages(URL_MAIN + URL_PAGE);
            //var urls = GetItemUrls(total).ToArray();
            //File.WriteAllText("D:/SCBUrlList.txt", JsonConvert.SerializeObject(urls));

            var str = File.ReadAllText("D:/SCBUrlList.txt");
            var urls = JsonConvert.DeserializeObject<string[]>(str);
            var realEstate = GetDetails(urls);

            File.AppendAllText("D:/SCBHTML.txt", JsonConvert.SerializeObject(realEstate));
            //var table = new CloudTableStorageHelper("ExtractSCB");
            //table.Insert(realEstate);

            return realEstate;
        }

        public string[] GetItemUrls(int total)
        {
            var arr = new List<string>();
            var sync = new object();

            var baseUrl = URL_MAIN + URL_PAGE;
            var pages = Enumerable.Range(1, total).Select(x => baseUrl + x).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE).ForAll((page) =>
            {
                var detailUrls = GetItemUrls(page);
                lock (sync)
                {
                    arr.AddRange(detailUrls);
                }
            });

            return arr.ToArray();
        }

        private string[] GetItemUrls(string url)
        {
            var ret = new string[0];
            try
            {
                //Console.WriteLine(url);
                //var pageHtml = await Client.RetrieveHtmlGet(url);
                //ret = pageHtml.DocumentNode.Descendants("div")
                //    .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("MainColumn"))
                //    .Select(x => URL_MAIN + x.Descendants("a").FirstOrDefault().Attributes["href"].Value).ToArray();

                var html = Client.RetrieveHtmlStrGet(url).Result;
                var urls = RegexHelper.GetMatchStr(html, @"(APropertyDetail.html\?id=[0-9]{0,20})").Distinct().Select(x => URL_MAIN + x).ToArray();
                return urls;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                Console.ReadKey();
                //throw ex;
            }
            return ret;
        }

        public int GetTotalPages(string url)
        {
            var pages = new string[0];
            var htmlDoc = Client.RetrieveHtmlGet(url).Result;
            var nodes = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Id == "CTBlockTable").ToList();
            var pageCtrl = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("p-begin")).ToList();
            var pageUrls = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("page_o")).Select(x => x.Attributes["href"].Value).ToList();
            var totalPages = int.Parse(QueryHelpers.ParseQuery(pageUrls.LastOrDefault())["page"].FirstOrDefault());

            return totalPages;
        }

        public RealEstateEntity[] GetDetails(string[] urls)
        {
            var ret = urls.AsParallel()
                        .AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(url => GetDetails(url));
            return ret.ToArray();
        }

        public RealEstateEntity GetDetails(string url)
        {
            var res = new RealEstateEntity(url, Client.RetrieveHtmlStrGet(url).Result);       
            return res;
        }
    }
}
