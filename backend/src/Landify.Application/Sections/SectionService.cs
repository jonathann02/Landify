using Landify.Domain.Interfaces;
using Landify.Domain.Sites;

namespace Landify.Application.Sections;

public class SectionService
{
    private readonly ISiteRepository _siteRepository;
    private readonly ISectionRepository _sectionRepository;

    public SectionService(ISiteRepository siteRepository, ISectionRepository sectionRepository)
    {
        _siteRepository = siteRepository;
        _sectionRepository = sectionRepository;
    }

    public async Task<List<Section>> GetSectionsAsync(Guid siteId, Guid userId, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(siteId, cancellationToken);
        if (site is null || site.UserId != userId)
        {
            return new List<Section>();
        }

        return await _sectionRepository.GetBySiteAsync(siteId, cancellationToken);
    }

      public async Task<Section?> AddSectionAsync(Guid siteId, Guid userId, string type, int sortOrder, string contentJson, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(siteId, cancellationToken);
        if (site is null || site.UserId != userId)
        {
            return null;
        }

        var now = DateTimeOffset.UtcNow;
        var section = new Section
        {
            Id = Guid.NewGuid(),
            SiteId = siteId,
            Type = type,
            SortOrder = sortOrder,
            ContentJson = contentJson,
            CreatedAt = now,
            UpdatedAt = now
        };

        await _sectionRepository.AddAsync(section, cancellationToken);
        await _sectionRepository.SaveChangesAsync(cancellationToken);
        return section;
    }

    public async Task<Section?> UpdateSectionAsync(Guid siteId, Guid sectionId, Guid userId, string type, int sortOrder, string contentJson, CancellationToken cancellationToken)

    { 
        var site = await _siteRepository.GetByIdAsync(siteId, cancellationToken); 
        if (site is null || site.UserId != userId)
        {
            return null;
        }

        var section = await _sectionsRepository.GetByIdAsync(sectionId, cancellationToken); 
        if (section is null || section.SiteId != siteId)
        {
            return null;
        }

        section.Type = type; 
        sectionSortOrder = sortOrder;
        section.ContentJson = contentJson;
        section.UpdatedAt = DateTimeOffset.UtcNow;

        await _sectionRepository.UpdateAsync(section, cancellationToken);
        await _sectionRepository.SaveChangesAsync(cancellationToken);
        return section;
    }

    public async Task<bool> DeleteSectionAsync(Guid siteId, Guid sectionId, Guid userId, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(siteId, cancellationToken); 
        if (site is null || site.UserId != userId)
        {
            return false;
        }

        var section = await _sectionRepository.GetByIdAsync(sectionId, cancellationToken); 
        if (section is null || section.SiteId != siteId)
        {
            return false;
        }

        await _sectionRepository.DeleteAsync(sectionId, cancellationToken);
        await _sectionRepository.SaveChangesAsync(cancellationToken);
        return true;

    }

    public async Task<bool> ReorderSectionsAsync(Guid siteId, Guid userId, IDictionary<Guid, int> sortOrders, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(siteId, cancellationToken); 
        if (site is null || site.UserId != userId)
        {
            return false;
        }

        var sections = await _sectionRepository.GetBySiteAsync(siteId, cancellationToken);
        foreach (var section in sections)
        {
            if (sortOrders.TryGetValue(section.id, out var sortOrder))
            {
                section.SortOrder = sortOrder;
                section.UpdatedAt = DateTimeOffset.UtcNow;

            }
        }

        await _sectionRepository.SaveChangesAsync(cancellationToken); 
        return true;
    }

}