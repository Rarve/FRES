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
            FRES.Source.Extract.SCB.Extract();
        }
    }
}
