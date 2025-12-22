import { useParams } from "react-router-dom";
import { SectionPalette } from "../components/SectionPalette";
import { SectionCanvas } from "../components/SectionCanvas";
import { SectionInspector } from "../components/SectionInspector";

export function SiteEditorPage() {
  const { siteId } = useParams<{ siteId: string }>();

  if (!siteId) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-white">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          Ogiltigt siteId i URL:en.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Site Editor</h1>
          <p className="text-sm text-white/60">siteId: {siteId}</p>
        </header>

        
        <div className="grid gap-6 lg:grid-cols-[280px_1fr_340px]">
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <SectionPalette />
          </aside>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <SectionCanvas />
          </section>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <SectionInspector />
          </aside>
        </div>
      </div>
    </main>
  );
}
