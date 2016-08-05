using System.Collections.Generic;

namespace FRES.Structure
{
    public class RealEstate_T
    {
        public RealEstate_T()
        {
            Images = new List<string>();
            Map = new Map();
            Contacts = new List<Structure.Contact>();
        }

        public string Url { get; set; }
        public bool IsSoldOut { get; set; }
        public string Icon { get; set; }
        public string Name { get; set; }
        public List<string> Images { get; set; }
        public Map Map { get; set; }
        public List<Contact> Contacts { get; set; }
        public string Remark { get; set; }

        public string Price { get; set; }
        public string Size { get; set; }
        public string BedRooom { get; set; }
        public string BathRoom { get; set; }
        public string ParkingSpace { get; set; }
        public string PropertyType { get; set; }

        public Dictionary<string, string> Details { get; set; }
    }
}
