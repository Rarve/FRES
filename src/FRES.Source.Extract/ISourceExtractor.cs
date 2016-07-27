using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Source.Extract
{
    public interface ISourceExtractor
    {
        RealEstate[] Extract();
        int GetTotalPages(string url);
        string[] GetItemUrls(int total);
        RealEstate[] GetDetails(string[] urls);
    }
}
