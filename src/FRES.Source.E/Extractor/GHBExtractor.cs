using FRES.Common;
using FRES.Structure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Source.E
{
    public class GHBExtractor : ISourceExtractor
    {
        private const string URL_MAIN = "http://www.ghbhomecenter.com/ghb";
        private const string URL_PAGE = "http://www.ghbhomecenter.com/ghb?_keyword=&_promotion_id=&_type=&_ntype=&_mtype=B&_province=&_amphur=&_tumbol=&_pricerange=&_area=&_orderby=&_perpage=15&_page=";
        private const string URL_DTLS = "http://www.ghbhomecenter.com";
        private const int PARALLELISM_DEGREE = 10;

        private HttpClientHelper Client;

        public GHBExtractor()
        {
            Client = new HttpClientHelper();
        }

        public RealEstateExtrctObj[] Extract()
        {
            var total = GetTotalPages(URL_MAIN);
            var urls = GetItemUrls(total).ToArray();
            File.WriteAllText("D:/RE/A_GHB.txt", JsonHelper.Serialize(urls, true));

            var str = File.ReadAllText("D:/RE/A_GHB.txt");
            urls = JsonHelper.Deserialize<string[]>(str);
            var res = GetDetails(urls);

            File.WriteAllText("D:/RE/E_GHB.txt", JsonHelper.Serialize(res, true)));

            return res;
        }

        public string[] GetItemUrls(int total)
        {
            var arr = new List<string>();
            var sync = new object();
            
            var pages = Enumerable.Range(1, total).Select(x => URL_PAGE + x).ToArray();

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
                var urls = RegexHelper.GetMatchStr(html, @"(\/detail-)[0-9]{0,20}").Distinct().Select(x => URL_DTLS + x).ToArray();
                return urls;
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/A_GHB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
            }
            return ret;
        }

        public int GetTotalPages(string url)
        {
            var html = Client.RetrieveHtmlStrGet(url).Result;
            var totalStr = RegexHelper.GetStrBtw(html, "<div class=\"txt\">จาก <span>", "</span>");
            int total = 0;
            int.TryParse(totalStr, out total);
            return total;
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
                File.AppendAllText("D:/RE/E_GHB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
            }
            return res;
        }
    }
}