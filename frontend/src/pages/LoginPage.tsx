import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // TODO: ersätt med riktig API-call mot backend
      await new Promise((resolve) => setTimeout(resolve, 800));
    
    } catch {
      setError("Could not log in. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
        Log in
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Access your landing pages and continue editing your campaigns.
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {submitting ? "Signing you in..." : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Don&apos;t have an account yet?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          Create one here.
        </Link>
      </p>
    </div>
  );
}
