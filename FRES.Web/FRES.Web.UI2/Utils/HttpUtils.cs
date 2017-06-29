using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Web.UI2.Utils
{
    public static class HttpUtils
    {
        public static T ReadBody<T>(this HttpRequest req)
        {
            var sr = new StreamReader(req.Body);
            var str = sr.ReadToEnd();
            var obj = JsonConvert.DeserializeObject<T>(str);
            return obj;
        }
    }
}
