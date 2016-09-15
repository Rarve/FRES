using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Common
{
    public static class JsonHelper
    {
        public static T Deserialize<T>(this string str)
        {
            var res = JsonConvert.DeserializeObject<T>(str);
            return res;
        }

        public static string Serialize(this object obj, bool isFormat = false)
        {
            var str = JsonConvert.SerializeObject(obj, isFormat ? Formatting.Indented : Formatting.None);
            return str;
        }
    }
}
