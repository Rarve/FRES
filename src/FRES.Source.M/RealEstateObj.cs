using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Source.M
{
    public class RealEstateObj
    {
        public RealEstateObj()
        {
            Images = new List<string>();
            Map = new Map();
            Contacts = new List<Contact>();
        }

        public string Code { get; set; }
        public string Url { get; set; }
        public bool IsSoldOut { get; set; }
        public string Icon { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Desc { get; set; }
        public string SizeTotal { get; set; }
        public string SizeUtility { get; set; }
        public string Width { get; set; }
        public string WidthRoadFrontage { get; set; }
        public string Depth { get; set; }
        public string Age { get; set; }
        public string BedRooom { get; set; }
        public string BathRoom { get; set; }
        public string Storeys { get; set; }
        public string ParkingSpace { get; set; }
        public string PropertyType { get; set; }
        public string DocumentOfRightType { get; set; }
        public string DocumentOfRightDesc { get; set; }
        public string Promotion { get; set; }
        public List<string> Images { get; set; }
        public Map Map { get; set; }
        public List<Contact> Contacts { get; set; }
        public string Remark { get; set; }
        public string RealEstateCondition { get; set; }
        public string Owner { get; set; }
        public string Project { get; set; }

        public string Timestamp { get; set; }

        public Dictionary<string, string> Details { get; set; }
    }

    public class Map
    {
        public Map()
        {
            Images = new List<string>();
        }

        public double Lat { get; set; }
        public double Lon { get; set; }
        public List<string> Images { get; set; }
        public string Province { get; set; }
        public string Amphur { get; set; }
        public string[] ParcelNumber { get; set; }
        public string Desc { get; set; }
    }

    public class Contact
    {
        public Contact()
        {
            TellNo = new List<string>();
            Email = new List<string>();
        }
        public string Name { get; set; }
        public List<string> TellNo { get; set; }
        public List<string> Email { get; set; }
    }
}
