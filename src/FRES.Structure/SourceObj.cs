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
        public SourceObj(string url, string data)
        {
            this.Url = url;
            this.Data = data;
        }

        public SourceObj() { }

        public string Url { get; set; }
        public string Data { get; set; }
    }
}
