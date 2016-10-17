using FRES.Common;
using FRES.Structure;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace FRES.Web.Server.Controllers
{
    public class RealEstatesController : Controller, IRealEstateService
    {
        [OutputCache(Duration = 86400, VaryByParam = "none")]
        public async Task<string> GetAllAsync()
        {
            try
            {
                var res = await Business.RealEstateBusiness.GetAll();
                return JsonHelper.Serialize(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetAll()
        {
            try
            {
                var res = Business.RealEstateBusiness.GetAll().Result;
                return JsonHelper.Serialize(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> GetBySourceAsync(string source)
        {
            try
            {
                var res = await Business.RealEstateBusiness.GetBySource(source);
                return JsonHelper.Serialize(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string GetBySource(string source)
        {
            try
            {
                var res = Business.RealEstateBusiness.GetBySource(source).Result;
                return JsonHelper.Serialize(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> QueryAsync(QueryObj query)
        {
            try
            {
                var res = await Business.RealEstateBusiness.GetByQuery(query);
                return JsonHelper.Serialize(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string Query(QueryObj query)
        {
            try
            {
                var res = Business.RealEstateBusiness.GetByQuery(query).Result;
                return JsonHelper.Serialize(res);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
