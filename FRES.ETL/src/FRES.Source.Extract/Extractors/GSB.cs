using FRES.Common;
using FRES.Data;
using FRES.Structure;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FRES.Source.Extract
{
    public class GSB : Extractor
    {
        private const string URL_MAIN = "http://properties.gsb.or.th/";
        private const string URL_TOTALPAGES = "http://properties.gsb.or.th/properties/index.php?SHOWALL_1=1&Filter_KEY_NUMBER=&Filter_KEY_NUMBER_R=&Filter_CATE_ID=&Filter_TYPE_ID=1&Filter_LED_BRANCH_ID=&Filter_PRICE=&Filter_LOC_PROV_ID=&Filter_LOC_AMPH_ID=&Filter_LOC_SUBDIVITION=#nav_start";

        public GSB(int parallelismDegree = 5) : base(parallelismDegree)
        {
        }

        public override void Extract()
        {
            var total = GetTotalPages(URL_TOTALPAGES);
            GetUrlsFromPages(total).ToArray();
            var toProcessItems = DataHelper.GetRealEstateE_NoHTML(SourceName).ToList();
            GetHtmls(toProcessItems);
        }

        protected object sync = new object();
        public override List<string> GetUrlsFromPages(int total)
        {
            var urls = new List<string>();
            try
            {
                var html = Client.RetrieveHtmlStrGet(URL_TOTALPAGES).Result;
                var doc = new HtmlDocument();
                doc.LoadHtml(html);

                var odd = doc.DocumentNode.Descendants("tr").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("odd")).Select(x=>x.InnerHtml).ToList();
                var even = doc.DocumentNode.Descendants("tr").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("even")).Select(x=>x.InnerHtml).ToList();

                odd.AddRange(even);

                var info = odd.Select(x => x.SplitTag()).ToList();
                urls = odd.Select(x => x.GetMatchStr(@"(properties\/prop_detail.php\?page=home&ID=[0-9]{0,10})").FirstOrDefault()).ToList();
                //urls = RegexHelper.GetMatchStr(html, @"(\/properties\/prop_detail.php\?page=home&ID=[0-9]{0,10})").Distinct().Select(x => URL_MAIN + x).ToList();

                var res = new List<RealEstateE>();
                for (int i = 0; i < info.Count; i++)
                {
                    var json = new RealEstateObj();
                    json.Code = info[i][1].Trim();
                    json.PropertyType = info[i][2].Trim();
                    json.SizeTotal = info[i][3].Trim();
                    json.Price = info[i][5].ToDecimal();
                    json.Source = this.GetType().Name;

                    res.Add(new RealEstateE()
                    {
                        Url = URL_MAIN + urls[i].Trim(),
                        State = 0,
                        RecordStatus = 1,
                        Source = SourceName,
                        RealEstateJson = json.Serialize(true)
                    });
                }

                DataHelper.InsertRealEstateE(res);
            }
            catch (Exception ex)
            {
                lock (sync)
                {
                    File.AppendAllText("C:/RE/A_" + this.GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + "" + "," + ex.GetBaseException().Message + "\r\n");
                }
            }
            return urls;
        }

        public override int GetTotalPages(string url)
        {
            return 0;
        }
    }
}
