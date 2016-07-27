using FRES.Source.Extract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Business
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class SCB
    {
        public SCB()
        {
        }

        public static void Extract()
        {
            ISourceExtractor ex = new Source.Extract.SCB();

            var dt1 = DateTime.Now;
            //var scb = ex.Extract();
            var dt2 = DateTime.Now;
            //Console.WriteLine((dt2 - dt1).TotalSeconds);


            ex = new Source.Extract.KTB();
            dt1 = DateTime.Now;
            var ktb = ex.Extract();
            dt2 = DateTime.Now;
            Console.WriteLine((dt2 - dt1).TotalSeconds);
            //extractor = new Source.Extract.KTB();
            //var ktb = extractor.Extract();
        }
    }
}
