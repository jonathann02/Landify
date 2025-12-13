using System;

namespace Landify.Domain.Sites;

public class Section
{
    public Guid Id { get; set; }

    public Guid SiteId { get; set; }

    public string Type { get; set; } = string.Empty;

    public int SortOrder { get; set; }

    public string ContentJson { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }
}