using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Web
{
    public interface IRealEstateService
    {
        [SwaggerOperation("GetAll")]
        Task<string> GetAll();
    }
}
