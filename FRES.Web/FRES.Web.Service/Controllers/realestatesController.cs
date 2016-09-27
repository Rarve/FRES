using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using Swashbuckle.Swagger.Annotations;
using FRES.Web;
using FRES.Structure;
using FRES.Common;
using System.Threading.Tasks;

namespace FRES.Web.Host.Controllers
{
    public class RealEstatesController : ApiController
    {
        public async Task<string> GetAll()
        {
            var res = await Business.RealEstateBusiness.GetAll();
            return JsonHelper.Serialize(res);
        }
        
        public async Task<string> Query([FromBody]QueryObj query)
        {
            var res = await Business.RealEstateBusiness.GetByQuery(query);
            return JsonHelper.Serialize(res);
        }

        // GET api/values
        //[SwaggerOperation("GetAll")]
        //public override string GetAll()
        //{
        //    var res = RealEstateService.GetAll().Result;
        //    return JsonHelper.Serialize(res);
        //    //return "";
        //    //return new string[] { "value1", "value2" };
        //}

        //// GET api/values/5
        //[SwaggerOperation("GetById")]
        //[SwaggerResponse(HttpStatusCode.OK)]
        //[SwaggerResponse(HttpStatusCode.NotFound)]
        //public async Task<string> Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[SwaggerOperation("Create")]
        //[SwaggerResponse(HttpStatusCode.Created)]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[SwaggerOperation("Update")]
        //[SwaggerResponse(HttpStatusCode.OK)]
        //[SwaggerResponse(HttpStatusCode.NotFound)]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[SwaggerOperation("Delete")]
        //[SwaggerResponse(HttpStatusCode.OK)]
        //[SwaggerResponse(HttpStatusCode.NotFound)]
        //public void Delete(int id)
        //{
        //}
    }
}
