using FRES.Structure;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Data.DocumentDB
{

    public class DocumentUtils
    {
        private static readonly string EndPointUrl = ConfigurationManager.AppSettings["EndPointUrl"];
        private static readonly string AuthorizationKey = ConfigurationManager.AppSettings["AuthorizationKey"];
        private static readonly string DatabaseId = ConfigurationManager.AppSettings["DatabaseId"];
        private static readonly string CollectionId = ConfigurationManager.AppSettings["CollectionId"];
        private static DocumentClient _client = null;
        public static DocumentClient Client {
            get
            {
                if (_client == null)
                {
                    _client = new DocumentClient(new Uri(EndPointUrl), AuthorizationKey);
                }
                return _client;
            }
        }

        public static async Task<List<RealEstateObj>> GetAll()
        {
            var db = await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseId));
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId);
            var res = Client.CreateDocumentQuery<RealEstateObj>(collectionUri).Take(10).ToList();
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
