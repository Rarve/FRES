using System;
using System.IO;
using System.Security.Cryptography;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            var folder = @"C:\Git\fres\FRES.Web\FRES.Web.UI2\wwwroot\Images\Properties2\";
            var folderNew = @"C:\Git\fres\FRES.Web\FRES.Web.UI2\wwwroot\Images\Properties\";

            foreach (var file in Directory.EnumerateFiles(folder))
            {
                var name = Path.GetFileNameWithoutExtension(file);
                var dec = System.Net.WebUtility.UrlDecode(name);
                var hash = GetStringSha256Hash(dec);
                var nameNew = hash + Path.GetExtension(file).ToLower();
                //File.Copy(file, folderNew + nameNew);
            }
        }


        public static string GetStringSha256Hash(string text)
        {
            if (string.IsNullOrEmpty(text))
                return string.Empty;

            using (var sha = SHA256.Create())
            {
                byte[] textData = System.Text.Encoding.UTF8.GetBytes(text);
                byte[] hash = sha.ComputeHash(textData);
                return BitConverter.ToString(hash).Replace("-", String.Empty);
            }
        }
    }
}