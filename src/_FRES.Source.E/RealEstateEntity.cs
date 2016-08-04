using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Source.E
{
    public class RealEstateEntity : TableEntity
    {
        public RealEstateEntity(string url, string html)
        {
            this.URL = url;
            this.HTML = html;
            this.RowKey = WebUtility.UrlEncode(url);
            this.PartitionKey = DateTime.UtcNow.ToString("yyyyMMdd");
            this.PartitionDate = DateTime.UtcNow.ToString("yyyyMMdd");
            this.Timestamp = DateTime.UtcNow;
        }

        public RealEstateEntity() { }

        public string URL { get; set; }
        public string HTML { get; set; }
        public string PartitionDate { get; set; }
    }
}
