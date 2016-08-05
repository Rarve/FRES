using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Structure
{
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
    }
}
