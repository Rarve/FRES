using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        }

        public string Icon { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Size { get; set; }
        public string PropertyCode { get; set; }
        public List<Image> Images { get; set; }
        public Map Map { get; set; }
        public string Contact { get; set; }
    }
}
