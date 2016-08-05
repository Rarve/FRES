using FRES.Common;
using FRES.Structure;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Source.T
{
    public class SCBTransformer
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const int PARALLELISM_DEGREE = 5;
        
        public SCBTransformer()
        {
        }

        public RealEstate_T[] Transform()
        {
            var str = File.ReadAllText("D:/RE/E_SCB.txt");
            var objs = JsonHelper.Deserialize<SourceObj[]>(str);
            var res = GetDetails(objs.ToArray());

            File.WriteAllText("D:/RE/T_SCB.txt", JsonHelper.Serialize(res, true));

            return res;
        }

        private RealEstate_T[] GetDetails(SourceObj[] urls)
        {
            var ret = urls.AsParallel()
                        .WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(urlDetail => GetDetails(urlDetail));
            return ret.ToArray();
        }

        private RealEstate_T GetDetails(SourceObj htmlObj)
        {
            Console.WriteLine(htmlObj.URL);
            var re = new RealEstate_T();
            var doc = new HtmlAgilityPack.HtmlDocument();
            try
            {
                doc.LoadHtml(htmlObj.HTML);

                re.Url = htmlObj.URL;

                var isSoldout = doc.DocumentNode.Descendants("a")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("thumb-label label-sold-s")).FirstOrDefault();

                if (isSoldout == null)
                {
                    re.IsSoldOut = true;
                }

                re.Url = htmlObj.URL;

                re.Icon = URL_MAIN + doc.DocumentNode.Descendants("p")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("Thumb-s"))
                            .FirstOrDefault().ChildNodes["img"].GetAttributeValue("src", string.Empty);
                
                var html = doc.DocumentNode.Descendants("div").Where(x => x.Id == "Lname").FirstOrDefault().ParentNode.ParentNode.InnerHtml;
                var titleDetails = RegexHelper.SplitTag(html);
                
                re.Name = titleDetails[0];
                re.Size = titleDetails[1];

                if (titleDetails.Length > 3)
                {
                    re.BedRooom = titleDetails[2];
                    re.BathRoom = titleDetails[4];
                    re.ParkingSpace = titleDetails[6];
                    re.Price = titleDetails[8];
                }
                else
                {
                    re.Price = titleDetails[2];
                }


                var detailTitles = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2"))
                            .Select(x => RegexHelper.StripHTML(x.PreviousSibling.InnerHtml)).ToList();

                var detailDescs = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2"))
                            .Select(x => RegexHelper.StripHTML(x.InnerHtml)).ToList();

                var details = new Dictionary<string, string>();

                for (int i = 0; i < detailTitles.Count(); i++)
                {
                    details.Add(detailTitles[i], detailDescs[i]);
                }

                var price = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("price")).FirstOrDefault().InnerHtml;

                details.Add("price", RegexHelper.StripHTML(price));
                
                re.Details = details;
                
                var gallery = doc.DocumentNode.Descendants("ul").Where(x => x.Id == "imageGallery").FirstOrDefault();

                if (gallery != null)
                {
                    re.Images = gallery.Elements("li")
                                .Select(x => URL_MAIN + x.Descendants("img").FirstOrDefault()
                                .GetAttributeValue("src", string.Empty)).ToList();
                }

                var contact = new Contact();
                
                var contactStr = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("C_label")).FirstOrDefault()
                            .Element("div").InnerHtml.Trim();

                var contactTells = RegexHelper.GetMatchStr(contactStr, RegexHelper.REGEX_TELL_NO);
                
                contact.TellNo = string.Join(",", contactTells);

                re.Contacts.Add(contact);

                var loc = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("chromemenu")).FirstOrDefault().InnerHtml.Trim();

                if (loc.Contains("พิกัด Latitude(X):"))
                {
                    var arr = loc.Replace("พิกัด Latitude(X):", string.Empty).Replace("Longitude(Y):", string.Empty).Substring(0, loc.IndexOf("<br>")).Replace("<br>", string.Empty).Trim().Split(',');
                    re.Map.Lat = double.Parse(arr[0].Trim());
                    re.Map.Lon = double.Parse(arr[1].Trim());
                }

                var mapImg = URL_MAIN + doc.DocumentNode.Descendants("div").Where(x => x.Id == "imagetab").FirstOrDefault().Element("img").GetAttributeValue("src", string.Empty);

                re.Map.Images.Add(mapImg);

                var province = RegexHelper.GetMatchStr(htmlObj.HTML, RegexHelper.REGEX_PROVINCE);
                var amphur = RegexHelper.GetMatchStr(htmlObj.HTML, RegexHelper.REGEX_AMPHUR);

                if (province.Count > 0)
                {
                    re.Map.Province = province[0].Replace("จังหวัด", string.Empty).Trim();
                }

                if (amphur.Count > 0)
                {
                    re.Map.Amphur = amphur[0].Replace("อำเภอ", string.Empty).Trim();
                }

                var parcels = new string[] { };
                if (details.ContainsKey("โฉนดเลขที่:"))
                {
                    parcels = RegexHelper.GetMatchStr(details["โฉนดเลขที่:"], RegexHelper.REGEX_NUMBER).ToArray();
                }

                if (parcels.Count() > 0)
                {
                    re.Map.ParcelNumber = parcels.Select(x => x.Trim()).ToArray();
                }
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/T_SCB.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + htmlObj.URL + "," + ex.GetBaseException().Message + "\r\n");
            }
            return re;
        }
    }
}
