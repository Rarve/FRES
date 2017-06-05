using FRES.Structure;
using System;

namespace FRES.Data
{
    partial class RealEstateE : SourceObj, IAuditableEntity
    {
        int IAuditableEntity.CreatedBy { get; set; }

        DateTime IAuditableEntity.CreatedDate { get; set; }

        int IAuditableEntity.ModifiedBy { get; set; }

        DateTime IAuditableEntity.ModifiedDate { get; set; }

        int IAuditableEntity.Period { get; set; }

        int IAuditableEntity.RecordStatus { get; set; }
    }
}
