import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "../../lib/utils";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "../../i18n/useTranslation";

const navLinks = [
  { key: "landing.navHowItWorks", href: "#how-it-works" },
  { key: "landing.navTemplates", href: "#templates" },
  { key: "landing.navUseCases", href: "#use-cases" },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 glass bg-black/40",
        )}
      >
        <RouterLink to="/" className="relative z-50 text-2xl font-bold tracking-tighter">
          Landify<span className="text-indigo-400">.</span>
        </RouterLink>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {t(link.key)}
            </a>
          ))}

          <LanguageSwitcher />

          <RouterLink to="/login">
            <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 transition-colors">
              {t("nav.login")}
            </button>
          </RouterLink>

          <RouterLink to="/register">
            <button className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              {t("nav.getStarted")}
            </button>
          </RouterLink>
        </div>

        <button
          className="relative z-50 text-white md:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md md:hidden">
            <div className="flex flex-col items-center gap-8">
              <LanguageSwitcher />
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-light text-white hover:text-indigo-400 transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}

              <RouterLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="mt-4 rounded-full bg-white px-8 py-3 text-lg font-semibold text-black">
                  {t("nav.getStarted")}
                </button>
              </RouterLink>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}