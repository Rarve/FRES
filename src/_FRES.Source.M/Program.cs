using FRES.Source.M;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Support.UI;
using System;
using System.Text.RegularExpressions;
using System.Threading;
using WatiN.Core;

namespace FRES.Source.M
{
    class Program
    {
        public static int TIMEOUT = 60;
        [STAThread]
        static void Main(string[] args)
        {
               IWebDriver driver = new OpenQA.Selenium.Chrome.ChromeDriver();
            try
            {
                var url = "http://dolwms.dol.go.th/tvwebp/";
                driver.Navigate().GoToUrl(url);
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT));

                var ddlProvince = driver.FindSelectElementWhenPopulated(By.Name("ddlProvince"), TIMEOUT);
                ddlProvince.SelectBySubText("กรุงเทพ");

                Thread.Sleep(1000);

                var ddlAmphur = driver.FindSelectElementWhenPopulated(By.Name("ddlAmphur"), TIMEOUT);
                ddlAmphur.SelectBySubText("ห้วยขวาง");

                Thread.Sleep(1000);

                var txtPacelNo = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT)).Until(ExpectedConditions.ElementExists(By.Name("txtPacelNo")));
                txtPacelNo.SendKeys("713");

                Thread.Sleep(1000);

                var btnFind = driver.FindElement(By.Name("btnFind"));

                //var btnFind = new WebDriverWait(driver, TimeSpan.FromSeconds(TIMEOUT)).Until(ExpectedConditions.ElementToBeClickable(By.Name("btnFind")));
                btnFind.Click();

                //IJavaScriptExecutor executor = (IJavaScriptExecutor)driver;
                //executor.ExecuteScript("arguments[0].click();", btnFind);

                //var element = new WebDriverWait(driver, TimeSpan.FromSeconds(3)).Until(ExpectedConditions.TextToBePresentInElement(driver.FindElement(By.Id("ddlAmphur")), "01"));
                wait.Until(ExpectedConditions.ElementExists(By.CssSelector("color:red")));

                var html = GetStrBtw(driver.PageSource, "<div style=\"width: 100 %; background - color:#CEECF5\">", "</div>");
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
            var idx = str.IndexOf(start) + start.Length;
            var length = str.IndexOf(end, idx) - idx;
            return str.Substring(idx, length);
        }

        public static void RunWatin()
        {
            using (var ie = new IE("http://dolwms.dol.go.th/tvwebp/"))
            {
                ie.SelectList(Find.ByName("ddlProvince")).Select("กรุงเทพมหานคร");
                ie.WaitForComplete();
                ie.SelectList(Find.ByName("ddlAmphur")).Select(new Regex("([0-9]{0,2} - )" + "ห้วยขวาง"));
                ie.TextField(Find.ByName("txtPacelNo")).Value = "713";
                ie.Button(Find.ByName("btnFind")).Click();
                ie.WaitForComplete();

                ie.ForceClose();
            }
        }
    }
}
