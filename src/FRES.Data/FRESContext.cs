using FRES.Data.Models;
using System;
using System.Data.Entity;
using System.Linq;

namespace FRES.Data
{
    class FRESContext : FRESDBEntities
    {
        public override int SaveChanges()
        {
            var addedAuditedEntities = ChangeTracker.Entries<IAuditableEntity>()
              .Where(p => p.State == EntityState.Added)
              .Select(p => p.Entity);

            var modifiedAuditedEntities = ChangeTracker.Entries<IAuditableEntity>()
              .Where(p => p.State == EntityState.Modified)
              .Select(p => p.Entity);

            var now = DateTime.UtcNow;

            foreach (var added in addedAuditedEntities)
            {
                added.CreatedBy = 1;
                added.CreatedDate = now;
                var period = 0;
                int.TryParse(now.ToString("yyyyMMdd"), out period);
                added.Period = period;
            }

            foreach (var modified in modifiedAuditedEntities)
            {
                modified.ModifiedBy = 1;
                modified.ModifiedDate = now;
            }

            return base.SaveChanges();
        }
    }
}
