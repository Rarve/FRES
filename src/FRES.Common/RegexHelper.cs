using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FRES.Common
{
    public static class RegexHelper
    {
        public const string REGEX_TELL_NO = @"(\(\+\d{1,2}[)]\s)?([0-9]{1,9})[\s-.]?([0-9]{1,9})[\s-.]?[\s-.]?([0-9]{1,9})";
        public const string REGEX_PROVINCE = @"(จังหวัด[ ]{0,3}[ก-๙a-zA-z0-9]{3,})";
        public const string REGEX_DISTRICT = @"(เขต|อำเภอ){1}([ ]{0,3}[ก-๙a-zA-z0-9]{3,})";
        public const string REGEX_SUB_DISTRICT = @"(ตำบล|แขวง){1}([ ]{0,3}[ก-๙a-zA-z0-9]{3,})";
        public const string REGEX_VILLAGE = @"(หมู่บ้าน|อาคาร){1}([ ]{0,3}[ก-๙a-zA-z0-9 ]{3,}[ถนน])";
        public const string REGEX_VILLAGENO = @"(หมู่|หมู่ที่){1}([ ]{1,3}[ก-๙a-zA-z0-9]{1,})";
        public const string REGEX_ROAD = @"(ถนน|ถ\.){1}([ ]{0,3}[ก-๙a-zA-z0-9]{3,})";
        public const string REGEX_ALLEY = @"(ตรอก){1}([ ]{0,3}[ก-๙a-zA-z0-9]{3,})";
        public const string REGEX_LANE = @"(ซอย){1}([ ]{0,3}[ก-๙a-zA-z0-9]{3,})";
        public const string REGEX_NUMBER = @"([0-9]{1,}[-]?[0-9]{0,})";
        public const string REGEX_MONEY = @"([\d]{1,3}[,]?[\d]{1,3}[,]?[\d]{1,3}[,]??[\d]{1,3}[,]??[\d]{1,3}[,]??[\d]{1,3}[,]??[\d]{1,3}[,]?)";
        public const string REGEX_PROPERTYNUMBER = @"^([0-9]{0,10}[/]?[0-9]{0,10})";
        
        public static List<string> GetMatchStr(this string str, string regex)
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

        public static string[] SplitTag(this string input)
        {
            return Regex.Split(input, "<.*?>").Select(x => RegexHelper.StripHTML(x)).Where(x => !string.IsNullOrEmpty(x)).ToArray();
        }

        public static string StripHTML(this string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                return string.Empty;
            }

            var document = new HtmlDocument();
            document.LoadHtml(data);

            //var acceptableTags = new String[] { "strong", "em", "u" };
            var acceptableTags = new String[] {};

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
        
        public static string GetStrBtw(this string str, string start, string end)
        {
            var idx = str.IndexOf(start) + start.Length;
            var length = str.IndexOf(end, idx) - idx;
            return str.Substring(idx, length);
        }

        public static string CleanNewLineChar(this string str)
        {
            return Regex.Replace(str, @"\t|\n|\r", string.Empty).Trim();
        }

        public static string CleanNewLine(this string str)
        {
            return Regex.Replace(str, @"(\r\n[ ]{0,})", " ").Trim();
        }

        public static string CleanInfo(this string str)
        {
            StringBuilder sb = new StringBuilder(str);

            sb.Replace("เนื้อที่", string.Empty);
            sb.Replace("จำนวนชั้น", string.Empty);
            sb.Replace("สภาพ", string.Empty);
            sb.Replace("เจ้าของทรัพย์", string.Empty);
            sb.Replace("เบอร์ติดต่อ", string.Empty);
            sb.Replace("ประกาศเมื่อวันที่", string.Empty);
            sb.Replace("รายละเอียดเพิ่มเติม", string.Empty);
            sb.Replace("ข้อมูลการติดต่อ", string.Empty);
            sb.Replace("ประเภทอสังหาฯ", string.Empty);
            sb.Replace(": ", string.Empty);
            
            return sb.ToString().Trim();
        }
    }
}
