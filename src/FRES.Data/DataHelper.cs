using FRES.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Data
{
    public class DataHelper
    {
        public static int InsertRealEstateE(RealEstateE res)
        {
            var count = 0;
            using (FRESContext ctx = new FRESContext())
            {
                ctx.RealEstateE.Add(res);
                count = ctx.SaveChanges();
                if (count == 0)
                    throw new Exception("Row affected is 0");
            }
            return count;
        }

        public static int InsertRealEstateE(List<RealEstateE> res)
        {
            var count = 0;
            using (FRESContext ctx = new FRESContext())
            {
                ctx.RealEstateE.AddRange(res);
                count = ctx.SaveChanges();
                if (res.Count != count)
                    throw new Exception("Row affected is " + count + ", expect " + res.Count);
            }
            return count;
        }
    }
}
