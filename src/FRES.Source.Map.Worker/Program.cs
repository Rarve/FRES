namespace FRES.Source.Map.Worker
{
    class Program
    {
        public static int TIMEOUT = 3;

        static void Main(string[] args)
        {
            MapRetriever retriever = new MapRetriever();
            retriever.GetMap();        
        }        
    }
}
