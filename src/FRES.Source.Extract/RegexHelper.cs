using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FRES.Source.Extract
{
    public class RegexHelper
    {
        public const string REGEX_TELL_NO = @"(\(\+\d{1,2}[)]\s)?([0-9]{1,9})[\s-.]?([0-9]{1,9})[\s-.]?[\s-.]?([0-9]{1,9})";

        public static List<string> GetMatchStr(string str, string regex)
        {
            var ret = new List<string>();
            var matches = Regex.Matches(str, regex);

            for (int i = 0; i < matches.Count; i++)
            {
                ret.Add(str.Substring(matches[i].Index, matches[i].Length));
            }

            return ret;
        }

        //public static string StripHTML(string input)
        //{
        //    return Regex.Replace(input, "<.*?>", String.Empty);
        //}

        internal static string StripHTML(string data)
        {
            var document = new HtmlDocument();
            document.LoadHtml(data);

            var acceptableTags = new String[] { "strong", "em", "u" };

            var nodes = new Queue<HtmlNode>(document.DocumentNode.SelectNodes("./*|./text()"));
            while (nodes.Count > 0)
            {
                var node = nodes.Dequeue();
                var parentNode = node.ParentNode;

                if (!acceptableTags.Contains(node.Name) && node.Name != "#text")
                {
                    var childNodes = node.SelectNodes("./*|./text()");

                    if (childNodes != null)
                    {
                        foreach (var child in childNodes)
                        {
                            nodes.Enqueue(child);
                            parentNode.InsertBefore(child, node);
                        }
                    }
                    parentNode.RemoveChild(node);
                }
            }
            return document.DocumentNode.InnerHtml;
        }
    }
}
