using Landify.Domain.Sites;
using Landify.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Landify.Infrastructure.Persistence;

public class LandifyDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public LandifyDbContext(DbContextOptions<LandifyDbContext> options)
        : base(options)
    {
    }

    public DbSet<Site> Sites => Set<Site>();

    public DbSet<Section> Sections => Set<Section>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Site>(b =>
        {
            b.Property(x => x.Name).HasMaxLength(200).IsRequired();
            b.Property(x => x.Slug).HasMaxLength(200).IsRequired(false);
            b.Property(x => x.Theme).HasMaxLength(100);
            b.HasIndex(x => x.Slug).IsUnique();

            b.HasMany(x => x.Sections)
                .WithOne()
                .HasForeignKey(x => x.SiteId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Section>(b =>
        {
            b.Property(x => x.Type).HasMaxLength(100).IsRequired();
            b.Property(x => x.ContentJson).IsRequired();
            b.HasIndex(x => new { x.SiteId, x.SortOrder });
        });
    }
}
