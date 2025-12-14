using Landify.Domain.Interfaces;
using Landify.Domain.Sites;
using Landify.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Landify.Infrastructure.Repositories;

public class SiteRepository : ISiteRepository
{
    private readonly LandifyDbContext _db;

    public SiteRepository(LandifyDbContext db)
    {
        _db = db;
    }

    public Task<List<Site>> GetByUserAsync(Guid userId, CancellationToken cancellationToken) =>
        _db.Sites
            .AsNoTracking()
            .Where(x => x.UserId == userId)
            .ToListAsync(cancellationToken)
            .ContinueWith(t => t.Result
                .OrderByDescending(x => x.CreatedAt)
                .ToList(), cancellationToken);

    public async Task<Site?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var site = await _db.Sites
            .Include(x => x.Sections)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (site is not null)
        {
            site.Sections = site.Sections.OrderBy(s => s.SortOrder).ToList();
        }

        return site;
    }

    public async Task<Site?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var site = await _db.Sites
            .Include(x => x.Sections)
            .FirstOrDefaultAsync(x => x.Slug == slug, cancellationToken);

        if (site is not null)
        {
            site.Sections = site.Sections.OrderBy(s => s.SortOrder).ToList();
        }

        return site;
    }

    public Task AddAsync(Site site, CancellationToken cancellationToken)
    {
        _db.Sites.Add(site);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Site site, CancellationToken cancellationToken)
    {
        _db.Sites.Update(site);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Site site, CancellationToken cancellationToken)
    {
        _db.Sites.Remove(site);
        return Task.CompletedTask;
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken) =>
        _db.SaveChangesAsync(cancellationToken);
}