using FRES.Structure;
using FRES.Web.UI.Data;
using FRES.Web.UI.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FRES.Web.UI.Controllers
{
    [Route("api/[controller]")]
    public class RealEstateController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public async Task<RealEstate[]> All()
        {
            return await DocumentDBService.GetAll();
        }

        [HttpPost("[action]")]
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