import { Link as RouterLink } from "react-router-dom";

import { useTranslation } from "../../i18n/useTranslation";

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="relative py-32">
      <div className="container relative z-10 mx-auto px-6 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">{t("landing.finalCtaTitle")}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-base text-white/60 md:text-lg">
          {t("landing.finalCtaSubtitle")}
        </p>

        <RouterLink to="/register">
          <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            {t("nav.getStarted")}
          </button>
        </RouterLink>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-full -translate-x-1/2 bg-gradient-to-t from-indigo-900/20 to-transparent" />
    </section>
  );
}