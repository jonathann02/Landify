import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import type { ReactNode } from "react";
import { LayoutTemplate, MousePointerClick, Share2, LineChart } from "lucide-react";

import type { TranslationKey } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

const steps: { icon: ReactNode; titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  {
    icon: <LayoutTemplate className="h-8 w-8 text-indigo-400" />,
    titleKey: "landing.servicesStep1Title",
    descriptionKey: "landing.servicesStep1Desc",
  },
  {
    icon: <MousePointerClick className="h-8 w-8 text-blue-400" />,
    titleKey: "landing.servicesStep2Title",
    descriptionKey: "landing.servicesStep2Desc",
  },
  {
    icon: <Share2 className="h-8 w-8 text-purple-400" />,
    titleKey: "landing.servicesStep3Title",
    descriptionKey: "landing.servicesStep3Desc",
  },
  {
    icon: <LineChart className="h-8 w-8 text-emerald-400" />,
    titleKey: "landing.servicesStep4Title",
    descriptionKey: "landing.servicesStep4Desc",
  },
];

export function Services() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold md:text-6xl"
          >
            {t("landing.servicesTitle")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            className="h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
          <p className="mt-6 max-w-xl text-sm text-white/60 md:text-base">
            {t("landing.servicesDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex h-full flex-col justify-between group">
                <div>
                  <div className="mb-6 w-fit rounded-2xl bg-white/5 p-4 transition-colors group-hover:bg-white/10">
                    {step.icon}
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold">{t(step.titleKey)}</h3>
                  <p className="leading-relaxed text-white/60">{t(step.descriptionKey)}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/40 transition-all group-hover:text-white">
                  {t("landing.servicesFootnote")}
                  <div className="h-[1px] w-4 bg-current transition-all group-hover:w-8" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}