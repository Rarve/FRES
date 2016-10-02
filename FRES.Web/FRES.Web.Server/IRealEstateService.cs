using FRES.Structure;
using System.Threading.Tasks;
using System.Web.Http;

namespace FRES.Web
{
    public interface IRealEstateService
    {
        [HttpGet]
        Task<string> GetAll();

        [HttpPost]
        Task<string> GetBySource(string source);

        [HttpPost]
        Task<string> Query(QueryObj query);
    }
}
