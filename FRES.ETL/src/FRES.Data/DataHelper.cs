using FRES.Structure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace FRES.Data
{
    public class DataHelper
    {
        public static List<RealEstateE> GetRealEstateE_NoHTML(string sourceName)
        {
            var res = new List<RealEstateE>();
            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateE.Where(x => x.Source == sourceName && x.Data == null).ToList();
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
                res = ctx.RealEstateT.Where(x => x.Period == period && x.Source != "GHB").ToList();
            }
            return res;
        }

        public static List<RealEstateT> GetRealEstateT_NoLocation()
        {
            var res = new List<RealEstateT>();

            using (var ctx = new FRESContext())
            {
                res = ctx.RealEstateT.Where(x => (x.Lon == 0 || x.Lat == 0) && (!(x.Province == null) && !(x.District == null)) && x.Source == "SCB").ToList();
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

            var now = DateTime.UtcNow;
            var period = 0;
            int.TryParse(now.ToString("yyyyMMdd"), out period);

            res.CreatedBy = 1;
            res.CreatedDate = now;
            res.Period = period;

            using (var ctx = new FRESContext())
            {
                ctx.RealEstateT.Add(res);
                count = ctx.SaveChanges();
                if (count == 0)
                    throw new Exception("Row affected is 0");
            }

            return count;
        }

        public static RealEstateObj DownloadImage(RealEstateObj re)
        {
            var images = re.Images.ToArray();
            if (images != null && images.Length > 0)
            {
                for (int i = 0; i < images.Length; i++)
                {
                    var name = GetStringSha256Hash(images[i]);
                    var ext = Path.GetExtension(images[i]).ToLower();
                    var localFilePath = $@"C:\Git\fres\FRES.ETL\src\FRES.Data\Images\Properties\{name}{ext}";
                    if (!File.Exists(localFilePath))
                    {
                        using (WebClient client = new WebClient())
                        {
                            client.DownloadFile(images[i], localFilePath);
                        }
                    }
                    re.Images[i] = "https://fresstorage.blob.core.windows.net/fresblob/images/properties/" + name + ext;
                }
            }


            images = re.Map.Images.ToArray();
            if (images != null && images.Length > 0)
            {
                for (int i = 0; i < images.Length; i++)
                {
                    var name = GetStringSha256Hash(images[i]);
                    var ext = Path.GetExtension(images[i]).ToLower();
                    var localFilePath = $@"C:\Git\fres\FRES.ETL\src\FRES.Data\Images\Properties\{name}{ext}";
                    if (!File.Exists(localFilePath))
                    {
                        using (WebClient client = new WebClient())
                        {
                            client.DownloadFile(images[i], localFilePath);
                        }
                    }
                    re.Map.Images[i] = "https://fresstorage.blob.core.windows.net/fresblob/images/properties/" + name + ext;
                }
            }
            return re;
        }
        
        public static string GetStringSha256Hash(string text)
        {
            if (string.IsNullOrEmpty(text))
                return string.Empty;

            using (var sha = new System.Security.Cryptography.SHA256Managed())
            {
                byte[] textData = System.Text.Encoding.UTF8.GetBytes(text);
                byte[] hash = sha.ComputeHash(textData);
                return BitConverter.ToString(hash).Replace("-", String.Empty);
            }
        }

        public static int InsertRealEstateE(RealEstateE[] res)
        {
            var count = 0;
            var now = DateTime.UtcNow;
            var period = 0;
            int.TryParse(now.ToString("yyyyMMdd"), out period);
            foreach (var obj in res)
            {
                obj.CreatedBy = 1;
                obj.CreatedDate = now;
                obj.Period = period;
            }

            using (var ctx = new FRESContext())
            {
                ctx.RealEstateE.AddRange(res);
                count = ctx.SaveChanges();
                if (res.Length != count)
                    throw new Exception("Row affected is " + count + ", expect " + res.Length);
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