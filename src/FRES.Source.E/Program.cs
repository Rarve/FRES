using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Source.E
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                ISourceExtractor[] extractors = new ISourceExtractor[] { new KTBExtractor(), new SCBExtractor(), new GHBExtractor() };

                foreach (var extractor in extractors)
                {
                    var res = extractor.Extract();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
                Console.ReadKey();
            }
        }
    }
}
