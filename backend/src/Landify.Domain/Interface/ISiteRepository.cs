using Landify.Domain.Sites;

namespace Landify.Domain.Interfaces;

public interface ISiteRepository
{
    Task<List<Site>> GetByUserAsync(Guid userId, CancellationToken cancellationToken);

    Task<Site?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<Site?> GetBySlugAsync(string slug, CancellationToken cancellationToken);

    Task AddAsync(Site site, CancellationToken cancellationToken);

    Task UpdateAsync(Site site, CancellationToken cancellationToken);

    Task DeleteAsync(Site site, CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}