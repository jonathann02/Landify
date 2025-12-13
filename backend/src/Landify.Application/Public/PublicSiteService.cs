using Landify.Domain.Interfaces;
using Landify.Domain.Sites;

namespace Landify.Application.Public;

public class PublicSiteService
{
    private readonly ISiteRepository _siteRepository;

    public PublicSiteService(ISiteRepository siteRepository)
    {
        _siteRepository = siteRepository;
    }

    public async Task<Site?> GetPublishedSiteAsync(string slug, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetBySlugAsync(slug, cancellationToken);
        return site is null || !site.IsPublished ? null : site;
    }
}