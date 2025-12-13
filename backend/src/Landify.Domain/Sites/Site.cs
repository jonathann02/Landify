using System;
using System.Collections.Generic;

namespace Landify.Domain.Sites;

public class Site
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Slug { get; set; }

    public bool IsPublished { get; set; }

    public string Theme { get; set; } = "launch";

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public List<Section> Sections { get; set; } = new();
}