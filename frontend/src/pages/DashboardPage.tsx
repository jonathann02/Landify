import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSites, type SiteSummary } from "../services/siteService";

export function DashboardPage() {
  const navigate = useNavigate();
  const [sites, setSites] = useState<SiteSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSites()
      .then(setSites)
      .catch((e) => setError(e instanceof Error ? e.message : "Kunde inte hämta sajter"));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <ul className="mt-6 space-y-3">
          {sites.map((site) => (
            <li
              key={site.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div>
                <div className="font-semibold">{site.name}</div>
                <div className="text-xs text-white/60">ID: {site.id}</div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/sites/${site.id}/editor`)}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Redigera
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
