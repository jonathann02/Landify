using System.Threading;
using System.Threading.Tasks;

namespace Landify.Application.Auth;

public class AuthService
{
    private readonly IIdentityService _identityService;

    public AuthService(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public Task<AuthResult> RegisterAsync(string email, string password, CancellationToken cancellationToken) =>
        _identityService.RegisterAsync(email, password, cancellationToken);

    public Task<AuthResult> LoginAsync(string email, string password, CancellationToken cancellationToken) =>
        _identityService.LoginAsync(email, password, cancellationToken);

    public Task LogoutAsync(CancellationToken cancellationToken) =>
        _identityService.LogoutAsync(cancellationToken);

    public Task<UserInfo?> GetUserAsync(Guid userId, CancellationToken cancellationToken) =>
        _identityService.GetUserAsync(userId, cancellationToken);
}