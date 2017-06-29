using FRES.Data;
using FRES.Source.Map;
using FRES.Structure;
using Microsoft.Azure.Documents.Spatial;
using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FRES.Source.Map
{
    public class MapRetriever
    {
        public static int TIMEOUT = 240;
        public const int DELAY = 1000;

        public object sync = new object();
        public void GetMap()
        {
            var items = DataHelper.GetRealEstateT_NoLocation().ToList();

            Parallel.ForEach(items, new ParallelOptions { MaxDegreeOfParallelism = 4 }, item =>
            //foreach (var item in items)
            {
                try
                {
                    var jsonObj = JsonConvert.DeserializeObject<RealEstateObj>(item.Data);
                    Console.WriteLine(item.Url + ", " + item.Province + ", " + item.District + ", " + string.Join(", ", item.ParcelNo));

                    if (item.ParcelNo != null && item.ParcelNo != "null" && item.ParcelNo.Length > 0)
                    {
                        var parcelNos = JsonConvert.DeserializeObject<List<string>>(item.ParcelNo).ToArray();
                        var loc = GetLocation(item.Url, item.Province, item.District, parcelNos);

                        if (loc != null && loc.Lat != null && loc.Lon != null)
                        {
                            jsonObj.Map.Lat = (double)loc.Lat;
                            jsonObj.Map.Lon = (double)loc.Lon;
                            //jsonObj.Map.Coordinate = new Point((double)loc.Lon, (double)loc.Lat);

                            item.Data = JsonConvert.SerializeObject(jsonObj, Formatting.Indented);
                            item.Lat = (double)loc.Lat;
                            item.Lon = (double)loc.Lon;

                            DataHelper.UpdateRealEstateT_Location(item);
                        }
                    }

                }
                catch (Exception ex)
                {
                    lock(sync)
                        File.AppendAllText("C:/RE/M.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + item.Url + "," + ex.GetBaseException().Message + "\r\n");
                }
            }
            );

            //var items = DataHelper.GetRealEstateT_NoLocation();
            //var resObjs = items.AsParallel().WithDegreeOfParallelism(10).Select(x => JsonHelper.Deserialize<RealEstateObj>(x.Data))
            //    .Select(x => GetLocation(x.Map.Province, x.Map.Amphur, x.Map.ParcelNumber));
        }

        public Location GetLocation(string url, string province, string district, string[] parcelNos)
        {
            var loc = new Location();
            if (parcelNos == null)
            {
                return null;
            }

            var result = parcelNos.Select(x => GetLocation(url, province, district, x)).Where(x => x.Lat != 0 && x.Lon != 0);

            if (result != null)
            {
                loc = parcelNos.Select(x => GetLocation(url, province, district, x)).ToList().Where(x => x?.Lat != 0 && x?.Lon != 0).FirstOrDefault();
            }

            return loc;
        }

        public Location GetLocation(string urlRe, string province, string district, string pacelNo)
        {
            var result = new Location();
            var parcel = 0;

            if (string.IsNullOrEmpty(province) || string.IsNullOrEmpty(district) || string.IsNullOrEmpty(pacelNo))
            {
                return result;
            }

            if (pacelNo.Contains("-"))
            {
                var stat = int.TryParse(pacelNo.Split('-')[0], out parcel);
                if (!stat)
                    return result;
            }
            else
            {
                var stat = int.TryParse(pacelNo, out parcel);
                if (!stat)
                    return result;
            }
            
            var loc = DataHelper.GetLocation(province, district, parcel);
            if (loc != null)
            {
                return loc;
            }

            if (district == "จังหวัด")
            {
                return null;
            }

            //IWebDriver driver = new OpenQA.Selenium.PhantomJS.PhantomJSDriver();
            try
            {
                using (var driver = new OpenQA.Selenium.Chrome.ChromeDriver())
                //using (var driver = new OpenQA.Selenium.PhantomJS.PhantomJSDriver())
                {
                    var url = "http://dolwms.dol.go.th/tvwebp/";
                    driver.Navigate().GoToUrl(url);
                    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT));

                    Thread.Sleep(DELAY);

                    var ddlProvince = WebElementExtensions.FindElement(driver, By.Id("ddlProvince"), TIMEOUT);
                    //var ddlProvince = driver.FindSelectElementWhenPopulated(By.Name("ddlProvince"), TIMEOUT);
                    ddlProvince.SelectBySubText(province);

                    Thread.Sleep(DELAY);

                    var ddlAmphur = WebElementExtensions.FindElement(driver, By.Id("ddlAmphur"), TIMEOUT);
                    //var ddlAmphur = driver.FindSelectElementWhenPopulated(By.Name("ddlAmphur"), TIMEOUT);
                    ddlAmphur.SelectBySubText(district);

                    Thread.Sleep(DELAY);

                    var txtPacelNo = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT)).Until(ExpectedConditions.ElementExists(By.Name("txtPacelNo")));
                    txtPacelNo.SendKeys(pacelNo);

                    Thread.Sleep(DELAY);

                    var btnFind = driver.FindElement(By.Id("btnFind"));
                    IJavaScriptExecutor js = driver as IJavaScriptExecutor;
                    js.ExecuteScript("arguments[0].click();", btnFind);

                    Thread.Sleep(DELAY);
                    //var element = new WebDriverWait(driver, TimeSpan.FromSeconds(3)).Until(ExpectedConditions.TextToBePresentInElement(driver.FindElement(By.Id("ddlAmphur")), "01"));
                    //wait.Until(ExpectedConditions.ElementExists(By.CssSelector("div[style=\"transform: translateZ(0px); position: absolute; left: 0px; top: 0px; z-index: 107; width: 100%;\"]")));

                    var isExist = wait.Until((d) => { return driver.PageSource.Contains("createMarker( new Array("); });

                    if (isExist)
                    {
                        var html = driver.PageSource;
                        html = GetStrBtw(html, "createMarker( new Array(", "));");//.Replace("'", string.Empty);
                        var dtls = html.Split(',').Select(x => x.Replace("'", "")).ToArray();
                        result = new Location
                        {
                            Amphur = district,
                            Province = province,
                            ParcelCode = parcel,
                            Lat = double.Parse(dtls[7]),
                            Lon = double.Parse(dtls[8])
                        };

                        DataHelper.InsertLocation(result);
                    }
                    else
                    {
                        throw new Exception("Can't find location");
                    }
                }
            }
            catch (Exception ex)
            {
                lock (sync)
                  File.AppendAllText("C:/RE/M.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + province + "," + district + "," + parcel + "," + urlRe + "," + ex.GetBaseException().Message + "\r\n");
            }
            finally
            {
            }
            return result;
        }

        public string GetStrBtw(string str, string start, string end)
        {
            if (string.IsNullOrEmpty(str))
                return str;

            var idx = str.IndexOf(start) + start.Length;

            if (idx < 0)
                return str;

            var length = str.IndexOf(end, idx) - idx;
            return str.Substring(idx, length);
        }
    }
}
