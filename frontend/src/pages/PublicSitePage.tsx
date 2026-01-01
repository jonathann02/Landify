import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GlassCard } from "../components/ui/GlassCard";
import { SectionRenderer } from "../components/SectionRenderer";
import { getPublicSiteBySlug, type SiteWithSections } from "../services/siteService";
import type { Section } from "../services/sectionService";

export function PublicSitePage() {
  const { slug } = useParams<{ slug: string }>();

  const [site, setSite] = useState<SiteWithSections | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const fetched = await getPublicSiteBySlug(slug);
        setSite(fetched);
        setSections([...(fetched.sections ?? [])].sort((a, b) => a.sortOrder - b.sortOrder));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load site";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [slug]);

  if (!slug) {
    return <div className="text-white/70">Missing site slug.</div>;
  }

  if (isLoading) {
    return <div className="text-white/70">Loading site...</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
        {error}
      </div>
    );
  }

  if (!site) {
    return <div className="text-white/70">Site not found.</div>;
  }

  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="text-center">
          <h1 className="mt-1 text-3xl font-bold text-white">{site.name}</h1>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>

        <GlassCard className="mt-6 p-4 text-center text-sm text-white/60">
          Powered by Landify
        </GlassCard>
      </div>
    </div>
  );
}
