using System;
using System.ComponentModel.DataAnnotations;

namespace FRES.Data.Models
{
    public class RealEstateE : Structure.SourceObj, IAuditableEntity
    {
        [Key]
        public long RealEstateEId { get; set; }
        public string Source { get; set; }
        public int State { get; set; }
        public int RecordStatus { get; set; }
        public int Period { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
