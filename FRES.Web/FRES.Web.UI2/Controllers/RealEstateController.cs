using FRES.Structure;
using FRES.Web.UI2.Data;
using FRES.Web.UI2.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FRES.Web.UI2.Controllers
{
    [Route("api/[controller]")]
    public class RealEstateController : Controller
    {
        [HttpGet("[action]"), ResponseCache(Duration = 3600)]
        public async Task<RealEstate[]> All()
        {
            var res = await DocumentDBService.GetAll();
            return res;
        }

        [HttpPost("[action]"), ResponseCache(Duration = 3600)]
        public async Task<RealEstate[]> Search()
        {
            try
            {
                var res = default(RealEstate[]);
                var query = Request.ReadBody<Query>();
                res = await DocumentDBService.Search(query);
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }    
}