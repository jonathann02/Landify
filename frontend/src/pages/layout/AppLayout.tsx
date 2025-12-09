import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 font-bold text-slate-950">
              L
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Landify
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {!isAuthPage && (
              <>
                <Link
                  to="/login"
                  className="text-sm text-slate-300 hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-sm hover:bg-indigo-400"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-1 flex-col px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Landify</span>
          <span>Easy Landingpage builder for small businesses.</span>
        </div>
      </footer>
    </div>
  );
}
