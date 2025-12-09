using Landify.Application.Assets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Landify.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AssetsController : ControllerBase
{
    private readonly AssetSearchService _assetSearchService;

    public AssetsController(AssetSearchService assetSearchService)
    {
        _assetSearchService = assetSearchService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest(new { error = "query is required" });
        }

        var results = await _assetSearchService.SearchAsync(query, cancellationToken);
        return Ok(results);
    }
}