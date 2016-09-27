using FRES.Data.DocumentDB;
using FRES.Structure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FRES.Business
{
    public static class RealEstateBusiness
    {
        public static async Task<List<RealEstateObj>> GetAll()
        {
            try
            {
                var res = await DocumentDBQuery.GetAll();
                return res;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static async Task<List<RealEstateObj>> GetBySource(string source)
        {
            try
            {
                var res = await DocumentDBQuery.GetBySource(source);
                return res;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static async Task<List<RealEstateObj>> GetByQuery(QueryObj query)
        {
            try
            {
                var res = await DocumentDBQuery.GetByQuery(query);
                return res;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
