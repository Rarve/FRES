using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Source.E
{
    public class CloudTableStorageHelper
    {
        private string _tableName;
        private CloudTable _table;
        public CloudTable Table
        {
            get
            {
                if (_table == null)
                {
                    var account = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
                    var client = account.CreateCloudTableClient();
                    _table = client.GetTableReference(_tableName);
                    _table.CreateIfNotExists();
                }
                return _table;
            }
        }

        public CloudTableStorageHelper(string tableName)
        {
            _tableName = tableName;
        }

        public void Insert(RealEstateEntity[] res)
        {
            foreach (var re in res)
            {
                Insert(re);
            }
        }

        public void Insert(RealEstateEntity re)
        {
            TableOperation insertOperation = TableOperation.Insert(re);            
            TableResult res = Table.Execute(insertOperation);
        }


        public void GetAll()
        {
            TableQuery<RealEstateEntity> query = new TableQuery<RealEstateEntity>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "20160801"));

            // Print the fields for each customer.
            foreach (RealEstateEntity entity in Table.ExecuteQuery(query))
            {
                Console.WriteLine("{0}, {1}\t{2}", entity.PartitionKey, entity.RowKey,
                    entity.URL);
            }
}
}
}
