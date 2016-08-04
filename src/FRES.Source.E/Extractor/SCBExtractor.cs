using FRES.Common;
using FRES.Structure;
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
    public class SCBExtractor : ISourceExtractor
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const string URL_PAGE = "APropertyHome.html?page=";
        private const string URL_DTLS = "APropertyDetail.html?id=";
        private const int PARALLELISM_DEGREE = 10;

        private HttpClientHelper Client;

        public SCBExtractor()
        {
            Client = new HttpClientHelper();
        }

        public RealEstateExtrctObj[] Extract()
        {
            var total = GetTotalPages(URL_MAIN + URL_PAGE);
            var urls = GetItemUrls(total).ToArray();
            File.WriteAllText("D:/RE/A_SCB.txt", JsonHelper.Serialize(urls, true)));

            var str = File.ReadAllText("D:/RE/A_SCB.txt");
            urls = JsonConvert.DeserializeObject<string[]>(str);
            var res = GetDetails(urls);

            File.WriteAllText("D:/RE/E_SCB.txt", JsonHelper.Serialize(res, true)));

            return res;
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
                var html = Client.RetrieveHtmlStrGet(url).Result;
                var urls = RegexHelper.GetMatchStr(html, @"(APropertyDetail.html\?id=[0-9]{0,20})").Distinct().Select(x => URL_MAIN + x).ToArray();
                return urls;
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/A_SCB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
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

        public RealEstateExtrctObj[] GetDetails(string[] urls)
        {
            var ret = urls.AsParallel()
                        .AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(url => GetDetails(url));
            return ret.ToArray();
        }

        public RealEstateExtrctObj GetDetails(string url)
        {
            var res = default(RealEstateExtrctObj);
            var html = string.Empty;
            try
            {
                html = Client.RetrieveHtmlStrGet(url).Result;
                res = new RealEstateExtrctObj(url, html);
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/E_SCB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
            }
            return res;
        }
    }
}
