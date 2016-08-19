using FRES.Common;
using FRES.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FRES.Source.Extract
{
    public class GSB : Extractor
    {
        private const string URL_MAIN = "http://properties.gsb.or.th/properties/index.php?SHOWALL_1=1&Filter_KEY_NUMBER=&Filter_KEY_NUMBER_R=&Filter_CATE_ID=&Filter_TYPE_ID=1&Filter_LED_BRANCH_ID=&Filter_PRICE=&Filter_LOC_PROV_ID=&Filter_LOC_AMPH_ID=&Filter_LOC_SUBDIVITION=#nav_start";
        private const string URL_PAGE = "APropertyHome.html?page=";
        private const string URL_DTLS = "APropertyDetail.html?id=";

        public GSB(int parallelismDegree = 5) : base(parallelismDegree)
        {
        }

        public override void Extract()
        {
            var total = GetTotalPages(URL_MAIN);
            GetUrlsFromPages(total).ToArray();
            var toProcessItems = DataHelper.GetRealEstateE_NoHTML(SourceName);
            GetHtmls(toProcessItems);
        }

        protected object sync = new object();
        public override List<string> GetUrlsFromPages(int total)
        {
            var urls = new List<string>();
            try
            {
                var html = Client.RetrieveHtmlStrGet(URL_MAIN).Result;
                urls = RegexHelper.GetMatchStr(html, @"(\/properties\/prop_detail.php\?page=home&ID=[0-9]{0,10})").Distinct().Select(x => URL_MAIN + x).ToList();

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
                    File.AppendAllText("D:/RE/A_" + this.GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + "" + "," + ex.GetBaseException().Message + "\r\n");
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
