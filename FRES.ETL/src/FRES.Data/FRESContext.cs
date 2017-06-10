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

            var now = DateTime.UtcNow;
            var period = 0;
            int.TryParse(now.ToString("yyyyMMdd"), out period);

            for (int i = 0; i < addedAuditedEntities.Count; i++)
            {
                addedAuditedEntities[i].CreatedBy = 1;
                addedAuditedEntities[i].CreatedDate = now;
                addedAuditedEntities[i].Period = period;
            }

            for (int i = 0; i < modifiedAuditedEntities.Count; i++)
            {
                modifiedAuditedEntities[i].ModifiedBy = 1;
                modifiedAuditedEntities[i].ModifiedDate = now;
                modifiedAuditedEntities[i].Period = period;
            }

            return base.SaveChanges();
        }
    }
}
