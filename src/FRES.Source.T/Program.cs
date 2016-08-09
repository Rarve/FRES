using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Source.T
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var ghb = new GHBTransformer();
            ghb.Transform();

            //var scb = new SCBTransformer();
            //scb.Transform();

            //var ktb = new KTBTransformer();
            //ktb.Transform();

            //var tnb = new TNBTransformer();
            //tnb.Transform();

        }
    }
}
