using Landify.Application.Auth;
using Landify.Domain.Interfaces;
using Landify.Infrastructure.Identity;
using Landify.Infrastructure.Options;
using Landify.Infrastructure.Persistence;
using Landify.Infrastructure.Repositories;
using Landify.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace Landify.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is missing.");

        services.Configure<JwtOptions>(configuration.GetSection("Jwt"));

        services.AddDbContext<LandifyDbContext>(options =>
            options.UseSqlServer(connectionString));

        services
            .AddIdentityCore<AppUser>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = true;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<LandifyDbContext>();

        services.AddHttpClient<IExternalAssetService, ExternalAssetService>();

        services.AddScoped<ISiteRepository, SiteRepository>();
        services.AddScoped<ISectionRepository, SectionRepository>();
        services.AddScoped<IIdentityService, IdentityService>();

        return services;
    }
}