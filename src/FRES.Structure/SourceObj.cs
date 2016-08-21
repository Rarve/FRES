using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Structure
{
    public class SourceObj
    {
        public SourceObj(string url, string data, string realEstateObj)
        {
            this.Url = url;
            this.Data = data;
            this.RealEstateJson = realEstateObj;
        }

        public SourceObj() { }

        public string Url { get; set; }
        public string Data { get; set; }
        public string RealEstateJson { get; set; }
    }
}
