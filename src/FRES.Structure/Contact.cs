using System.Collections.Generic;

namespace FRES.Structure
{
    public class Contact
    {
        public Contact()
        {
            TellNo = new List<string>();
            Email = new List<string>();
        }
        public string Name { get; set; }
        public List<string> TellNo { get; set; }
        public List<string> Email { get; set; }
    }
}