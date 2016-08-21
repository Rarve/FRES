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
              .Select(p => p.Entity).ToList();

            var modifiedAuditedEntities = ChangeTracker.Entries<IAuditableEntity>()
              .Where(p => p.State == EntityState.Modified)
              .Select(p => p.Entity).ToList();

            var asdf = ChangeTracker.Entries<IAuditableEntity>()
              .Select(p => p.Entity).ToList();

            var now = DateTime.UtcNow;
            var period = 0;
            int.TryParse(now.ToString("yyyyMMdd"), out period);

            foreach (var added in addedAuditedEntities)
            {
                added.CreatedBy = 1;
                added.CreatedDate = now;
                added.Period = period;
            }

            foreach (var modified in modifiedAuditedEntities)
            {
                modified.ModifiedBy = 1;
                modified.ModifiedDate = now;
                modified.Period = period;
            }

            return base.SaveChanges();
        }
    }
}
