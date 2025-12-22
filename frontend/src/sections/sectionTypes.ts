export type SectionType = "hero"

interface BaseSectionContent {
  heading?: string;
  subheading?: string;
}

export interface HeroContent extends BaseSectionContent {
    heading: string; 
    subheading: string; 
    ctaLabel: string; 
    ctaUrl: string; 
    backgroundImageUrl?: string; 
}

export type SectionContent = { type: "hero"; content: HeroContent };

type ContentByType = {
  hero: HeroContent;
};

export const SECTION_DEFINITIONS: Record<
  SectionType,
  {
    label: string;
    defaultContent: ContentByType[SectionType];
  }

  > = {
  hero: {
    label: "Hero",
    defaultContent: {
      heading: "Launch faster with Landify",
      subheading: "Beautiful landing pages built from modular sections.",
      ctaLabel: "Get started",
      ctaUrl: "#get-started",
      backgroundImageUrl: "",
    },
  },
};

export const SECTION_TYPES: SectionType[] = Object.keys(
  SECTION_DEFINITIONS,
) as SectionType[];