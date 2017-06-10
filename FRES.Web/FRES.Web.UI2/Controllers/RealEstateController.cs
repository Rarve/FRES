using FRES.Structure;
using FRES.Web.UI2.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Web.UI2.Controllers
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
            var stream = Request.Body;
            var reader = new StreamReader(stream);
            var body = reader.ReadToEnd();
            var query = JsonConvert.DeserializeObject<Query>(body);
            var res = await DocumentDBService.Search(query);
            return res;
        }
    }
}