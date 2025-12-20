import { GlassCard } from "../ui/GlassCard";
import type { TranslationKey } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

const templates: { nameKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  {
    nameKey: "landing.templatesItemSimple",
    descriptionKey: "landing.templatesItemSimpleDesc",
  },
  {
    nameKey: "landing.templatesItemLead",
    descriptionKey: "landing.templatesItemLeadDesc",
  },
  {
    nameKey: "landing.templatesItemEvent",
    descriptionKey: "landing.templatesItemEventDesc",
  },
];

export function Templates() {
  const { t } = useTranslation();

  return (
    <section id="templates" className="py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold md:text-5xl">{t("landing.templatesTitle")}</h2>
          <p className="mt-4 max-w-xl text-sm text-white/60 md:text-base">
            {t("landing.templatesDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {templates.map((tpl) => (
            <GlassCard key={tpl.nameKey}>
              <h3 className="mb-3 text-xl font-semibold">{t(tpl.nameKey)}</h3>
              <p className="text-sm text-white/60">{t(tpl.descriptionKey)}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}