using System.Threading.Tasks;
using System.Web.Http;

namespace FRES.Web.Server.Controllers
{
    public interface IRealEstateService
    {
        [HttpGet]
        Task<string> GetAllAsync();

        [HttpGet]
        string GetAll();

        [HttpPost]
        Task<string> GetBySourceAsync(string source);

        [HttpPost]
        string GetBySource(string source);

        [HttpPost]
        Task<string> QueryAsync(QueryObj query);

        [HttpPost]
        string Query(QueryObj query);
    }
}