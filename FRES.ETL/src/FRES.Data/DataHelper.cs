using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FRES.Data
{
    public class DataHelper
    {
        public static List<RealEstateE> GetRealEstateE_NoHTML(string sourceName)
        {
            var res = new List<RealEstateE>();

            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateE.Where(x => x.Source == sourceName && string.IsNullOrEmpty(x.Data)).ToList();
            }
            return res;
        }

        //public static List<SourceObj> GetRealEstateE(string sourceName)
        //{
        //    var res = new List<SourceObj>();

        //    using (var ctx = new FRESContext())
        //    {
        //        res = ctx.RealEstateE.Where(x => x.Source == sourceName).Select(x => new SourceObj() { Data = x.Data, Url = x.Url, RealEstateJson = x.RealEstateJson }).ToList();
        //    }
        //    return res;
        //}

        public static List<SourceObj> GetRealEstateE(string sourceName, int period)
        {
            var res = new List<SourceObj>();

            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateE.Where(x => x.Source == sourceName && x.Period == period).Select(x => new SourceObj() { Data = x.Data, Url = x.Url, RealEstateJson = x.RealEstateJson }).ToList();
            }
            return res;
        }

        public static List<RealEstateT> GetRealEstateT(int period)
        {
            var res = new List<RealEstateT>();

            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateT.Where(x => x.Period == period).ToList();
            }
            return res;
        }

        public static List<RealEstateT> GetRealEstateT_NoLocation()
        {
            var res = new List<RealEstateT>();

            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateT.Where(x => (x.Lon == 0 || x.Lat == 0) && (!string.IsNullOrEmpty(x.Province) && !string.IsNullOrEmpty(x.District))).ToList();
            }
            return res;
        }

        public static int UpdateRealEstateT_Location(RealEstateT res)
        {
            var count = 0;
            using (var ctx = new FRESContext())
            {
                var org = ctx.RealEstateT.Find(res.RealEstateTId);
                if (org != null)
                {
                    ctx.Entry(org).CurrentValues.SetValues(res);
                    count = ctx.SaveChanges();
                }
            }
            return count;
        }

        public static Location GetLocation(string province, string amphur, int pacelNo)
        {
            var loc = new Location();
            using (var ctx = new FRESContext())
            {
                loc = ctx.Location.Where(x => x.Amphur == amphur && x.Province == province && x.ParcelCode == pacelNo && x.Lat != 0 && x.Lon != 0).FirstOrDefault();
                if (loc != null)
                {
                    return loc;
                }
            }
            return loc;
        }

        public static int InsertLocation(Location loc)
        {
            var count = 0;
            using (var ctx = new FRESContext())
            {
                ctx.Location.Add(loc);
                count = ctx.SaveChanges();
                if (count == 0)
                    throw new Exception("Row affected is 0");
            }
            return count;
        }

        public static List<RealEstateT> GetRealEstateT()
        {
            var res = new List<RealEstateT>();

            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateT.ToList();
            }
            return res;
        }

        public static List<RealEstateType> RealEstateType(string sourceName)
        {
            var res = new List<RealEstateType>();

            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateType.ToList();
            }
            return res;
        }

        public static int InsertRealEstateE(RealEstateE res)
        {
            var count = 0;
            using (var ctx = new FRESContext())
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
            using (var ctx = new FRESContext())
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
            using (var ctx = new FRESContext())
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
            using (var ctx = new FRESContext())
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
            using (var ctx = new FRESContext())
            {
                ctx.RealEstateE.Attach(res);
                var entry = ctx.Entry(res);
                entry.Property(e => e.Data).IsModified = true;
                entry.Property(e => e.State).IsModified = true;
                ctx.SaveChanges();
            }
            return count;
        }

        public static int MigrateAddress()
        {
            var count = 0;
            using (var ctx = new FRESContext())
            {
                var items = ctx.Address_bak.ToList();

                //foreach (var item in items)
                items.AsParallel().WithDegreeOfParallelism(1).ForAll(item =>
                {
                    try
                    {
                        var villages = item.VillageName.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList();
                        foreach (var village in villages)
                        {
                            ctx.Address.Add(new Address()
                            {
                                District = item.District.Trim(),
                                Province = item.Province.Trim(),
                                SubDistrict = item.SubDistrict.Trim(),
                                VillageName = village.Trim(),
                                VillageNo = item.VillageNo.Trim()
                            });
                            Console.WriteLine(item.Province + "  " + item.District + "  " + item.SubDistrict + "  " + item.VillageNo + "  " + village);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        Console.ReadKey();
                    }
                }
                );
                ctx.SaveChanges();
            }
            return count;
        }
    }
}



