using FRES.Common;
using FRES.Data.Models;
using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Data
{
    public class DataHelper
    {
        public static List<RealEstateE> GetRealEstateE_NoHTML(string sourceName)
        {
            var res = new List<RealEstateE>();

            using (FRESContext ctx = new FRESContext())
            {
                res = ctx.RealEstateE.Where(x => x.Source == sourceName && string.IsNullOrEmpty(x.Data)).ToList();
            }
            return res;
        }

        public static List<RealEstateE> GetRealEstateE(string sourceName)
        {
            var res = new List<RealEstateE>();

            using (FRESContext ctx = new FRESContext())
            {
                res = ctx.RealEstateE.Where(x => x.Source == sourceName).ToList();
            }
            return res;
        }

        public static List<RealEstateT> GetRealEstateT_NoLocation()
        {
            var res = new List<RealEstateT>();

            using (FRESContext ctx = new FRESContext())
            {
                res = ctx.RealEstateT.Where(x => x.Lon == 0 || x.Lat == 0).ToList();
            }
            return res;
        }

        public static List<RealEstateType> RealEstateType(string sourceName)
        {
            var res = new List<RealEstateType>();

            using (FRESContext ctx = new FRESContext())
            {
                res = ctx.RealEstateType.ToList();
            }
            return res;
        }

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

        public static int InsertRealEstateT(RealEstateT res)
        {
            var count = 0;
            using (FRESContext ctx = new FRESContext())
            {
                ctx.RealEstateT.Add(res);
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

        public static int InsertRealEstateT(List<RealEstateT> res)
        {
            var count = 0;
            using (FRESContext ctx = new FRESContext())
            {
                ctx.RealEstateT.AddRange(res);
                count = ctx.SaveChanges();
                if (res.Count != count)
                    throw new Exception("Row affected is " + count + ", expect " + res.Count);
            }
            return count;
        }

        public static int UpdateRealEstateE(RealEstateE res)
        {
            var count = 0;
            using (FRESContext ctx = new FRESContext())
            {
                ctx.RealEstateE.Update(res);
                ctx.SaveChanges();
            }
            return count;
        }
    }
}



