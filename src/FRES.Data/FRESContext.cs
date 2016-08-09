using FRES.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Data
{
    public class FRESContext : DbContext
    {
        public DbSet<RealEstateE> RealEstateE { get; set; }
        public DbSet<RealEstateT> RealEstateT { get; set; }
        public DbSet<RealEstateType> RealEstateType { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<RealEstateE>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
                entity.Property(e => e.Data).IsRequired();
            });

            builder.Entity<RealEstateT>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
                entity.Property(e => e.Data).IsRequired();
            });

            builder.Entity<RealEstateType>(entity =>
            {
            });
        }

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

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            builder.UseSqlServer(@"Server=GPJKZ52\SQLEXPRESS;Database=fresdb;Trusted_Connection=True;");
        }
        //public FRESContext(DbContextOptions<FRESContext> options)
        //    : base(options)
        //{ }
    }
}
