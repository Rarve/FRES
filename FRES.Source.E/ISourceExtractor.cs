namespace FRES.Source.E
{
    public interface ISourceExtractor
    {
        RealEstateEntity[] Extract();
        int GetTotalPages(string url);
        string[] GetItemUrls(int total);
        RealEstateEntity[] GetDetails(string[] urls);
    }
}
