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
            Images = new List<Image>();
        }

        public string Province { get; set; }
        public double Latt { get; set; }
        public double Long { get; set; }
        public List<Image> Images { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
    }
}
