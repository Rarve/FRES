using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using FRES.Common;
using FRES.Structure;

namespace FRES.Source.E
{
    public class KTBExtractor : ISourceExtractor
    {
        public const string URL_LIST = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
        public const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        public const string USL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/AjaxSearchGIS?collgrp=";

        public const int PARALLELISM_DEGREE = 3;

        public HttpClientHelper Client;

        public KTBExtractor()
        {
            Client = new HttpClientHelper();
        }

        public RealEstateExtrctObj[] Extract()
        {
            var total = GetTotalPages(URL_LIST);
            var urls = GetItemUrls(total);
            File.WriteAllText("D:/RE/A_KTB.txt", JsonHelper.Serialize(urls, true)));

            var str = File.ReadAllText("D:/RE/A_KTB.txt");
            urls = JsonHelper.Deserialize<string[]>(str);
            var re = GetDetails(urls.ToArray());

            File.WriteAllText("D:/RE/E_KTB.txt", JsonHelper.Serialize(re, true)));

            return re;
        }

        object sync = new object();
        public string[] GetItemUrls(int totalPages)
        {
            var arr = new List<string>();
            var pages = Enumerable.Range(1, totalPages).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE).ForAll((page) =>
            {
                var items = GetItemUrls(URL_LIST, page.ToString()).Result;
                lock (sync) { arr.AddRange(items); }
            });

            return arr.ToArray();
        }

        private async Task<List<string>> GetItemUrls(string url, string pageNumber)
        {
            var items = new List<string>();
            try
            {
                var nvc = new List<KeyValuePair<string, string>>() { new KeyValuePair<string, string>("numPage", pageNumber) };
                var htmlDoc = await Client.RetrieveHtmlPost(url, nvc);
                items = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("href") && x.Attributes["href"].Value.Contains("ViewPropServlet") && x.Attributes["href"].Value.Contains("&check=")).Select(x => URL_DTLS + x.GetAttributeValue("href", string.Empty)).ToList();
            }
            catch (Exception ex)
            {
                lock (sync)
                {
                    File.AppendAllText("D:/RE/A_KTB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
                }
            }
            return items;
        }

        public int GetTotalPages(string url)
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

        public RealEstateExtrctObj[] GetDetails(string[] urls)
        {
            var ret = urls
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
                File.AppendAllText("D:/RE/E_KTB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
            }
            return res;
        }
    }
}
