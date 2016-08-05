using FRES.Common;
using FRES.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FRES.Data.Models;

namespace FRES.Source.E
{
    public class GHBExtractor : AbsExtractor
    {
        private const string URL_PAGE = "http://www.ghbhomecenter.com/ghb?_keyword=&_promotion_id=&_type=&_ntype=&_mtype=B&_province=&_amphur=&_tumbol=&_pricerange=&_area=&_orderby=&_perpage=15&_page=";
        private const string URL_DTLS = "http://www.ghbhomecenter.com";

        public GHBExtractor(string sourceName, string totalPageUrl, int parallelismDegree) : base(sourceName, totalPageUrl, parallelismDegree)
        {
        }
        
        protected override List<string> GetUrls(int total)
        {
            var arr = new List<string>();
            var sync = new object();            
            var pages = Enumerable.Range(1, total).Select(x => URL_PAGE + x).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(2).ForAll((page) =>
            {
                var detailUrls = GetUrlsFromPage(page);
            });

            return arr;
        }

        protected object sync = new object();
        protected List<string> GetUrlsFromPage(string url)
        {
            var urls = new List<string>();
            try
            {
                var html = Client.RetrieveHtmlStrGet(url).Result;
                urls = RegexHelper.GetMatchStr(html, @"(\/detail-)[0-9]{0,20}").Distinct().Select(x => URL_DTLS + x).ToList();
            }
            catch (Exception ex)
            {
                lock (sync)
                {
                    File.AppendAllText("D:/RE/A_" + this.GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
                }
            }
            return urls;
        }

        protected override int GetTotalPages(string url)
        {
            var html = Client.RetrieveHtmlStrGet(url).Result;
            var totalStr = RegexHelper.GetStrBtw(html, "<div class=\"txt\">จาก <span>", "</span>");
            int total = 0;
            int.TryParse(totalStr, out total);
            return total;
        }
    }
}