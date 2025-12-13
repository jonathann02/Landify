using Landify.Domain.Assets;

namespace Landify.Domain.Interfaces;

public interface IExternalAssetService
{
    Task<IReadOnlyList<AssetItem>> SearchAsync(string query, CancellationToken cancellationToken);
}
