using FRES.Structure;

namespace FRES.Source.E
{
    public interface ISourceExtractor
    {
        RealEstateExtrctObj[] Extract();
        int GetTotalPages(string url);
        string[] GetItemUrls(int total);
        RealEstateExtrctObj[] GetDetails(string[] urls);
    }
}
