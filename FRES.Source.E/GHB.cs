using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Source.E
{
    public class GHB : ISourceExtractor
    {
        private const string URL_MAIN = "http://www.ghbhomecenter.com/ghb";
        private const string URL_PAGE = "http://www.ghbhomecenter.com/ghb?_keyword=&_promotion_id=&_type=&_ntype=&_mtype=B&_province=&_amphur=&_tumbol=&_pricerange=&_area=&_orderby=&_perpage=15&_page=";
        private const string URL_DTLS = "http://www.ghbhomecenter.com";
        private const int PARALLELISM_DEGREE = 10;

        private HttpClientHelper Client;

        public GHB()
        {
            Client = new HttpClientHelper();
        }

        public RealEstateEntity[] Extract()
        {
            var total = GetTotalPages(URL_MAIN);
            var urls = GetItemUrls(total).ToArray();
            File.WriteAllText("D:/GHBUrlList.txt", JsonConvert.SerializeObject(urls));

            //var str = File.ReadAllText("D:/GHBList.txt");
            //var urls = JsonConvert.DeserializeObject<string[]>(str);
            //var realEstate = GetDetails(urls);

            //File.AppendAllText("D:/SCBHTML.txt", JsonConvert.SerializeObject(realEstate));
            //var table = new CloudTableStorageHelper("ExtractSCB");
            //table.Insert(realEstate);

            return null;
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
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                Console.ReadKey();
                //throw ex;
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