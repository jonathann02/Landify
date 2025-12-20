import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

import { useTranslation } from "../../i18n/useTranslation";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute left-[-10%] top-[-10%] h-[50vw] w-[50vw] rounded-full bg-indigo-600/25 blur-[120px] mix-blend-screen" />
        <div className="animate-blob absolute right-[-10%] top-[20%] h-[40vw] w-[40vw] rounded-full bg-purple-600/25 blur-[120px] mix-blend-screen" />
        <div className="animate-blob absolute bottom-[-10%] left-[20%] h-[45vw] w-[45vw] rounded-full bg-blue-600/25 blur-[120px] mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-white/80">
              {t("landing.heroBadge")}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8 text-4xl font-bold tracking-tighter text-gradient md:text-6xl lg:text-7xl"
        >
          {t("landing.heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          {t("landing.heroSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <RouterLink to="/register">
            <button className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                {t("landing.heroCtaPrimary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </RouterLink>

          <a
            href="#how-it-works"
            className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
          >
            {t("landing.heroCtaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}