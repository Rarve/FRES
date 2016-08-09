using FRES.Common;
using FRES.Data;
using FRES.Data.Models;
using FRES.Structure;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FRES.Source.T
{
    public class TNBTransformer
    {
        private const string URL_MAIN = "http://www.thanachartnpa.com/";
        private const int PARALLELISM_DEGREE = 100;
        
        public TNBTransformer()
        {
        }

        public void Transform()
        {
            var objs = DataHelper.GetRealEstateE("TNB");
            GetDetails(objs.ToArray());

            //var reObjs = jsons.Select(x => new RealEstateT
            //{
            //    Data = JsonHelper.Serialize(x, true),
            //    Url = x.Url.Trim(),
            //    Lat = x.Map.Lat,
            //    Lon = x.Map.Lon,
            //    State = 0,
            //    RecordStatus = 1,
            //    Source = "TNB"
            //}).ToList();

            //DataHelper.InsertRealEstateT(reObjs);

            //return reObjs;
        }

        private void GetDetails(SourceObj[] urls)
        {
            urls.AsParallel()
                .WithDegreeOfParallelism(PARALLELISM_DEGREE)
                .ForAll(urlDetail => GetDetails(urlDetail));
        }

        private void GetDetails(SourceObj htmlObj)
        {
            Console.WriteLine(htmlObj.Url);
            var re = new RealEstateObj();
            var doc = new HtmlAgilityPack.HtmlDocument();
            try
            {
                doc.LoadHtml(htmlObj.Data);

                re.Url = htmlObj.Url;

                var info = doc.DocumentNode.Descendants("td")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("font_normal2"))
                            .Select(x => WebUtility.HtmlDecode(x.InnerHtml.Trim()).Trim()).ToList();

                if (info.Count > 0)
                {
                    re.Code = info[0];
                    re.Name = info[1];
                    re.Project = info[2];
                    re.Map.Desc = info[3];
                    re.DocumentOfRightType = info[4];
                    re.SizeTotal = info[5];
                    re.SizeUtility = info[6];
                    re.Width = info[6];
                    re.Depth = info[7];
                    re.WidthRoadFrontage = info[8];
                    re.Age = info[9];
                    re.Desc = info[10];
                }

                var images = RegexHelper.GetMatchStr(htmlObj.Data, "(\\/asset_images\\/(.*?)\")").Distinct().Select(x => URL_MAIN + x.TrimEnd('"')).ToList();

                if (images.Count > 1)
                {
                    re.Images.Add(images[0]);
                    re.Map.Images.Add(images[1]);
                }

                var contact = new Contact();
                contact.TellNo.Add("0-2260-6100");
                contact.Email.Add("assetforsales@thanachart.co.th");
                re.Contacts.Add(contact);

                var obj = new RealEstateT
                {
                    Data = JsonHelper.Serialize(re, true),
                    Url = re.Url.Trim(),
                    Lat = re.Map.Lat,
                    Lon = re.Map.Lon,
                    State = 0,
                    RecordStatus = 1,
                    Source = "TNB"
                };

                DataHelper.InsertRealEstateT(obj);
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/T_TNB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + htmlObj.Url + "," + ex.GetBaseException().Message + "\r\n");
            }
        }
    }
}
