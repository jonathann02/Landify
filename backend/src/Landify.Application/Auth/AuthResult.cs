namespace Landify.Application.Auth;

public record AuthResult(bool Succeeded, string? Token, IEnumerable<string> Errors);