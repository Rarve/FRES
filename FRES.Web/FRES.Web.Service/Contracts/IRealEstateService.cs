using FRES.Structure;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FRES.Web
{
    public interface IRealEstateService
    {
        [SwaggerOperation("GetAll")]
        Task<string> GetAll();

        [SwaggerOperation("Query")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        Task<string> Query([FromBody]QueryObj query);
    }
}
