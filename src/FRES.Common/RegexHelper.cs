using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FRES.Common
{
    public class RegexHelper
    {
        public const string REGEX_TELL_NO = @"(\(\+\d{1,2}[)]\s)?([0-9]{1,9})[\s-.]?([0-9]{1,9})[\s-.]?[\s-.]?([0-9]{1,9})";
        public const string REGEX_PROVINCE = @"(จังหวัด[ ]{0,3}[ก-๙]{3,})";
        public const string REGEX_AMPHUR = @"(เขต|อำเภอ){1}([ ]{0,3}[ก-๙]{3,})";
        public const string REGEX_NUMBER = @"([0-9]{1,}[-]?[0-9]{1,})";

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

        public static string[] SplitTag(string input)
        {
            return Regex.Split(input, "<.*?>").Select(x => RegexHelper.StripHTML(x)).Where(x => !string.IsNullOrEmpty(x)).ToArray();
        }

        public static string StripHTML(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                return string.Empty;
            }

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
            return WebUtility.HtmlDecode(document.DocumentNode.InnerHtml).Trim();
        }
        
        public static string GetStrBtw(string str, string start, string end)
        {
            var idx = str.IndexOf(start) + start.Length;
            var length = str.IndexOf(end, idx) - idx;
            return str.Substring(idx, length);
        }
    }
}
