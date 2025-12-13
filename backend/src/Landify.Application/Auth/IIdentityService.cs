using System.Threading;
using System.Threading.Tasks;

namespace Landify.Application.Auth;

public interface IIdentityService
{
    Task<AuthResult> RegisterAsync(string email, string password, CancellationToken cancellationToken);

    Task<AuthResult> LoginAsync(string email, string password, CancellationToken cancellationToken);

    Task LogoutAsync(CancellationToken cancellationToken);

    Task<UserInfo?> GetUserAsync(Guid userId, CancellationToken cancellationToken);
}