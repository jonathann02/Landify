import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GlassCard } from "../components/ui/GlassCard";
import { API_BASE_URL } from "../config/api";
import { useEffect } from "react";
import { useTranslation } from "../i18n/useTranslation";

type RegisterResponse =
  | { token: string; user: { id: string; email: string } }
  | { error?: string; message?: string };

export function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const isValidEmail = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);

  
  useEffect(() => {
    const token = localStorage.getItem("landify_token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const validate = () => {
    const errors: typeof fieldErrors = {};
    if (!isValidEmail) errors.email = "Enter a valid email address.";
    if (password.trim().length < 8) errors.password = "Password must be at least 8 characters.";
    if (confirmPassword !== password) errors.confirmPassword = "Passwords must match.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data: RegisterResponse = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = (data as { error?: string; message?: string }).error
          ?? (data as { message?: string }).message
          ?? "Something went wrong. Please try again.";
        setApiError(message);
        return;
      }

      if ("token" in data && typeof data.token === "string") {
        localStorage.setItem("landify_token", data.token);
        navigate("/dashboard");
      } else {
        setApiError(t("auth.missingToken"));
        navigate("/login", { state: { email } });
      }
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute left-[-20%] top-[-10%] h-[45vw] w-[45vw] rounded-full bg-indigo-700/20 blur-[120px]" />
        <div className="animate-blob absolute right-[-15%] top-[30%] h-[40vw] w-[40vw] rounded-full bg-purple-700/15 blur-[120px]" />
        <div className="animate-blob absolute left-[15%] bottom-[-20%] h-[50vw] w-[50vw] rounded-full bg-blue-700/15 blur-[140px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <GlassCard className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">{t("auth.registerTitle")}</h1>
            <p className="mt-3 text-sm text-white/70">{t("auth.registerSubtitle")}</p>
          </div>

          {apiError && (
            <div
              className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
              role="alert"
              aria-live="polite"
            >
              {apiError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                {t("auth.email")}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-300" aria-live="polite">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                {t("auth.password")}
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {fieldErrors.password && (
                <p className="text-sm text-red-300" aria-live="polite">
                  {fieldErrors.password}
                </p>
              )}
              <p className="text-xs text-white/50">{t("auth.passwordRequirement")}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="confirmPassword">
                {t("auth.confirmPassword")}
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(e);
                }}
              />
              {fieldErrors.confirmPassword && (
                <p className="text-sm text-red-300" aria-live="polite">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? t("auth.registerLoading") : t("auth.registerButton")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/70">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="font-semibold text-indigo-300 hover:text-indigo-200">
              {t("auth.loginLink")}
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}