using System;

namespace FRES.Data.Models
{
    public interface IAuditableEntity
    {
        DateTime CreatedDate { get; set; }
        DateTime ModifiedDate { get; set; }
        int CreatedBy { get; set; }
        int ModifiedBy { get; set; }
        int RecordStatus { get; set; }
        int Period { get; set; }
    }
}
