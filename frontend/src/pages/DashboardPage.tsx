import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GlassCard } from "../components/ui/GlassCard";
import {
  createSite,
  deleteSite,
  getSites,
  type CreateSitePayload,
  type SiteSummary,
} from "../services/siteService";

import { useTranslation } from "../i18n/useTranslation";


type TFunc = ReturnType<typeof useTranslation>["t"];

function formatDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
        day: "numeric", 
        month: "short", 
        year: "numeric", 
    });
}

function StatusBadge({ published, t }: { published: boolean; t: TFunc }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
        published
          ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
          : "bg-amber-500/15 text-amber-200 border border-amber-400/30"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-80" />
      {published ? t("dashboard.statusPublished") : t("dashboard.statusDraft")}
    </span>
  );
}

interface SiteCardProps {
    site: SiteSummary;
    onOpen: (id: string) => void; 
    onDelete: (id: string) => void;
    isDeleting: boolean;
    t: TFunc;
}

function SiteCard({ site, onOpen, onDelete, isDeleting, t }: SiteCardProps) {
    return (
        <div role="button" tabIndex={0} onClick={() => onOpen(site.id)}
        onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return; 
            if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(site.id);
        }
      }}
      className="text-eft h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 rounded-3xl">


        <GlassCard className="h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="text-lg font-semibold text-white">{site.name}</div>
            <div className="text-sm text-white/60">
              {t("dashboard.updatedPrefix")} {formatDate(site.updatedAt)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge published={site.isPublished} t={t} />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(site.id);
              }}
              disabled={isDeleting}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? t("dashboard.deleting") : t("dashboard.delete")}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

  export function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [sites, setSites] = useState<SiteSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const disableSubmit = useMemo(() => name.trim().length === 0 || isCreating, [name, isCreating]);

  const handleUnauthorized = () => {
    localStorage.removeItem("landify_token");
    navigate("/login");
    };

    useEffect(() => {
        const load = async () => {
            setIsLoading(true); 
            setError(null); 
            try {
                const result = await getSites();
                setSites(result);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Failed to load sites."; 
                setError(message);
                if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
                handleUnauthorized();
                }
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, []);




    const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (disableSubmit) return;

    setIsCreating(true);
    setCreateError(null);
    try {
      const payload: CreateSitePayload = { name: name.trim() };
      const created = await createSite(payload);

      setSites((prev) => [created, ...prev]);
      setName("");
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create site";
      setCreateError(message);
      if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
        handleUnauthorized();
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpen = (id: string) => {
    navigate(`/sites/${id}/editor`);
  };


    const handleDelete = async (id: string) => {
        const confirm = window.confirm(t("dashboard.deleteConfirm"));
        if (!confirm) return;

        setDeletingId(id);
        setDeleteError(null);
        try {
            await deleteSite(id);
            setSites((prev) => prev.filter((s) => s.id !== id));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to delete site.";
            setDeleteError(message);
            if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
        handleUnauthorized();
        }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">{t("dashboard.title")}</h1>
                    <p className="text-sm text-white/70">{t("dashboard.subtitle")}</p>
                </div>

                <button type="button" onClick={() => setShowForm((v) => !v)}
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70">
                    {showForm ? t("dashboard.toggleFormClose") : t("dashboard.toggleFormOpen")}
                </button>
            </div>

      {showForm && (
        <GlassCard className="p-6">
          <form className="space-y-4" onSubmit={handleCreate}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="site-name">
                {t("dashboard.siteNameLabel")}
              </label>
              <input
                id="site-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("dashboard.siteNamePlaceholder")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                required
              />
            </div>

            {createError && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {createError}
              </div>
            )}

            <div className="flex items-center gap-3">
             <button type="submit" disabled={disableSubmit}
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60">
                {isCreating ? t("dashboard.creating") : t("dashboard.createSubmit")}
              </button>
              <p className="text-xs text-white/50">{t("dashboard.createNote")}</p>
            </div>
          </form>
        </GlassCard>
      )}

      {deleteError && ( 
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {deleteError}
        </div>
      )}

        {isLoading ? (
         <div className="text-white/70">{t("dashboard.loading")}</div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : sites.length === 0 ? (
        <GlassCard className="p-6 text-center text-white/70">
          <div className="text-lg font-semibold text-white">{t("dashboard.emptyTitle")}</div>
          <p className="mt-2 text-sm text-white/60">{t("dashboard.emptySubtitle")}</p>
        </GlassCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              onOpen={handleOpen}
              onDelete={handleDelete}
              isDeleting={deletingId === site.id}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}