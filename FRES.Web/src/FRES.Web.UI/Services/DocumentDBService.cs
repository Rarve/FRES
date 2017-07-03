using FRES.Structure;
using FRES.Web.UI.Utils;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FRES.Web.UI.Data
{
    public class DocumentDBService
    {
        private static Uri _collectionUri;
        private static DocumentClient _client = null;

        public static DocumentClient Client
        {
            get
            {
                if (_client == null)
                {
                    _client = new DocumentClient(new Uri(Config.EndPointUrl), Config.AuthorizationKey);
                    _collectionUri = UriFactory.CreateDocumentCollectionUri(Config.DatabaseId, Config.CollectionId);
                }
                return _client;
            }
        }

        public static async Task<RealEstate[]> GetAll()
        {
            var db = await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(Config.DatabaseId));
            var res = Client.CreateDocumentQuery<RealEstate>(_collectionUri)
                //.Where(c => c.Source == "KTB")
                .Take(100)
                .ToArray();

            return res;
        }

        public static async Task<List<RealEstate>> GetBySource(string source)
        {
            var db = await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(Config.DatabaseId));
            var res = Client.CreateDocumentQuery<RealEstate>(_collectionUri).Where(c => c.Source.ToLower() == source.ToLower()).Take(10).ToList();
            return res;
        }

        public static async Task<RealEstate[]> Search(Query query)
        {
            var db = await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(Config.DatabaseId));
            var exp = Client.CreateDocumentQuery<RealEstate>(_collectionUri).AsQueryable();

            exp = string.IsNullOrEmpty(query.Source) ? exp : exp.Where(c => c.Source.ToLower() == query.Source.ToLower());
            exp = string.IsNullOrEmpty(query.Province) ? exp : exp.Where(c => c.Map.Province.ToLower() == query.Province.ToLower());
            exp = query.PriceMin.IsNullOrZero() ? exp : exp.Where(c => c.Price >= query.PriceMin);
            exp = query.PriceMax.IsNullOrZero() ? exp : exp.Where(c => c.Price <= query.PriceMax);

            var res = exp.Take(query.ItemPerPage).ToArray();

            return res;
        }

        private static async Task CreateDocumentCollectionIfNotExists(string databaseName, string collectionName)
        {
            try
            {
                await Client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName));
            }
            catch (DocumentClientException de)
            {
                // If the document collection does not exist, create a new collection
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    DocumentCollection collectionInfo = new Microsoft.Azure.Documents.DocumentCollection();
                    collectionInfo.Id = collectionName;

                    // Configure collections for maximum query flexibility including string range queries.
                    collectionInfo.IndexingPolicy = new IndexingPolicy(new RangeIndex(DataType.String) { Precision = -1 });

                    // Here we create a collection with 400 RU/s.
                    await Client.CreateDocumentCollectionAsync(
                        Microsoft.Azure.Documents.Client.UriFactory.CreateDatabaseUri(databaseName),
                        collectionInfo,
                        new RequestOptions { OfferThroughput = 400 });
                }
                else
                {
                    throw;
                }
            }
        }
    }
}