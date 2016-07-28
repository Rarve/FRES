using FRES.Structure;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Source.Extract
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class SCB : ISourceExtractor
    {
        private const string URL_MAIN = "http://www.buyatsiam.com/";
        private const string URL_PAGE = "APropertyHome.html?page=";
        private const string URL_DTLS = "APropertyDetail.html?id=";
        private const int PARALLELISM_DEGREE = 10;

        private HttpClientHelper Client;

        public SCB()
        {
            Client = new HttpClientHelper();
        }

        public RealEstate[] Extract()
        {
            //var totalPages = GetTotalPages(URL_MAIN + URL_PAGE);
            //var urlDetls = GetItemUrls(totalPages).OrderBy(x => x).ToArray();
            //var realEstate = GetDetails(urlDetls);

            //return realEstate;

            var asdf = GetDetails("http://www.buyatsiam.com/APropertyDetail.html?id=23318").Result;
            return null;
        }

        public string[] GetItemUrls(int total)
        {
            var arr = new List<string>();
            var sync = new object();

            var baseUrl = URL_MAIN + URL_PAGE;
            var pages = Enumerable.Range(1, total).Select(x => baseUrl + x).ToArray();

            pages.AsParallel().WithDegreeOfParallelism(PARALLELISM_DEGREE).ForAll((page) =>
            {
                var detailUrls = GetItemUrls(page).Result;
                lock (sync)
                {
                    arr.AddRange(detailUrls);
                }
            });

            return arr.ToArray();
        }

        private async Task<string[]> GetItemUrls(string url)
        {
            var ret = new string[0];
            try
            {
                Console.WriteLine(url);
                var pageHtml = await Client.RetrieveHtmlGet(url);
                ret = pageHtml.DocumentNode.Descendants("div")
                    .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("MainColumn"))
                    .Select(x => URL_MAIN + x.Descendants("a").FirstOrDefault().Attributes["href"].Value).ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                Console.ReadKey();
                //throw ex;
            }
            return ret;
        }

        public int GetTotalPages(string url)
        {
            var pages = new string[0];
            var htmlDoc = Client.RetrieveHtmlGet(url).Result;
            var nodes = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Id == "CTBlockTable").ToList();
            var pageCtrl = htmlDoc.DocumentNode.Descendants("div").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("p-begin")).ToList();
            var pageUrls = htmlDoc.DocumentNode.Descendants("a").Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("page_o")).Select(x => x.Attributes["href"].Value).ToList();
            var totalPages = int.Parse(QueryHelpers.ParseQuery(pageUrls.LastOrDefault())["page"].FirstOrDefault());
            
            return totalPages;
        }

        public RealEstate[] GetDetails(string[] urls)
        {
            var ret = urls.AsParallel()
                        .WithDegreeOfParallelism(PARALLELISM_DEGREE)
                        .Select(urlDetail => GetDetails(urlDetail).Result);
            return ret.ToArray();

            //var arr = new List<RealEstate>();
            //var sync = new object();
            ////Parallel.ForEach(urlDetails, new ParallelOptions { MaxDegreeOfParallelism = 1 }, urlDetail =>
            //foreach (var urlDetail in urlDetails)
            //{
            //    lock (sync)
            //    {
            //        var re = GetDetails(urlDetail).Result;
            //        arr.Add(re);
            //    }
            //}//);
            //return arr.ToArray();
        }

        private async Task<RealEstate> GetDetails(string url)
        {
            Console.WriteLine(url);
            var re = new RealEstate();
            try
            {
                var doc = await Client.RetrieveHtmlGet(url);

                var isSoldout = doc.DocumentNode.Descendants("a")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("thumb-label label-sold-s")).FirstOrDefault();

                if (isSoldout == null)
                {
                    re.IsSoldOut = true;
                }

                re.Url = url;
                re.Icon = URL_MAIN + doc.DocumentNode.Descendants("p")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("Thumb-s"))
                            .FirstOrDefault().ChildNodes["img"].GetAttributeValue("src", string.Empty);
                re.Name = doc.DocumentNode.Descendants("div").Where(x => x.Id == "Lname").FirstOrDefault().ChildNodes["h3"].InnerText;

                var detailTitles = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2"))
                            .Select(x => RegexHelper.StripHTML(x.PreviousSibling.InnerHtml)).ToList();

                var detailDescs = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2"))
                            .Select(x => RegexHelper.StripHTML(x.InnerHtml)).ToList();

                var details = new List<KeyValuePair<string, string>>();

                for (int i = 0; i < detailTitles.Count(); i++)
                {
                    details.Add(new KeyValuePair<string, string>(detailTitles[i], detailDescs[i]));
                }

                re.Details = details;

                //re.PropertyCode = doc.DocumentNode.Descendants("div")
                //            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[0].InnerHtml;

                //re.Size = doc.DocumentNode.Descendants("div")
                //            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[1].InnerHtml;

                //re.Map.Desc = doc.DocumentNode.Descendants("div")
                //            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("col2")).ToArray()[2].InnerHtml;

                var gallery = doc.DocumentNode.Descendants("ul").Where(x => x.Id == "imageGallery").FirstOrDefault();
                if (gallery != null)
                {
                    re.Images = gallery.Elements("li")
                                .Select(x => URL_MAIN + x.Descendants("img").FirstOrDefault()
                                .GetAttributeValue("src", string.Empty))
                                .Select(x => new Image() { Url = x }).ToList();
                }

                var contact = new Contact();
                
                var contactStr = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("C_label")).FirstOrDefault()
                            .Element("div").InnerHtml.Trim();

                var contactTells = RegexHelper.GetMatchStr(contactStr, RegexHelper.REGEX_TELL_NO);

                contact.TellNo = contactTells.ToArray();
                contact.Desc = RegexHelper.StripHTML(contactStr);

                re.Contact.Add(contact);

                var loc = doc.DocumentNode.Descendants("div")
                            .Where(x => x.Attributes.Contains("class") && x.Attributes["class"].Value.Contains("chromemenu")).FirstOrDefault().InnerHtml.Trim();

                if (loc.Contains("พิกัด Latitude(X):"))
                {
                    var arr = loc.Replace("พิกัด Latitude(X):", string.Empty).Replace("Longitude(Y):", string.Empty).Substring(0, loc.IndexOf("<br>")).Replace("<br>", string.Empty).Trim().Split(',');
                    re.Map.Latt = double.Parse(arr[0].Trim());
                    re.Map.Long = double.Parse(arr[1].Trim());
                }

                var mapImg = URL_MAIN + doc.DocumentNode.Descendants("div").Where(x => x.Id == "imagetab").FirstOrDefault().Element("img").GetAttributeValue("src", string.Empty);

                re.Map.Images.Add(new Image() { Url = mapImg });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                Console.ReadKey();
                throw;
            }
            return re;
        }
    }
}
