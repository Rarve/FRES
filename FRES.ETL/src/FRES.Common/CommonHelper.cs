using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Common
{
    public static class Extension
    {
        public static decimal ToDecimal(this string s)
        {
            decimal res = 0;
            if (string.IsNullOrEmpty(s))
            {
                return res;
            }
            decimal.TryParse(s.Trim(), out res);
            return res;
        }
    }
}
