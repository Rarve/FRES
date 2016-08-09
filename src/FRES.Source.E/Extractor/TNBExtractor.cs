using FRES.Common;
using FRES.Data;
using FRES.Data.Models;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace FRES.Source.E
{
    public class TNBExtractor : AbsExtractor
    {
        private const string URL_MAIN = "http://www.thanachartnpa.com/";
        private const string URL_PAGE = "http://www.thanachartnpa.com/main_search.asp?page={0}&order=&field=&do=67410EB6F0245049202B4420EE4E2F753BC1E73ABB519417A7627557AC8F7578&p1=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p2=&p3=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p4=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p5=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p6=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p7=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A";
        private const string URL_DTLS = "APropertyDetail.html?id=";

        public TNBExtractor(string sourceName, string totalPageUrl, int parallelismDegree) : base(sourceName, totalPageUrl, parallelismDegree)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding(874);
        }

        protected override List<string> GetUrls(int total)
        {
            var arr = new List<string>();
            var sync = new object();
            
            var pages = Enumerable.Range(1, total).Select(x => string.Format(URL_PAGE, x)).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(2).ForAll((page) =>
            {
                var items = GetUrlsFromPage(page);
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
                var html = Client.RetrieveHtmlStrGet(pageUrl).Result;
                urls = RegexHelper.GetMatchStr(html, "(assetdetail.asp\\?code=(.*?)\")").Distinct().Select(x => URL_MAIN + x.TrimEnd('"')).ToList();

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
            var totalPages = 0;
            var pages = new string[0];
            var html = Client.RetrieveHtmlStrGet(url, Encoding.GetEncoding(874)).Result;
            var totalStr = html.GetStrBtw("มีทั้งหมด", "หน้า");
            int.TryParse(totalStr.Trim(), out totalPages);
            return totalPages;
        }
    }
}
