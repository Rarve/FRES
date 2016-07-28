using System.Collections.Generic;

namespace FRES.Structure
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class RealEstate
    {
        public RealEstate()
        {
            Images = new List<Image>();
            Map = new Map();
            Contact = new List<Structure.Contact>();
        }

        public string Url { get; set; }
        public bool IsSoldOut { get; set; }
        public string Icon { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public List<Image> Images { get; set; }
        public Map Map { get; set; }
        public List<Contact> Contact { get; set; }
        public string Remark { get; set; }

        public List<KeyValuePair<string, string>> Details { get; set; }
        //public string PropertyCode { get; set; }
        //public string PropertyType { get; set; }
        //public string Size { get; set; }
        //public string TitleDeed { get; set; }
        //public string TitleDeedNumber { get; set; }
        //public string TitleDeedDetail { get; set; }
        //public int? NumberOfBathRoom { get; set; }
        //public int? NumberOfBedRoom { get; set; }
    }
}
