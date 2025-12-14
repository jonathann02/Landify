using Landify.Domain.Interfaces;
using Landify.Domain.Sites;
using Landify.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Landify.Infrastructure.Repositories;

public class SectionRepository : ISectionRepository
{
    private readonly LandifyDbContext _db;

    public SectionRepository(LandifyDbContext db)
    {
        _db = db;
    }

    public Task<List<Section>> GetBySiteAsync(Guid siteId, CancellationToken cancellationToken) =>
        _db.Sections
            .Where(x => x.SiteId == siteId)
            .OrderBy(x => x.SortOrder)
            .ToListAsync(cancellationToken);

    public Task<Section?> GetByIdAsync(Guid sectionId, CancellationToken cancellationToken) =>
        _db.Sections.FirstOrDefaultAsync(x => x.Id == sectionId, cancellationToken);

    public Task AddAsync(Section section, CancellationToken cancellationToken)
    {
        _db.Sections.Add(section);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Section section, CancellationToken cancellationToken)
    {
        _db.Sections.Update(section);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Section section, CancellationToken cancellationToken)
    {
        _db.Sections.Remove(section);
        return Task.CompletedTask;
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken) =>
        _db.SaveChangesAsync(cancellationToken);
}