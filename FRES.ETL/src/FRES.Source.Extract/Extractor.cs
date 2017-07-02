using FRES.Common;
using FRES.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FRES.Source.Extract
{
    public abstract class Extractor
    {
        public abstract int GetTotalPages(string url);
        public abstract List<string> GetUrlsFromPages(int total);
        public abstract void Extract();

        protected HttpClientHelper Client;
        protected int ParallismDegree = 1;
        protected string SourceName = string.Empty;
        private int parallelismDegree;

        public Extractor(int parallelismDegree = 5)
        {
            Client = new HttpClientHelper();
            SourceName = this.GetType().Name;
            ParallismDegree = parallelismDegree;
        }
        
        protected void GetHtmls(List<RealEstateE> toProcessItems)
        {
            toProcessItems.AsParallel()
                          .AsParallel().WithDegreeOfParallelism(ParallismDegree)
                          .ForAll(toProcessItem => GetHtml(toProcessItem));
        }

        protected virtual void GetHtml(RealEstateE toProcessItem)
        {
            var html = string.Empty;
            try
            {
                toProcessItem.Data = Client.GetStringGet(toProcessItem.Url).Result.Trim();
                DataHelper.UpdateRealEstateE(toProcessItem);
            }
            catch (Exception ex)
            {
                File.AppendAllText("C:/RE/E_" + GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + toProcessItem.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }
}
