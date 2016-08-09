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
            string urlTNB = "http://www.thanachartnpa.com/main_search.asp?page=1&order=&field=&do=67410EB6F0245049202B4420EE4E2F753BC1E73ABB519417A7627557AC8F7578&p1=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p2=&p3=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p4=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p5=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p6=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A&p7=71B7CFDDB5C77ED212C12BD82B444A3C679116A4D3F9AA954A9C223DC2F3649A";
            try
            {
                int parallismDegree = 5;
                AbsExtractor[] extractors = new AbsExtractor[] {
                    new SCBExtractor("SCB", urlSCB, parallismDegree),
                    new KTBExtractor("KTB", urlKTB, parallismDegree),
                    new GHBExtractor("GHB", urlGHB, parallismDegree),
                    new TNBExtractor("TNB", urlTNB, parallismDegree)
                };

                foreach (var extractor in extractors)
                {
                    extractor.Extract();
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
