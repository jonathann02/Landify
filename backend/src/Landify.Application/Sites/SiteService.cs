using Landify.Application.Common;
using Landify.Domain.Interfaces;
using Landify.Domain.Sites;

namespace Landify.Application.Sites;

public class SiteService
{
    private readonly ISiteRepository _siteRepository;

    public SiteService(ISiteRepository siteRepository)
    {
        _siteRepository = siteRepository;
    }

    public Task<List<Site>> GetSitesForUserAsync(Guid userId, CancellationToken cancellationToken) =>
        _siteRepository.GetByUserAsync(userId, cancellationToken);

    public async Task<Site?> GetSiteAsync(Guid id, Guid userId, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(id, cancellationToken);
        return site is null || site.UserId != userId ? null : site;
    }

    public async Task<Site> CreateSiteAsync(Guid userId, string name, string? theme, CancellationToken cancellationToken)
    {
        var now = DateTimeOffset.UtcNow;
        var normalizedTheme = string.IsNullOrWhiteSpace(theme) ? "launch" : theme;
        var site = new Site
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Name = name,
            Theme = normalizedTheme,
            Slug = null,
            IsPublished = false,
            CreatedAt = now,
            UpdatedAt = now
        };

        await _siteRepository.AddAsync(site, cancellationToken);
        await _siteRepository.SaveChangesAsync(cancellationToken);
        return site;
    }

    public async Task<Site?> UpdateSiteAsync(Guid id, Guid userId, string name, string? theme, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(id, cancellationToken);
        if (site is null || site.UserId != userId)
        {
            return null;
        }

        site.Name = name;
        site.Theme = string.IsNullOrWhiteSpace(theme) ? site.Theme : theme;
        site.UpdatedAt = DateTimeOffset.UtcNow;

        await _siteRepository.UpdateAsync(site, cancellationToken);
        await _siteRepository.SaveChangesAsync(cancellationToken);
        return site;
    }

    public async Task<bool> DeleteSiteAsync(Guid id, Guid userId, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(id, cancellationToken);
        if (site is null || site.UserId != userId)
        {
            return false;
        }

        await _siteRepository.DeleteAsync(site, cancellationToken);
        await _siteRepository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<Site?> PublishSiteAsync(Guid id, Guid userId, CancellationToken cancellationToken)
    {
        var site = await _siteRepository.GetByIdAsync(id, cancellationToken);
        if (site is null || site.UserId != userId)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(site.Slug))
        {
            site.Slug = await GenerateUniqueSlugAsync(site.Name, cancellationToken);
        }

        site.IsPublished = true;
        site.UpdatedAt = DateTimeOffset.UtcNow;

        await _siteRepository.UpdateAsync(site, cancellationToken);
        await _siteRepository.SaveChangesAsync(cancellationToken);
        return site;
    }

    private async Task<string> GenerateUniqueSlugAsync(string name, CancellationToken cancellationToken)
    {
        var baseSlug = SlugGenerator.Slugify(name);
        var slug = baseSlug;
        var counter = 1;

        while (true)
        {
            var existing = await _siteRepository.GetBySlugAsync(slug, cancellationToken);
            if (existing is null)
            {
                return slug;
            }

            slug = $"{baseSlug}-{counter++}";
        }
    }
}