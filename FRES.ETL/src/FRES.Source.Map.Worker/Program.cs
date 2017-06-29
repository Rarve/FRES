namespace FRES.Source.Map.Worker
{
    class Program
    {
        static void Main(string[] args)
        {
            MapRetriever retriever = new MapRetriever();
            retriever.GetMap();        
        }        
    }
}
