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
        
        public List<RealEstateE> Extract()
        {
            var total = GetTotalPages(MainPageUrl);
            var urls = GetUrls(total).ToArray();
            var res = GetDetails(urls);
            DataHelper.InsertRealEstateE(res);
            return res;
        }

        protected List<RealEstateE> GetDetails(string[] urls)
        {
            var ret = urls.AsParallel()
                        .AsParallel().WithDegreeOfParallelism(ParallismDegree)
                        .Select(url => GetDetails(url));
            return ret.ToList();
        }

        protected RealEstateE GetDetails(string url)
        {
            var re = default(Data.Models.RealEstateE);
            var html = string.Empty;
            try
            {
                html = Client.RetrieveHtmlStrGet(url).Result;

                re = new RealEstateE
                {
                    HTML = html.Trim(),
                    URL = url.Trim(),
                    State = 0,
                    RecordStatus = 1,
                    Source = SourceName
                };
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/E_" + GetType().Name + ".log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + url + "," + ex.GetBaseException().Message + "\r\n");
            }
            return re;
        }
    }
}
