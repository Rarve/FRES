using System.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace FRES.Source.M
{
    public static class WebElementExtensions
    {
        public static void SelectBySubText(this SelectElement me, string subText)
        {
            foreach (var option in me.Options.Where(option => option.Text.Contains(subText)))
            {
                option.Click();
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
                if (element.Options.Count >= 2)
                {
                    return element;
                }
                return null;
            });
        }
    }
}