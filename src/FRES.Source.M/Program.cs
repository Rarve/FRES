using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.IO;
using System.Linq;
using System.Threading;

namespace FRES.Source.M
{
    class Program
    {
        public static int TIMEOUT = 60;
        [STAThread]
        static void Main(string[] args)
        {
            var driverPath = @"D:\Dropbox\MyProjects\FRES\src\FRES.Source.M\Drivers\";
            IWebDriver driver = new OpenQA.Selenium.PhantomJS.PhantomJSDriver(driverPath);
            try
            {
                var url = "http://dolwms.dol.go.th/tvwebp/";
                driver.Navigate().GoToUrl(url);
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT));

                var ddlProvince = driver.FindSelectElementWhenPopulated(By.Name("ddlProvince"), TIMEOUT);
                ddlProvince.SelectBySubText("กรุงเทพ");
                
                var ddlAmphur = driver.FindSelectElementWhenPopulated(By.Name("ddlAmphur"), TIMEOUT);
                ddlAmphur.SelectBySubText("ห้วยขวาง");
                
                var txtPacelNo = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT)).Until(ExpectedConditions.ElementExists(By.Name("txtPacelNo")));
                txtPacelNo.SendKeys("713");
                
                var btnFind = driver.FindElement(By.Name("btnFind"));
                IJavaScriptExecutor js = driver as IJavaScriptExecutor;
                js.ExecuteScript("arguments[0].click();", btnFind);

                //var element = new WebDriverWait(driver, TimeSpan.FromSeconds(3)).Until(ExpectedConditions.TextToBePresentInElement(driver.FindElement(By.Id("ddlAmphur")), "01"));
                //wait.Until(ExpectedConditions.ElementExists(By.CssSelector("div[style=\"transform: translateZ(0px); position: absolute; left: 0px; top: 0px; z-index: 107; width: 100%;\"]")));

                var isExist = wait.Until((d) => { return driver.PageSource.Contains("createMarker( new Array("); });

                if (isExist)
                {
                    var html = driver.PageSource;
                    html = GetStrBtw(html, "createMarker( new Array(", "));");//.Replace("'", string.Empty);
                    var dtls = html.Split(',');
                    File.WriteAllText(@"D:\RE\map.html", JsonConvert.SerializeObject(dtls, Formatting.Indented));
                }
                else
                { throw new Exception("Can't find location"); }
            }
            catch (Exception ex)
            {
            }
            finally
            {
                driver.Quit();
            }
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
