using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FRES.Common
{
    public class HttpClientHelper
    {
        public const int TIMEOUT = 300;

        private HttpClient _client;
        public HttpClient Client
        {
            get
            {
                if (_client == null)
                {
                    Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                    Encoding.GetEncoding(874);
                    //Encoding

                    var handler = new HttpClientHandler { UseProxy = false, AllowAutoRedirect = true };
                    _client = new HttpClient() { Timeout = TimeSpan.FromSeconds(TIMEOUT) };
                    _client.DefaultRequestHeaders.UserAgent.TryParseAdd("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
                }
                return _client;
            }
        }        

        public async Task<string> RetrieveHtmlStrGet(string url, Encoding enc = null)
        {
            Console.WriteLine("GET  " + url);
            var html = string.Empty;
            var htmlDoc = new HtmlAgilityPack.HtmlDocument();

            try
            {
                using (var req = new HttpRequestMessage(HttpMethod.Get, url))
                using (var res = await Client.SendAsync(req, HttpCompletionOption.ResponseContentRead))
                {
                    if (enc == null)
                    {
                        html = await res.Content.ReadAsStringAsync();
                    }
                    else
                    {
                        var bytes = await res.Content.ReadAsByteArrayAsync();
                        html = enc.GetString(bytes, 0, bytes.Length - 1);
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
            }

            return html;
        }

        public async Task<HtmlAgilityPack.HtmlDocument> RetrieveHtmlGet(string url)
        {
            var html = await RetrieveHtmlStrGet(url);
            var htmlDoc = new HtmlAgilityPack.HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc;
        }

        public async Task<string> RetrieveHtmlStrPost(string url, IEnumerable<KeyValuePair<string, string>> kvp)
        {
            if (kvp.Count() > 0)
            {
                var lst = kvp.ToList();
                Console.WriteLine("POST " + url + " " + lst[0].Key + ":" + lst[0].Value);
            }
            else
            {
                Console.WriteLine("POST " + url);
            }

            var html = string.Empty;

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

            return html;
        }

        public async Task<HtmlAgilityPack.HtmlDocument> RetrieveHtmlPost(string url, IEnumerable<KeyValuePair<string, string>> kvp)
        {
            var html = await RetrieveHtmlStrPost(url, kvp);
            var htmlDoc = new HtmlAgilityPack.HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc;
        }
    }
}
