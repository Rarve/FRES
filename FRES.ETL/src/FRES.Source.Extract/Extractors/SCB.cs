using FRES.Common;
using FRES.Data;
using FRES.Structure;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace FRES.Source.Extract
{
    public class SCB : Extractor
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const string URL_PAGE = "APropertyHome.html?page=";
        private const string URL_DTLS = "APropertyDetail.html?id=";

        public SCB(int parallelismDegree = 5) : base(parallelismDegree)
        {
        }

        public override void Extract()
        {
            var total = GetTotalPages(URL_MAIN + URL_PAGE + "1");
            GetUrlsFromPages(total).ToArray();
            var toProcessItems = DataHelper.GetRealEstateE_NoHTML(SourceName).ToList();
            GetHtmls(toProcessItems);
        }

        public override List<string> GetUrlsFromPages(int total)
        {
            var arr = new List<string>();
            var sync = new object();

            var baseUrl = URL_MAIN + URL_PAGE;
            var pages = Enumerable.Range(1, total).Select(x => baseUrl + x).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(2).ForAll((page) =>
            {
                var items = GetUrlsFromPage(page);
                lock (sync) { arr.AddRange(items); }
            });

            return arr;
        }

        protected object sync = new object();
        public List<string> GetUrlsFromPage(string pageUrl)
        {
            var urls = new List<string>();
            try
            {
                var html = Client.RetrieveHtmlStrGet(pageUrl).Result;
                //urls = RegexHelper.GetMatchStr(html, @"(APropertyDetail.html\?id=[0-9]{0,20})").Distinct().Select(x => URL_MAIN + x).ToList();
                
                var doc = new HtmlDocument();
                doc.LoadHtml(html);

                var tmp = doc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("SummaryPanel")).Select(x => x.InnerHtml).ToList();

                urls = tmp.Select(x => x.GetMatchStr(@"(APropertyDetail.html\?id=[0-9]{0,20})").Distinct().Select(y => URL_MAIN + y).FirstOrDefault()).ToList();
                var info = tmp.Select(x => x.SplitTag()).ToList();

                var res = new List<RealEstateE>();
                for (int i = 0; i < urls.Count; i++)
                {
                    var json = new RealEstateObj();
                    json.Price = info[i][0].Replace("ราคาเริ่มต้น", string.Empty).Replace("บ.", string.Empty).ToDecimal();
                    json.PropertyType = info[i][1].SplitRemoveEmpty(" ")[0].Trim();
                    json.Source = this.GetType().Name;

                    res.Add(new RealEstateE()
                    {
                        Url = urls[i].Trim(),
                        State = 0,
                        RecordStatus = 1,
                        Source = SourceName,
                        RealEstateJson = json.Serialize(true),
                    });
                }

                DataHelper.InsertRealEstateE(res.ToArray());
            }
            catch (Exception ex)
            {
                lock (sync)
                {
                    File.AppendAllText("C:/RE/A_" + this.GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + pageUrl + "," + ex.GetBaseException().Message + "\r\n");
                }
            }
            return urls;
        }

        public override int GetTotalPages(string url)
        {
            var pages = new string[0];
            var htmlDoc = Client.RetrieveHtmlGet(url).Result;
            var nodes = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Id == "CTBlockTable").ToList();
            var pageCtrl = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("p-begin")).ToList();
            var pageUrls = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("page_o")).Select(x => x.Attributes["href"].Value).ToList();
            var totalPages = int.Parse(HttpUtility.ParseQueryString(pageUrls.LastOrDefault())["page"]);

            return totalPages;
        }
    }
}
