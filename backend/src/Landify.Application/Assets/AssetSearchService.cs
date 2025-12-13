using Landify.Domain.Assets;
using Landify.Domain.Interfaces;

namespace Landify.Application.Assets;

public class AssetSearchService
{
    private readonly IExternalAssetService _externalAssetService;

    public AssetSearchService(IExternalAssetService externalAssetService)
    {
        _externalAssetService = externalAssetService;
    }

    public Task<IReadOnlyList<AssetItem>> SearchAsync(string query, CancellationToken cancellationToken) =>
        _externalAssetService.SearchAsync(query, cancellationToken);
}