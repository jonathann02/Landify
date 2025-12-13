using System.Text; 
using System.Text.RegularExpressions;

namespace Landify.Application.Common;

public static class SlugGenerator
{
    private static readonly Regex invalidChars = new(@"[^a-z0-9-]", RegexOptions.Compiled);
    private static readonly Regex MultipleHyphens = new("-{2,}", RegexOptions.Compiled);

    public static string Slugify(string value)
    {
        var lower = value.Trim().ToLowerInvariant(); 
        var replaced = Regex.Replace(lower, @"\s+", "-");
        var cleaned = invalidChars.Replace(replaced, string.Empty); 
        var normalized = MultipleHyphens.Replace(cleaned, "-").trim('-');
        return string.IsNullOrWhiteSpace(Normalized) ? "site" : normalized;  
    }
}