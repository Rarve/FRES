using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FRES.Source.M
{
    class Program
    {
        public static int TIMEOUT = 60;
        [STAThread]
        static void Main(string[] args)
        {
            using (var ctx = new fresdbEntities1())
            {
                var items = ctx.RealEstateT.Where(x => x.Lat == 0 || x.Lon == 0).ToList();

                Parallel.ForEach(items, new ParallelOptions { MaxDegreeOfParallelism = 10 }, item =>
                //foreach (var item in items)
                {
                    try
                    {
                        var jsonObj = JsonConvert.DeserializeObject<RealEstateObj>(item.Data);
                        var pacelStr = jsonObj.Map.ParcelNumber == null ? "No Pacel" : string.Join(", ", jsonObj.Map.ParcelNumber);
                        Console.WriteLine(item.Url + ", " + jsonObj.Map.Province + ", " + jsonObj.Map.Amphur + ", " + pacelStr);
                        var loc = GetLocation(jsonObj.Map.Province, jsonObj.Map.Amphur, jsonObj.Map.ParcelNumber);

                        if (loc != null && loc.Lat != null && loc.Lon != null)
                        {
                            jsonObj.Map.Lat = (double)loc.Lat;
                            jsonObj.Map.Lon = (double)loc.Lon;

                            item.Data = JsonConvert.SerializeObject(jsonObj, Formatting.Indented);
                            item.Lat = jsonObj.Map.Lat;
                            item.Lon = jsonObj.Map.Lon;

                            var org = ctx.RealEstateT.Find(item.RealEstateTId);
                            if (org != null)
                            {
                                ctx.Entry(org).CurrentValues.SetValues(item);
                                ctx.SaveChanges();
                            }
                        }

                    }
                    catch (Exception ex)
                    {
                        File.AppendAllText("D:/RE/M.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + ex.GetBaseException().Message + "\r\n");
                    }
                });
            }
            //var items = DataHelper.GetRealEstateT_NoLocation();
            //var resObjs = items.AsParallel().WithDegreeOfParallelism(10).Select(x => JsonHelper.Deserialize<RealEstateObj>(x.Data))
            //    .Select(x => GetLocation(x.Map.Province, x.Map.Amphur, x.Map.ParcelNumber));

        }
        public static Location GetLocation(string province, string amphur, string[] pacelNos)
        {
            var loc = new Location();
            if (pacelNos == null)
            {
                return null;
            }

            var result = pacelNos.Select(x => GetLocation(province, amphur, x)).Where(x => x.Lat != 0 && x.Lon != 0);

            if (result != null)
            {
                loc = pacelNos.Select(x => GetLocation(province, amphur, x)).FirstOrDefault();
            }

            return loc;
        }

        public static Location GetLocation(string province, string amphur, string pacelNo)
        {
            var result = new Location();
            var parcel = 0;

            if (pacelNo.Contains("-"))
            {
                parcel = int.Parse(pacelNo.Split('-')[0]);
            }else
            {
                parcel = int.Parse(pacelNo);
            }

            using (var ctx = new fresdbEntities1())
            {
                var loc = ctx.Location.Where(x => x.Amphur == amphur && x.Province == province && x.ParcelCode == parcel && x.Lat != 0 && x.Lon != 0).FirstOrDefault();
                if (loc != null)
                {
                    return loc;
                }
            }

            string driverPath = @"D:\Dropbox\MyProjects\FRES\src\FRES.Source.M\Drivers\";
            IWebDriver driver = new OpenQA.Selenium.PhantomJS.PhantomJSDriver(driverPath);
            //IWebDriver driver = new OpenQA.Selenium.Chrome.ChromeDriver(driverPath);
            try
            {
                var url = "http://dolwms.dol.go.th/tvwebp/";
                driver.Navigate().GoToUrl(url);
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT));

                Thread.Sleep(1000);

                var ddlProvince = driver.FindSelectElementWhenPopulated(By.Name("ddlProvince"), TIMEOUT);
                ddlProvince.SelectBySubText(province);

                Thread.Sleep(1000);

                var ddlAmphur = driver.FindSelectElementWhenPopulated(By.Name("ddlAmphur"), TIMEOUT);
                ddlAmphur.SelectBySubText(amphur);

                Thread.Sleep(1000);

                var txtPacelNo = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT)).Until(ExpectedConditions.ElementExists(By.Name("txtPacelNo")));
                txtPacelNo.SendKeys(pacelNo);

                Thread.Sleep(1000);

                var btnFind = driver.FindElement(By.Name("btnFind"));
                IJavaScriptExecutor js = driver as IJavaScriptExecutor;
                js.ExecuteScript("arguments[0].click();", btnFind);

                Thread.Sleep(1000);
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
                        Amphur = amphur,
                        Province = province,
                        ParcelCode = parcel,
                        Lat = double.Parse(dtls[7]),
                        Lon = double.Parse(dtls[8])
                    };

                    using (var ctx = new fresdbEntities1())
                    {
                        var isNewLocation = ctx.Location.Where(x => x.Amphur == amphur && x.Province == province && x.ParcelCode == parcel).FirstOrDefault() == null;

                        if (isNewLocation)
                        {
                            ctx.Location.Add(result);
                            ctx.SaveChanges();
                        }
                    }
                }
                else
                {
                    throw new Exception("Can't find location");
                }
            }
            catch (Exception ex)
            {
                File.AppendAllText("D:/RE/M.log", DateTime.Now.ToString("yyyyMMdd HH:mm") + "," + province + "," + amphur + "," + parcel + "," + ex.GetBaseException().Message + "\r\n");
            }
            finally
            {
                //driver.Close();
                driver.Quit();
                driver.Dispose();
            }
            return result;
        }

        public static string GetStrBtw(string str, string start, string end)
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
