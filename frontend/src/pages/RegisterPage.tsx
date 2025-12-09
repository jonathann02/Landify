import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: ersätt med riktig API-call mot backend /auth/register
      await new Promise((resolve) => setTimeout(resolve, 800));
     
    } catch {
      setError("Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Start building landing pages for your campaigns in a few minutes.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Creating your account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          Log in here.
        </Link>
      </p>
    </div>
  );
}
