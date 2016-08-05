using FRES.Common;
using FRES.Data;
using FRES.Data.Models;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FRES.Source.E
{
    public class SCBExtractor : AbsExtractor
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const string URL_PAGE = "APropertyHome.html?page=";
        private const string URL_DTLS = "APropertyDetail.html?id=";

        public SCBExtractor(string sourceName, string totalPageUrl, int parallelismDegree) : base(sourceName, totalPageUrl, parallelismDegree)
        {
        }

        protected override List<string> GetUrls(int total)
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
        protected List<string> GetUrlsFromPage(string url)
        {
            var urls = new List<string>();
            try
            {
                var html = Client.RetrieveHtmlStrGet(url).Result;
                urls = RegexHelper.GetMatchStr(html, @"(APropertyDetail.html\?id=[0-9]{0,20})").Distinct().Select(x => URL_MAIN + x).ToList();
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
            var pages = new string[0];
            var htmlDoc = Client.RetrieveHtmlGet(url).Result;
            var nodes = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Id == "CTBlockTable").ToList();
            var pageCtrl = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("p-begin")).ToList();
            var pageUrls = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("page_o")).Select(x => x.Attributes["href"].Value).ToList();
            var totalPages = int.Parse(QueryHelpers.ParseQuery(pageUrls.LastOrDefault())["page"].FirstOrDefault());

            return totalPages;
        }
    }
}
