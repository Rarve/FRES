﻿using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace FRES.Web
{
    public interface IRealEstateService
    {
        [HttpGet]
        [SwaggerOperation("GetAll")]
        Task<string> GetAll();

        // GET api/values/5
        [ActionName("GetBySource")]
        [SwaggerOperation("GetById")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        Task<string> Get(string source);
    }
}
