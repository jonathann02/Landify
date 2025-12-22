import { useEffect, useState } from "react";
import { createSite, getSites, type SiteSummary } from "../services/siteService";

export function DashboardPage() {
  const [sites, setSites] = useState<SiteSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
    let isMounted = true;

    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSites();
        if (!isMounted) return;
        setSites(data);
      } catch (e) {
        if (!isMounted) return;
        setError(e instanceof Error ? e.message : "Kunde inte hämta sajter.");
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async () => {
    setIsCreating(true);
    setError(null);
    try {
      const created = await createSite({ name: "Namnlös sajt" });
      setSites((prev) => [created, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kunde inte skapa sajt.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-white/60">Här ser du alla dina sajter.</p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          disabled={isCreating}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
        >
          {isCreating ? "Skapar..." : "Ny sajt"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-white/70">Laddar sajter...</div>
      ) : (
        <ul className="space-y-3">
          {sites.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold">{s.name}</div>
                  <div className="text-xs text-white/60">
                    {s.isPublished ? "Published" : "Draft"} 
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}