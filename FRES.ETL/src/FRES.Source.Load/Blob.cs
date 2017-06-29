using Microsoft.WindowsAzure.Storage;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace FRES.Source.Load
{
    public class Blob
    {
        public void UploadImage()
        {
            try
            {
                var folder = @"C:\Git\fres\FRES.ETL\src\FRES.Data\Images\Properties\";
                var files = Directory.EnumerateFiles(folder);

                //foreach (var file in Directory.EnumerateFiles(folder))
                Parallel.ForEach(files, new ParallelOptions { MaxDegreeOfParallelism = 20 }, file =>
                //foreach (var item in items)
                {
                        UploadToBlob(file);
                }
                );
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }

        private void UploadToBlob(string fileName)
        {
            var account = CloudStorageAccount.Parse(@"DefaultEndpointsProtocol=https;AccountName=fresstorage;AccountKey=oMeGNhMeTWUhLW7BqB2rPoxxOrx9Lo0Cj/330sFQupc3fg92U8wW3UxBosxhujVgssaSoUTW9gxt3LBu/0FRAQ==;EndpointSuffix=core.windows.net");
            var name = Path.GetFileName(fileName);
            var client = account.CreateCloudBlobClient();
            //already created container via azure management portal, set container reference
            var container = client.GetContainerReference("fresblob");
            using (var fs = File.OpenRead(fileName))
            {
                //set distination (will create or overwrite existing blob)
                var blobName = $@"images/properties/{name}";
                var blockBlob = container.GetBlockBlobReference(blobName);
                if (!blockBlob.Exists())
                {
                    blockBlob.UploadFromStream(fs);
                    Console.WriteLine(name);
                }else
                {
                    Console.WriteLine("Exist: " + name);
                }
            }
        }
    }
}