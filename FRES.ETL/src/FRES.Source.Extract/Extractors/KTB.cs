using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using FRES.Data;
using HtmlAgilityPack;
using FRES.Common;
using FRES.Structure;

namespace FRES.Source.Extract
{
    public class KTB : Extractor
    {
        public const string URL_MAIN = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
        public const string URL_DTLS = "http://www.npashowroom.ktb.co.th/WebShowRoom/";
        public const string USL_MAPS = "http://www.npashowroom.ktb.co.th/WebShowRoom/AjaxSearchGIS?collgrp=";
        
        public KTB(int parallelismDegree = 5) : base(parallelismDegree)
        {
        }

        public override void Extract()
        {
            var total = GetTotalPages(URL_MAIN);
            GetUrlsFromPages(total).ToArray();
            var toProcessItems = DataHelper.GetRealEstateE_NoHTML(SourceName).ToList();
            GetHtmls(toProcessItems);
        }

        public override List<string> GetUrlsFromPages(int totalPages)
        {
            var arr = new List<string>();
            var pages = Enumerable.Range(1, totalPages).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(ParallismDegree).ForAll((page) =>
            {
                var items = GetUrlsFromPage(URL_MAIN, page.ToString());
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
                var doc = Client.RetrieveHtmlPost(pageUrl, nvc).Result;
                //urls = doc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("href") && x.Attributes["href"].Value.Contains("ViewPropServlet") && x.Attributes["href"].Value.Contains("&check=")).Select(x => URL_DTLS + x.GetAttributeValue("href", string.Empty)).Distinct().ToList();
                
                var item = doc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("property_all_column1"));
                var info = item.Select(x => x.InnerHtml)
                               .Select(x => x)
                               .Select(x => x.SplitTag())
                               .ToList();


                var res = new List<RealEstateE>();
                for (int i = 0; i < info.Count; i++)
                {
                    //var url = URL_DTLS + item.ToList()[i].Descendants("a").ToList()[0].Attributes["href"].Value;//.Descendants("text_property_highlight_color").FirstOrDefault();
                    var tmpList = item.ToList()[i].Descendants("a").ToList().ToList().Select(x => x.Attributes["href"].Value).ToList();
                    var url = URL_DTLS + tmpList.Where(x => x.Contains("ViewPropServlet?propID")).FirstOrDefault();

                    if (!url.Contains("&check=1&p=na"))
                    {
                        url = url + "&check=1&p=na";
                    }

                    var json = new RealEstateObj();
                    if (info[i].Length == 12)
                    {
                        json.Code = info[i][1];
                        json.PropertyType = info[i][3];
                        json.Map.Province = info[i][5].RemovePrefix_Province();
                        json.Map.District = info[i][6].RemovePrefix_District();
                        json.Map.SubDistrict = info[i][7].RemovePrefix_SubDistrict();
                        json.SizeTotalText = info[i][9];
                        json.Map.ParcelNumber = info[i][11].Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                        //json.Price = info[i][12].RemovePrefix_Currency().ToDecimal();
                        //json.ValidUntil = info[i][14];
                        json.Source = this.GetType().Name;
                    }
                    else
                    {
                        json.Code = info[i][0];
                        json.Map.Province = info[i][1].RemovePrefix_Province();
                        json.Map.District = info[i][3].RemovePrefix_District();
                        json.Map.SubDistrict = info[i][4].RemovePrefix_SubDistrict();
                        json.SizeTotalText = info[i][7];
                        json.PropertyType = info[i][9];
                        json.Map.ParcelNumber = info[i][11].Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                        json.Price = info[i][13].RemovePrefix_Currency().ToDecimal();
                        json.ValidUntil = info[i][14];
                        json.Source = this.GetType().Name;
                    }

                    res.Add(new RealEstateE()
                    {
                        Url = url,
                        State = 0,
                        RecordStatus = 1,
                        Source = SourceName,
                        RealEstateJson = json.Serialize(true)
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
