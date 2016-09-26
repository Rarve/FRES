using FRES.Data.DocumentDB;
using FRES.Structure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FRES.Business
{
    public static class RealEstateBusiness
    {
        public static async Task<List<RealEstateObj>> GetAll()
        {
            var res = await DocumentUtils.GetAll();
            return res;
        }
    }
}
