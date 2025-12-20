import { useTranslation } from "../../i18n/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden pt-24 pb-10">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 text-2xl font-bold tracking-tighter">
              Landify<span className="text-indigo-400">.</span>
            </div>
            <p className="leading-relaxed text-white/50 text-sm">
              {t("landing.footerDescription")}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">{t("landing.footerProduct")}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {t("landing.navHowItWorks")}
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-white transition-colors">
                  {t("landing.navTemplates")}
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-white transition-colors">
                  {t("landing.navUseCases")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">{t("landing.footerTeams")}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>{t("landing.footerTeamMarketing")}</li>
              <li>{t("landing.footerTeamAgencies")}</li>
              <li>{t("landing.footerTeamCreators")}</li>
              <li>{t("landing.footerTeamSmallBiz")}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">{t("landing.footerContact")}</h4>
            <p className="mb-3 text-sm text-white/60">
              {t("landing.footerContactText")}
            </p>
            <a
              href="mailto:support@landify.app"
              className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
            >
              support@landify.app
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} Landify. {t("landing.footerRights")}
          </p>
          <div className="flex gap-4">
            <span>{t("landing.footerTag1")}</span>
            <span>{t("landing.footerTag2")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}