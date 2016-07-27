using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace FRES.Source.Extract
{
    public class HttpClientHelper
    {
        public const int TIMEOUT = 60;

        private HttpClient _client;
        public HttpClient Client
        {
            get
            {
                if (_client == null)
                {
                    var handler = new HttpClientHandler { UseProxy = false };
                    _client = new HttpClient() { Timeout = TimeSpan.FromSeconds(TIMEOUT) };
                    _client.DefaultRequestHeaders.UserAgent.TryParseAdd("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");

                }
                return _client;
            }
        }

        public async Task<HtmlAgilityPack.HtmlDocument> RetrieveHtmlGet(string url)
        {
            Console.WriteLine("GET  " + url);
            var html = string.Empty;
            var htmlDoc = new HtmlAgilityPack.HtmlDocument();

            try
            {
                var response = await Client.GetAsync(url);
                var content = response.Content;
                html = await content.ReadAsStringAsync();

                var start = html.IndexOf("<html");
                var end = html.IndexOf("</html>", start);
                html = html.Substring(start, end - start);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            htmlDoc.LoadHtml(html);

            return htmlDoc;
        }

        public async Task<HtmlAgilityPack.HtmlDocument> RetrieveHtmlPost(string url, IEnumerable<KeyValuePair<string, string>> kvp)
        {
            Console.WriteLine("POST  " + url);
            var html = string.Empty;
            var htmlDoc = new HtmlAgilityPack.HtmlDocument();

            try
            {
                var content = new FormUrlEncodedContent(kvp);
                var httpResponse = await Client.PostAsync(url, content);
                html = await httpResponse.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            htmlDoc.LoadHtml(html);

            return htmlDoc;
        }
    }
}
