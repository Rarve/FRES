using System.Collections.Generic;

namespace FRES.Structure
{
    public class RealEstate
    {
        public RealEstate()
        {
            Images = new List<string>();
            Map = new Map();
            Contacts = new List<Contact>();
        }

        public string Code { get; set; }
        public string Source { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string SizeTotal { get; set; }
        public string SizeTotalUnit { get; set; }
        public string SizeTotalText { get; set; }
        public string BedRoom { get; set; }
        public string BathRoom { get; set; }
        public string Storeys { get; set; }
        public string ParkingSpace { get; set; }
        public string Desc { get; set; }
        public string SizeUtility { get; set; }
        public string Width { get; set; }
        public string WidthRoadFrontage { get; set; }
        public string Depth { get; set; }
        public string Age { get; set; }
        public string PropertyType { get; set; }
        public string DocumentOfRightType { get; set; }
        public string DocumentOfRightDesc { get; set; }
        public string Promotion { get; set; }
        public string Remark { get; set; }
        public string RealEstateCondition { get; set; }
        public string Owner { get; set; }
        public string Project { get; set; }
        public string Timestamp { get; set; }
        public string ValidUntil { get; set; }
        public string Icon { get; set; }
        public bool IsSoldOut { get; set; }
        public List<string> Images { get; set; }
        public Map Map { get; set; }
        public List<Contact> Contacts { get; set; }
    }
}