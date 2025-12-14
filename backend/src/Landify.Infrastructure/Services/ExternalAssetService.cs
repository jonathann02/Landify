using System.Net.Http.Json;
using System.Text.Json;
using Landify.Domain.Assets;
using Landify.Domain.Interfaces;

namespace Landify.Infrastructure.Services;

public class ExternalAssetService : IExternalAssetService
{
    private readonly HttpClient _httpClient;

    public ExternalAssetService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IReadOnlyList<AssetItem>> SearchAsync(string query, CancellationToken cancellationToken)
    {
        // Endast placeholder just nu, tanken är att jag ska byta ut till Unsplash senare
        var requestUrl = "https://picsum.photos";
        try
        {
            using var response = await _httpClient.GetAsync(requestUrl, cancellationToken);
            response.EnsureSuccessStatusCode();
            await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            var doc = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken);
            var items = new List<AssetItem>();
            foreach (var element in doc.RootElement.EnumerateArray())
            {
                var url = element.GetProperty("download_url").GetString() ?? string.Empty;
                var author = element.GetProperty("author").GetString() ?? "image";
                items.Add(new AssetItem(url, url, $"{author} - {query}"));
            }

            return items;
        }
        catch
        {
            return Array.Empty<AssetItem>();
        }
    }
}