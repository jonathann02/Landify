using Landify.Api.Extensions;
using Landify.Application.Sections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Landify.Api.Controllers;

[ApiController]
[Route("api/sites/{siteId:guid}/[controller]")]
[Authorize]
public class SectionsController : ControllerBase
{
    private readonly SectionService _sectionService;

    public SectionsController(SectionService sectionService)
    {
        _sectionService = sectionService;
    }

    [HttpGet]
    public async Task<IActionResult> Get(Guid siteId, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var sections = await _sectionService.GetSectionsAsync(siteId, userId.Value, cancellationToken);
        return Ok(sections);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid siteId, [FromBody] UpsertSectionRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var section = await _sectionService.AddSectionAsync(siteId, userId.Value, request.Type, request.SortOrder, request.ContentJson, cancellationToken);
        return section is null ? NotFound() : Ok(section);
    }

    [HttpPut("{sectionId:guid}")]
    public async Task<IActionResult> Update(Guid siteId, Guid sectionId, [FromBody] UpsertSectionRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var section = await _sectionService.UpdateSectionAsync(siteId, sectionId, userId.Value, request.Type, request.SortOrder, request.ContentJson, cancellationToken);
        return section is null ? NotFound() : Ok(section);
    }

    [HttpDelete("{sectionId:guid}")]
    public async Task<IActionResult> Delete(Guid siteId, Guid sectionId, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var deleted = await _sectionService.DeleteSectionAsync(siteId, sectionId, userId.Value, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("reorder")]
    public async Task<IActionResult> Reorder(Guid siteId, [FromBody] ReorderSectionsRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var success = await _sectionService.ReorderSectionsAsync(siteId, userId.Value, request.SortOrders, cancellationToken);
        return success ? NoContent() : NotFound();
    }
}

public record UpsertSectionRequest(string Type, int SortOrder, string ContentJson);

public record ReorderSectionsRequest(Dictionary<Guid, int> SortOrders);