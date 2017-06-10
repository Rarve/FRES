using System.Collections.Generic;

namespace FRES.Structure
{
    public class Map
    {
        public Map()
        {
            Images = new List<string>();
            //Coordinate = new Point(0, 0);
        }

        public double Lat { get; set; }
        public double Lon { get; set; }

        //public Point Coordinate { get; set; }
        public List<string> Images { get; set; }

        public string[] ParcelNumber { get; set; }
        public string Desc { get; set; }
        public string Number { get; set; }
        public string Village { get; set; }
        public string VillageNo { get; set; }
        public string Alley { get; set; }
        public string Lane { get; set; }
        public string Road { get; set; }
        public string SubDistrict { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
    }
}