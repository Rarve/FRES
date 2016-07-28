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

        public static string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty);
        }
    }
}
