import type { Section } from "../services/sectionService";
import {
  SECTION_DEFINITIONS,
  type SectionType,
  type HeroContent,
  type FeaturesContent,
  type CtaContent,
} from "../sections/sectionTypes";

export function SectionRenderer({ section }: { section: Section }) {
  const type = section.type as SectionType;
  const definition = SECTION_DEFINITIONS[type];
  const content = section.content && "content" in section.content ? section.content.content : null;


    if (!definition || !content) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70">
        Unsupported section type: {section.type}
      </div>
    );
  }

    switch (type) {
    case "hero":
        return <HeroSection content={content as HeroContent} />;
    case "features":
        return <FeaturesSection content={content as FeaturesContent} />;
    case "cta":
        return <CtaSection content={content as CtaContent} />;
    default:
        return null; 
    }
}

function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/30 via-indigo-700/20 to-slate-900/60 px-8 py-14 shadow-xl">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-200">Landing</p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{content.heading}</h1>
        <p className="text-lg text-white/80">{content.subheading}</p>
        <div className="pt-4">
          <a
            href={content.ctaUrl}
            className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            {content.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ content }: { content: FeaturesContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-200">Features</p>
        <h2 className="text-3xl font-bold text-white">{content.heading}</h2>
        <p className="text-white/70">{content.subheading}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {(content.items ?? []).map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <div className="text-lg font-semibold text-white">{item.title}</div>
            <p className="mt-1 text-sm text-white/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection({ content }: { content: CtaContent }) {
  return (
    <section className="rounded-3xl border border-indigo-400/30 bg-indigo-500/10 p-8 text-center shadow-lg">
      <h2 className="text-3xl font-bold text-white">{content.heading}</h2>
      <p className="mt-2 text-white/80">{content.subheading}</p>
      <div className="mt-5">
        <a
          href={content.ctaUrl}
          className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
        >
          {content.ctaLabel}
        </a>
      </div>
    </section>
  );
}

