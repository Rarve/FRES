using FRES.Common;
using FRES.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FRES.Source.Extract
{
    public class GHB : Extractor
    {
        private string URL_TOTALITEMS = "http://www.ghbhomecenter.com/ghb";
        private const string URL_PAGE = "http://www.ghbhomecenter.com/ghb?_keyword=&_promotion_id=&_type=&_ntype=&_mtype=B&_province=&_amphur=&_tumbol=&_pricerange=&_area=&_orderby=&_perpage=100&_page=";
        private const string URL_DTLS = "http://www.ghbhomecenter.com";

        public GHB(int parallelismDegree = 5) : base(parallelismDegree)
        {
        }
        
        public override void Extract()
        {
            var total = GetTotalPages(URL_TOTALITEMS);
            GetUrlsFromPages(total).ToArray();
            var toProcessItems = DataHelper.GetRealEstateE_NoHTML(SourceName).ToList();
            GetHtmls(toProcessItems);
        }

        public override List<string> GetUrlsFromPages(int totalPages)
        {
            var arr = new List<string>();
            var pages = Enumerable.Range(1, totalPages).Select(x => URL_PAGE + x).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(ParallismDegree).ForAll((page) =>
            {
                var items = GetUrlsFromPage(page.ToString());
                lock (sync) { arr.AddRange(items); }
            });

            return arr;
        }

        protected object sync = new object();
        protected List<string> GetUrlsFromPage(string pageUrl)
        {
            var urls = new List<string>();
            try
            {
                var html = Client.GetStringGet(pageUrl).Result;
                urls = RegexHelper.GetMatchStr(html, @"(\/detail-)[0-9]{0,20}").Distinct().Select(x => URL_DTLS + x).ToList();

                var res = urls.AsParallel().WithDegreeOfParallelism(ParallismDegree).Select(x =>
                    new RealEstateE()
                    {
                        Url = x.Trim(),
                        State = 0,
                        RecordStatus = 1,
                        Source = SourceName
                    }
                ).ToList();

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
            var html = Client.GetStringGet(url).Result;
            var totalStr = RegexHelper.GetStrBtw(html, "<div class=\"txt\">จาก <span>", "</span>");
            int total = 0;
            int.TryParse(totalStr, out total);
            return total;
        }
    }
}