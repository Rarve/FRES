using FRES.Structure;
using System;

namespace FRES.Data
{
    partial class RealEstateE : SourceObj, IAuditableEntity
    {
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int Period { get; set; }
        public int RecordStatus { get; set; }
    }
}
