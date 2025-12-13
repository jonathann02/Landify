using FluentValidation;
using Landify.Application.Assets;
using Landify.Application.Auth;
using Landify.Application.Public;
using Landify.Application.Sections;
using Landify.Application.Sites;
using Microsoft.Extensions.DependencyInjection;

namespace Landify.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
        services.AddScoped<AuthService>();
        services.AddScoped<SiteService>();
        services.AddScoped<SectionService>();
        services.AddScoped<PublicSiteService>();
        services.AddScoped<AssetSearchService>();
        return services;
    }
}