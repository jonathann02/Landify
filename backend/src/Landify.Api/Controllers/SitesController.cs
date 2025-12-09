using Landify.Api.Extensions;
using Landify.Application.Sites;
using Landify.Domain.Sites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Landify.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SitesController : ControllerBase
{
    private readonly SiteService _siteService;

    public SitesController(SiteService siteService)
    {
        _siteService = siteService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMySites(CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var sites = await _siteService.GetSitesForUserAsync(userId.Value, cancellationToken);
        return Ok(sites);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var site = await _siteService.GetSiteAsync(id, userId.Value, cancellationToken);
        return site is null ? NotFound() : Ok(site);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSiteRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var site = await _siteService.CreateSiteAsync(userId.Value, request.Name, request.Theme, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = site.Id }, site);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSiteRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var site = await _siteService.UpdateSiteAsync(id, userId.Value, request.Name, request.Theme, cancellationToken);
        return site is null ? NotFound() : Ok(site);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var deleted = await _siteService.DeleteSiteAsync(id, userId.Value, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPost("{id:guid}/publish")]
    public async Task<IActionResult> Publish(Guid id, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var site = await _siteService.PublishSiteAsync(id, userId.Value, cancellationToken);
        return site is null ? NotFound() : Ok(site);
    }
}

public record CreateSiteRequest(string Name, string? Theme);

public record UpdateSiteRequest(string Name, string? Theme);