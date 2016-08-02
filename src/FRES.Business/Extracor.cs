using FRES.Source.Extract;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Business
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class Extracor
    {
        public Extracor()
        {
        }

        public static void Extract()
        {
            ISourceExtractor ex = new Source.Extract.SCB();

            var scb = ex.Extract();

            foreach (var item in scb)
            {
                using (FileStream fs = new FileStream(@"D:\scb.txt", FileMode.Append, FileAccess.Write))
                using (StreamWriter sw = new StreamWriter(fs))
                {
                    var json = JsonConvert.SerializeObject(item);
                    sw.WriteLine(string.Format("{0},{1}", item.Url, json));
                    sw.Flush();
                    fs.Flush();
                }
            }

            //ex = new Source.Extract.KTB();
            //var ktb = ex.Extract();

            //using (FileStream fs = new FileStream(@"D:\ktb.txt", FileMode.Append, FileAccess.Write))
            //using (StreamWriter sw = new StreamWriter(fs))
            //{
            //    foreach (var item in ktb)
            //    {
            //        var json = JsonConvert.SerializeObject(item);
            //        sw.WriteLine(string.Format("{0},{1}", item.Url, json));
            //        sw.Flush();
            //        fs.Flush();
            //    }
            //}
        }
    }
}

