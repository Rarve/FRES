using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FRES.Data.DocumentDB
{
    public class DocumentDBQuery
    {
        private static readonly string EndPointUrl = ConfigurationManager.AppSettings["EndPointUrl"];
        private static readonly string AuthorizationKey = ConfigurationManager.AppSettings["AuthorizationKey"];
        private static readonly string DatabaseId = ConfigurationManager.AppSettings["DatabaseId"];
        private static readonly string CollectionId = ConfigurationManager.AppSettings["CollectionId"];
        private static Uri _collectionUri;
        private static DocumentClient _client = null;

        public static DocumentClient Client
        {
            get
            {
                if (_client == null)
                {
                    _client = new DocumentClient(new Uri(EndPointUrl), AuthorizationKey);
                    _collectionUri = UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId);
                }
                return _client;
            }
        }

        public static async Task<List<RealEstate>> GetAll()
        {
            var db = await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseId));
            var res = Client.CreateDocumentQuery<RealEstateObj>(_collectionUri).Where(c => c.Source == "SCB").Take(20).ToList();
            return res;
        }

        public static async Task<List<RealEstateObj>> GetBySource(string source)
        {
            var db = await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseId));
            var res = Client.CreateDocumentQuery<RealEstateObj>(_collectionUri).Where(c => c.Source.ToLower() == source.ToLower()).Take(10).ToList();
            return res;
        }

        public static async Task<List<RealEstateObj>> GetByQuery(QueryObj query)
        {
            var db = await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseId));
            var exp = Client.CreateDocumentQuery<RealEstateObj>(_collectionUri).AsQueryable();

            exp = string.IsNullOrEmpty(query.Source) ? exp : exp.Where(c => c.Source.ToLower() == query.Source.ToLower());
            exp = query.PriceMin == 0 ? exp : exp.Where(c => c.Price >= query.PriceMin);
            exp = query.PriceMax == 0 ? exp : exp.Where(c => c.Price <= query.PriceMax);

            var res = exp.Take(10).ToList();
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
                    DocumentCollection collectionInfo = new DocumentCollection();
                    collectionInfo.Id = collectionName;

                    // Configure collections for maximum query flexibility including string range queries.
                    collectionInfo.IndexingPolicy = new IndexingPolicy(new RangeIndex(DataType.String) { Precision = -1 });

                    // Here we create a collection with 400 RU/s.
                    await Client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(databaseName),
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