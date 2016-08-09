using FRES.Common;
using FRES.Data;
using FRES.Data.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FRES.Source.E
{
    public abstract class AbsExtractor
    {
        protected abstract int GetTotalPages(string url);
        protected abstract List<string> GetUrls(int total);

        protected HttpClientHelper Client;
        protected int ParallismDegree = 1;
        protected string SourceName = string.Empty;
        protected string MainPageUrl = string.Empty;
        private int parallelismDegree;

        public AbsExtractor(string sourceName, string totalPageUrl, int parallelismDegree = 5)
        {
            Client = new HttpClientHelper();
            SourceName = sourceName;
            MainPageUrl = totalPageUrl;
            ParallismDegree = parallelismDegree;
        }
        
        public void Extract()
        {
            var total = GetTotalPages(MainPageUrl);
            GetUrls(total).ToArray();

            var toProcessItems = DataHelper.GetRealEstateE_NoHTML(SourceName);
            GetHtmls(toProcessItems);
        }

        protected void GetHtmls(List<RealEstateE> toProcessItems)
        {
            toProcessItems.AsParallel()
                        .AsParallel().WithDegreeOfParallelism(ParallismDegree)
                        .ForAll(toProcessItem => GetHtml(toProcessItem));
        }

        protected void GetHtml(RealEstateE toProcessItem)
        {
            var html = string.Empty;
            try
            {
                toProcessItem.Data = Client.RetrieveHtmlStrGet(toProcessItem.Url).Result;
                DataHelper.UpdateRealEstateE(toProcessItem);
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/E_" + GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + toProcessItem.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }
}
