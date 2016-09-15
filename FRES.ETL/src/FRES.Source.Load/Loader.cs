using System;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using FRES.Data;
using FRES.Structure;
using FRES.Common;

namespace FRES.Source.Load
{
    public class Loader
    {
        private const string EndpointUri = "https://fresdocumentdb.documents.azure.com:443/";
        private const string PrimaryKey = "JyJIGLvVXWnyZlT10tbjE35UjuVS71zPdyNQvGBis2kJLj9ysTTkbM6Rn5a5OrlwZYP4BbKXfdhIXZAnerNtVg==";
        private DocumentClient client;
        
        public async Task GetStartedDemo()
        {
            try
            {
                var items = DataHelper.GetRealEstateT_NoLocation().Select(x => JsonHelper.Deserialize<RealEstateObj>(x.Data));
                this.client = new DocumentClient(new Uri(EndpointUri), PrimaryKey);
                await this.CreateDatabaseIfNotExists("fresdb");
                await this.CreateDocumentCollectionIfNotExists("fresdb", "frescollection");

                foreach (var item in items)
                {
                    await this.CreateRealEstate("fresdb", "frescollection", item);
                }
            }
            catch (DocumentClientException de)
            {
                Exception baseException = de.GetBaseException();
                Console.WriteLine("{0} error occurred: {1}, Message: {2}", de.StatusCode, de.Message, baseException.Message);
            }
            catch (Exception e)
            {
                Exception baseException = e.GetBaseException();
                Console.WriteLine("Error: {0}, Message: {1}", e.Message, baseException.Message);
            }
            finally
            {
                Console.WriteLine("End of demo, press any key to exit.");
                Console.ReadKey();
            }
        }

        private void WriteToConsoleAndPromptToContinue(string format, params object[] args)
        {
            Console.WriteLine(format, args);
            Console.WriteLine("Press any key to continue ...");
            //Console.ReadKey();
        }

        private async Task CreateDatabaseIfNotExists(string databaseName)
        {
            // Check to verify a database with the id=FamilyDB does not exist
            try
            {
                await this.client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(databaseName));
                this.WriteToConsoleAndPromptToContinue("Found {0}", databaseName);
            }
            catch (DocumentClientException de)
            {
                // If the database does not exist, create a new database
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await this.client.CreateDatabaseAsync(new Database { Id = databaseName });
                    this.WriteToConsoleAndPromptToContinue("Created {0}", databaseName);
                }
                else
                {
                    throw;
                }
            }
        }

        private async Task CreateDocumentCollectionIfNotExists(string databaseName, string collectionName)
        {
            try
            {
                await this.client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName));
                this.WriteToConsoleAndPromptToContinue("Found {0}", collectionName);
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
                    await this.client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(databaseName),
                        collectionInfo,
                        new RequestOptions { OfferThroughput = 400 });

                    this.WriteToConsoleAndPromptToContinue("Created {0}", collectionName);
                }
                else
                {
                    throw;
                }
            }
        }

        private async Task CreateFamilyDocumentIfNotExists(string databaseName, string collectionName, RealEstateObj realEstateObj)
        {
            try
            {
                await this.client.ReadDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, realEstateObj.Url));
                this.WriteToConsoleAndPromptToContinue("Found {0}", realEstateObj.Url);
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await this.client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), realEstateObj);
                    this.WriteToConsoleAndPromptToContinue("Created Family {0}", realEstateObj.Url);
                }
                else
                {
                    throw;
                }
            }
        }

        private async Task CreateRealEstate(string databaseName, string collectionName, RealEstateObj realEstateObj)
        {
            try
            {
                await this.client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), realEstateObj);
                this.WriteToConsoleAndPromptToContinue("Created RE {0}", realEstateObj.Url);
            }
            catch (DocumentClientException de)
            {
                throw de;
            }
        }
    }
}
