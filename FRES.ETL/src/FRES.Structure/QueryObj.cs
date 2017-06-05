using Microsoft.Azure.Documents.Spatial;

namespace FRES.Structure
{
    public class QueryObj
    {
        public string Source { get; set; }
        public decimal PriceMin { get; set; }
        public decimal PriceMax { get; set; }
        public decimal Lat { get; set; }
        public decimal Lon { get; set; }
        public Point Location { get; set; }
    }
}