using FRES.Common;
using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FRES.Web
{
    public class RealEstateService : ApiController, IRealEstateService
    {
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
    }
}
