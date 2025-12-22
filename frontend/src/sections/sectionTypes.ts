export type SectionType = "hero" | "features" | "cta";

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

export interface FeaturesContent extends BaseSectionContent {
    heading: string; 
    subheading: string; 
    items: Array<{
        title: string; 
        description: string; 
        icon?: string; 
    }>;
}
export interface CtaContent extends BaseSectionContent {
    heading: string;
    subheading: string;
    ctaLabel: string;
    ctaUrl: string;
    }

export type SectionContent = 

  | { type: "hero"; content: HeroContent }
  | { type: "features"; content: FeaturesContent }
  | { type: "cta"; content: CtaContent };

  type ContentByType= {
    hero: HeroContent;
    features: FeaturesContent;
    cta: CtaContent;

  }


  export const SECTION_DEFINTIONS: Record<
    SectionType,
    {
        label: string; 
        defaultContent: ContentByType[SectionType];
    }
    > = {
    hero: {
        label: "Hero", 
        defaultContent: {
            heading: "Welcome to Landify", 
            subheading: "Build stunning landing pages in minutes.",
            ctaLabel: "Get Started",
            ctaUrl: "#",
            backgroundImageUrl: "",
        },
    },

    features: {
        label: "Features",
        defaultContent: {
            heading: "Powerful Features",
            subheading: "Everything you need to create amazing landing pages.",
            items: [
                { title: "Modular sections", description: "Easily add, remove, and reorder sections to customize your landing page layout."},
                { title: "Responsive design", description: "All sections are fully responsive and look great on any device."},
                { title: "Easy publishing", description: "Publish your landing pages with a single click and share them instantly."},
            ],
        },
    },

    cta: {
        label: "Call to Action",
        defaultContent: {
            heading: "Ready to get started?",
            subheading: "Sign up today and start building your first landing page.",
            ctaLabel: "Sign Up Now",
            ctaUrl: "#",
        },
    },
        }; 

    export const SECTION_TYPES: SectionType[] = Object.keys(SECTION_DEFINTIONS) as SectionType[];