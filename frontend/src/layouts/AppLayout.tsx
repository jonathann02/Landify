import { Outlet, Link, NavLink } from "react-router-dom";

import { cn } from "../lib/utils";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useTranslation } from "../i18n/useTranslation";

const navLinkBase =
  "px-3 py-2 text-sm font-medium text-white/80 rounded-lg transition hover:text-white hover:bg-white/5";

export function AppLayout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute left-[-20%] top-[-10%] h-[45vw] w-[45vw] rounded-full bg-indigo-700/10 blur-[120px]" />
        <div className="animate-blob absolute right-[-15%] top-[30%] h-[40vw] w-[40vw] rounded-full bg-purple-700/10 blur-[120px]" />
        <div className="animate-blob absolute left-[15%] bottom-[-20%] h-[50vw] w-[50vw] rounded-full bg-blue-700/10 blur-[140px]" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-white/10 backdrop-blur-lg" />
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-indigo-200/80">Landify</div>
                <div className="text-lg font-semibold text-white">{t("nav.dashboard")}</div>
              </div>
            </Link>

            <nav className="flex items-center gap-3">
              <LanguageSwitcher />
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  cn(
                    navLinkBase,
                    isActive && "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
                  )
                }
              >
                {t("nav.sites")}
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="w-full px-4 py-8">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
