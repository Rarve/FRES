using System.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace FRES.Source.Map
{
    public static class WebElementExtensions
    {
        public static void SelectBySubText(this SelectElement me, string subText)
        {
            foreach (var option in me.Options.Where(option => option.Text.Contains(subText)))
            {
                try { option.Click(); } catch (Exception) { }
                return;
            }
            me.SelectByText(subText);
        }

        public static SelectElement FindSelectElementWhenPopulated(this IWebDriver driver, By by, int delayInSeconds)
        {
            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(delayInSeconds));
            return wait.Until<SelectElement>(drv =>
            {
                var element = new SelectElement(drv.FindElement(by));
                if (element.Options.Count >= 5)
                {
                    return element;
                }
                return null;
            });
        }

        public static SelectElement FindElement(this IWebDriver driver, By by, int timeoutInSeconds)
        {
            var elem = default(IWebElement);
            if (timeoutInSeconds > 0)
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
                elem = wait.Until(drv => drv.FindElement(by));
            }
            elem = driver.FindElement(by);
            return new SelectElement(elem);
        }

        public static string FindHtmlWhenTextPresent(this IWebDriver driver, string text, int delayInSeconds)
        {
            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(delayInSeconds));
            return wait.Until<string>(drv =>
            {
                if (driver.PageSource.Contains(text))
                {
                    return driver.PageSource;
                }
                return driver.PageSource;
            });
        }
    }
}