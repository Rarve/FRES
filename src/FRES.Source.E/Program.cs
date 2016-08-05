using FRES.Data;
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
            string urlSCB = "http://www.buyatsiam.com/APropertyHome.html";
            string urlKTB = "http://www.npashowroom.ktb.co.th/WebShowRoom/SearchServlet";
            string urlGHB = "http://www.ghbhomecenter.com/ghb";
            try
            {
                int parallismDegree = 10;
                AbsExtractor[] extractors = new AbsExtractor[] {
                    //new SCBExtractor("SCB", urlSCB, parallismDegree),
                    //new KTBExtractor("KTB", urlKTB, parallismDegree),
                    new GHBExtractor("GHB", urlGHB, parallismDegree)
                };

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
