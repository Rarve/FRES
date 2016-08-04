using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Structure
{
    public class RealEstateExtrctObj
    {
        public RealEstateExtrctObj(string url, string html)
        {
            this.URL = url;
            this.HTML = html;
        }

        public RealEstateExtrctObj() { }

        public string URL { get; set; }
        public string HTML { get; set; }
    }
}
