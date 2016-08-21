using FRES.Data;
using FRES.Source.Extract;
using FRES.Source.Load;
using FRES.Source.Transform;
using System;

namespace FRES.Source.E
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Extractor[] extractors = new Extractor[] {
                    // new Extract.SCB()
                    //,new Extract.KTB()
                    //,new Extract.TNB()
                    //,new Extract.GSB()
                    //,new Extract.GHB() 
                };

                foreach (var extractor in extractors)
                    extractor.Extract();

                Transformer[] transformers = new Transformer[] {
                    // new Transform.GSB()
                    //,new Transform.SCB()
                    //,new Transform.KTB()
                    //,new Transform.TNB()
                };

                foreach (var transformer in transformers)
                    transformer.Transform();

                var loader = new Loader();
                loader.GetStartedDemo().Wait();
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
                Console.ReadKey();
            }
        }
    }
}
