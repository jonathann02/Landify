using Landify.Application.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Landify.Api.Controllers;

[ApiController]
[Route("api/public/sites")]
public class PublicSitesController : ControllerBase
{
    private readonly PublicSiteService _publicSiteService;

    public PublicSitesController(PublicSiteService publicSiteService)
    {
        _publicSiteService = publicSiteService;
    }

    [HttpGet("{slug}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var site = await _publicSiteService.GetPublishedSiteAsync(slug, cancellationToken);
        return site is null ? NotFound() : Ok(site);
    }
}