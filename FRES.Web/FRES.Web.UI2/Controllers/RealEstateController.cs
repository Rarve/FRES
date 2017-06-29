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
        [HttpPost("[action]")]
        public async Task<RealEstate[]> All()
        {
            var res = await DocumentDBService.GetAll();
            return res;
        }

        [HttpPost("[action]")]
        public async Task<RealEstate[]> Search()
        {
            var res = default(RealEstate[]);
            var query = Request.ReadBody<Query>();
            res = await DocumentDBService.Search(query);
            return res;
        }
    }    
}