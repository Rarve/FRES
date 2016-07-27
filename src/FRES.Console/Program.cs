using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Console
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                Business.SCB.Extract();
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.StackTrace);
                System.Console.ReadKey();
            }
            System.Console.WriteLine("Finish");
            System.Console.ReadKey();
        }
    }
}
