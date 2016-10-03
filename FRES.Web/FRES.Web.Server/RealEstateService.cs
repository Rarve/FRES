using FRES.Common;
using FRES.Structure;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace FRES.Web
{
    public class RealEstateService : Controller, IRealEstateService
    {
        [OutputCache(Duration = 86400, VaryByParam = "none")]
        public async Task<string> GetAll()
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

        public async Task<string> GetBySource(string source)
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
        
        public async Task<string> Query(QueryObj query)
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
    }
}
