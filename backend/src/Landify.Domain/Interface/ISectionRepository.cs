using Landify.Domain.Sites;

namespace Landify.Domain.Interfaces;

public interface ISectionRepository
{
    Task<List<Section>> GetBySiteAsync(Guid siteId, CancellationToken cancellationToken);

    Task<Section?> GetByIdAsync(Guid sectionId, CancellationToken cancellationToken);

    Task AddAsync(Section section, CancellationToken cancellationToken);

    Task UpdateAsync(Section section, CancellationToken cancellationToken);

    Task DeleteAsync(Section section, CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}