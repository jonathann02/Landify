import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import type { TranslationKey } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

const useCases: {
  titleKey: TranslationKey;
  categoryKey: TranslationKey;
  descriptionKey: TranslationKey;
  badges: TranslationKey[];
  imageSrc: string; 
}[] = [
  {
    titleKey: "landing.useCase1Title",
    categoryKey: "landing.useCase1Category",
    descriptionKey: "landing.useCase1Desc",
    badges: ["landing.useCase1Badge1", "landing.useCase1Badge2"],
    imageSrc: "/usecase1.png",
  },
  {
    titleKey: "landing.useCase2Title",
    categoryKey: "landing.useCase2Category",
    descriptionKey: "landing.useCase2Desc",
    badges: ["landing.useCase2Badge1", "landing.useCase2Badge2"],
    imageSrc: "/usecase2.png",
  },
  {
    titleKey: "landing.useCase3Title",
    categoryKey: "landing.useCase3Category",
    descriptionKey: "landing.useCase3Desc",
    badges: ["landing.useCase3Badge1", "landing.useCase3Badge2"],
    imageSrc: "/usecase3.png",
  },
];

export function Work() {
  const { t } = useTranslation();

  return (
    <section
      id="use-cases"
      className="relative overflow-hidden py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-4xl font-bold md:text-6xl"
            >
              {t("landing.workTitle")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-md text-xl text-white/60"
            >
              {t("landing.workDescription")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="#templates"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
                {t("landing.workExploreTemplates")}
            </a>
          </motion.div>
        </div>

        <div className="space-y-10">
          {useCases.map((useCase) => (
            <motion.div
              key={useCase.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-0 overflow-hidden group">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative p-10">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-white/50">
                        {t(useCase.categoryKey)}
                      </span>
                      <h3 className="mb-6 text-3xl font-bold md:text-4xl group-hover:translate-x-2 transition-transform duration-500">
                        {t(useCase.titleKey)}
                      </h3>
                      <p className="mb-8 max-w-md text-white/70">
                        {t(useCase.descriptionKey)}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm font-medium">
                        {useCase.badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                          >
                            {t(badge)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center p-10">
                   <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 aspect-[16/10]">
                   <img
                   src={useCase.imageSrc}
                   loading="lazy"
                   decoding="async"
                   className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                   />

                   <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-slate-950/10 to-indigo-600/20" />
                </div>
            </div>
        </div>
               
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}