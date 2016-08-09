using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using FRES.Data;
using FRES.Data.Models;

namespace FRES.Source.E
{
    public class KTBExtractor : AbsExtractor
    {
        public const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        public const string USL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/AjaxSearchGIS?collgrp=";
        
        public KTBExtractor(string sourceName, string totalPageUrl, int parallelismDegree) : base(sourceName, totalPageUrl, parallelismDegree)
        {
        }
        
        protected override List<string> GetUrls(int totalPages)
        {
            var arr = new List<string>();
            var pages = Enumerable.Range(1, totalPages).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(ParallismDegree).ForAll((page) =>
            {
                var items = GetUrlsFromPage(MainPageUrl, page.ToString());
                lock (sync) { arr.AddRange(items); }
            });

            return arr;
        }

        protected object sync = new object();
        protected List<string> GetUrlsFromPage(string pageUrl, string pageNumber)
        {
            var urls = new List<string>();
            try
            {
                var nvc = new List<KeyValuePair<string, string>>() { new KeyValuePair<string, string>("numPage", pageNumber) };
                var htmlDoc = Client.RetrieveHtmlPost(pageUrl, nvc).Result;
                urls = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("href") && x.Attributes["href"].Value.Contains("ViewPropServlet") && x.Attributes["href"].Value.Contains("&check=")).Select(x => URL_DTLS + x.GetAttributeValue("href", string.Empty)).ToList();

                var res = urls.AsParallel().WithDegreeOfParallelism(ParallismDegree).Select(x =>
                    new RealEstateE()
                    {
                        Url = x.Trim(),
                        State = 0,
                        RecordStatus = 1,
                        Source = SourceName
                    }
                ).ToList();

                DataHelper.InsertRealEstateE(res);
            }
            catch (Exception ex)
            {
                lock (sync)
                {
                    File.AppendAllText("D:/RE/A_" + this.GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + pageUrl + "," + ex.GetBaseException().Message + "\r\n");
                }
            }
            return urls;
        }

        protected override int GetTotalPages(string url)
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
    }
}
