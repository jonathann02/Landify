using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Landify.Application.Auth;
using Landify.Infrastructure.Identity;
using Landify.Infrastructure.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Landify.Infrastructure.Services;

public class IdentityService : IIdentityService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly JwtOptions _jwtOptions;
    private readonly ILogger<IdentityService> _logger;

    public IdentityService(
        UserManager<AppUser> userManager,
        IOptions<JwtOptions> jwtOptions,
        ILogger<IdentityService> logger)
    {
        _userManager = userManager;
        _jwtOptions = jwtOptions.Value;
        _logger = logger;
    }

    public async Task<AuthResult> RegisterAsync(string email, string password, CancellationToken cancellationToken)
    {
        var user = new AppUser
        {
            UserName = email,
            Email = email
        };

        var result = await _userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            return new AuthResult(false, null, result.Errors.Select(e => e.Description));
        }

        var token = await GenerateTokenAsync(user);
        return new AuthResult(true, token, Array.Empty<string>());
    }

    public async Task<AuthResult> LoginAsync(string email, string password, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null)
        {
            return new AuthResult(false, null, new[] { "Invalid credentials" });
        }

        var valid = await _userManager.CheckPasswordAsync(user, password);
        if (!valid)
        {
            return new AuthResult(false, null, new[] { "Invalid credentials" });
        }

        var token = await GenerateTokenAsync(user);
        return new AuthResult(true, token, Array.Empty<string>());
    }

    public Task LogoutAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    public async Task<UserInfo?> GetUserAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        return user is null ? null : new UserInfo(user.Id, user.Email ?? string.Empty);
    }

    private Task<string> GenerateTokenAsync(AppUser user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new("uid", user.Id.ToString()),
            new(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: _jwtOptions.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds);

        var encoded = new JwtSecurityTokenHandler().WriteToken(token);
        return Task.FromResult(encoded);
    }
}