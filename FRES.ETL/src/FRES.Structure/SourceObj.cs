namespace FRES.Structure
{
    public class SourceObj
    {
        public SourceObj(string url, string data, string realEstateObj)
        {
            this.Url = url;
            this.Data = data;
            this.RealEstateJson = realEstateObj;
        }

        public SourceObj()
        {
        }

        public string Url { get; set; }
        public string Data { get; set; }
        public string RealEstateJson { get; set; }
    }
}