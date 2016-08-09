using System;
using System.ComponentModel.DataAnnotations;

namespace FRES.Data.Models
{
    public class RealEstateType : IAuditableEntity
    {
        [Key]
        public int RealEstateTypeId { get; set; }
        public string Name_TH { get; set; }
        public string Name_ENG { get; set; }
        public int RecordStatus { get; set; }
        public int Period { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
