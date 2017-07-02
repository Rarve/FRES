using Newtonsoft.Json;

namespace FRES.Structure
{
    public class Query
    {
        public int PageNumber { get; set; }
        public int ItemPerPage { get; set; }
        public string Source { get; set; }
        public string Province { get; set; }
        
        public decimal? PriceMin { get; set; } = 0;
        public decimal? PriceMax { get; set; } = 0;
        public decimal? Lat { get; set; } = 0;
        public decimal? Lon { get; set; } = 0;
    }
}