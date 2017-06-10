using FRES.Common;
using FRES.Data;
using FRES.Structure;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace FRES.Source.Extract
{
    public class TNB : Extractor
    {
        private const string URL_MAIN = "http://www.thanachartnpa.com/";
        private const string URL_TOTALPAGE = "http://www.thanachartnpa.com/main_search.asp?page=1&order=&field=&do=67410EB6F0245049202B4420EE4E2F753BC1E73ABB519417A7627557AC8F7578&p1=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p2=&p3=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p4=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p5=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p6=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p7=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A";
        private const string URL_PAGE = "http://www.thanachartnpa.com/main_search.asp?page={0}&order=&field=&do=67410EB6F0245049202B4420EE4E2F753BC1E73ABB519417A7627557AC8F7578&p1=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p2=&p3=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p4=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p5=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p6=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p7=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A";

        public TNB(int parallelismDegree = 5) : base(parallelismDegree)
        {
            //Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            //Encoding.GetEncoding(874);
        }

        public override void Extract()
        {
            var total = GetTotalPages(URL_TOTALPAGE);
            GetUrlsFromPages(2).ToArray();
            var toProcessItems = DataHelper.GetRealEstateE_NoHTML(SourceName).ToList();
            GetHtmls(toProcessItems);
        }

        public override List<string> GetUrlsFromPages(int total)
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
                var html = Client.RetrieveHtmlStrGet(pageUrl, Encoding.GetEncoding(874)).Result;
                urls = RegexHelper.GetMatchStr(html, "(assetdetail.asp\\?code=(.*?)\")").Distinct().Select(x => URL_MAIN + x.TrimEnd('"')).ToList();

                var doc = new HtmlDocument();
                doc.LoadHtml(html);

                var tmp = doc.DocumentNode.Descendants("tr")
                                 .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("font_normal1"))
                                 .Select(x => x.InnerHtml.StripHTML())
                                 .Select(x => x.Replace("\r\n", string.Empty).Trim())
                                 .ToList();

                var info = tmp.Select(x => x.Split(new string[] { "\t" }, StringSplitOptions.RemoveEmptyEntries)).ToList();

                //var res = urls.AsParallel().WithDegreeOfParallelism(ParallismDegree).Select(x =>
                //    new RealEstateE()
                //    {
                //        Url = x.Trim(),
                //        State = 0,
                //        RecordStatus = 1,
                //        Source = SourceName
                //    }
                //).ToList();

                var res = new List<RealEstateE>();
                for (int i = 0; i < urls.Count; i++)
                {
                    var json = new RealEstateObj()
                    {
                        Code = info[i][0],
                        PropertyType = info[i][1],
                        Name = info[i][2],
                        SizeTotalText = info[i][3]
                    };
                    json.Map.District = info[i][4];
                    json.Map.Province = info[i][5];
                    json.Price = info[i][7].ToDecimal();
                    json.Source = this.GetType().Name;

                    res.Add(new RealEstateE()
                    {
                        Url = urls[i].Trim(),
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
            var totalPages = 0;
            var pages = new string[0];
            var html = Client.RetrieveHtmlStrGet(url, Encoding.GetEncoding(874)).Result;
            var totalStr = html.GetStrBtw("มีทั้งหมด", "หน้า");
            int.TryParse(totalStr.Trim(), out totalPages);
            return totalPages;
        }

        protected override void GetHtml(RealEstateE toProcessItem)
        {
            var html = string.Empty;
            try
            {
                toProcessItem.Data = Client.RetrieveHtmlStrGet(toProcessItem.Url, Encoding.GetEncoding(874)).Result.Trim();
                DataHelper.UpdateRealEstateE(toProcessItem);
            }
            catch (Exception ex)
            {
                File.AppendAllText("C:/RE/E_" + GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + toProcessItem.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }
}
