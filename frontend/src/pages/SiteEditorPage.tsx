import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { GlassCard } from "../components/ui/GlassCard";
import { SectionPalette } from "../components/SectionPalette";
import { SectionCanvas } from "../components/SectionCanvas";
import { SectionInspector } from "../components/SectionInspector";
import { SECTION_TYPES, type SectionType, type SectionContent } from "../sections/sectionTypes";

import { getSiteById, publishSite, type SiteWithSections } from "../services/siteService";
import {
  createSection,
  deleteSection,
  reorderSections,
  updateSection,
  type Section,
  type NewSectionPayload,
  type UpdateSectionPayload,
} from "../services/sectionService";

import { useTranslation } from "../i18n/useTranslation";

type EditorSection = Section;

export function SiteEditorPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [site, setSite] = useState<SiteWithSections | null>(null);
  const [sections, setSections] = useState<EditorSection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [createError, setCreateError] = useState<string | null>(null);
  const [reorderError, setReorderError] = useState<string | null>(null);
  const [inspectorError, setInspectorError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const selectedSection = useMemo(
    () => sections.find((s) => s.id === selectedId) ?? null,
    [sections, selectedId],
  );

  const handleUnauthorized = () => {
    localStorage.removeItem("landify_token");
    navigate("/login");
  };

  useEffect(() => {
    const load = async () => {
      if (!siteId) return;

      setIsLoading(true);
      setPageError(null);

      try {
        const fetched = await getSiteById(siteId);
        setSite(fetched);

        const ordered = [...(fetched.sections ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
        setSections(ordered);
        setSelectedId(ordered[0]?.id ?? null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load site";
        setPageError(message);
        if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
          handleUnauthorized();
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [siteId]);

  const handleSelect = (id: string) => setSelectedId(id);

  const handleDelete = async () => {
    if (!siteId || !selectedSection) return;

    const confirmDelete = window.confirm(t("editor.deleteSectionConfirm"));
    if (!confirmDelete) return;

    setIsDeleting(true);
    setInspectorError(null);

    try {
      await deleteSection(siteId, selectedSection.id);

      setSections((prev) => {
        const updated = prev.filter((s) => s.id !== selectedSection.id);
        setSelectedId((current) => (current !== selectedSection.id ? current : updated[0]?.id ?? null));
        return updated;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete section";
      setInspectorError(message);
      if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
        handleUnauthorized();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInspectorChange = (sectionId: string, nextContent: unknown) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? ({
              ...s,
              content: { type: s.type as SectionType, content: nextContent } as SectionContent,
            } as EditorSection)
          : s,
      ),
    );
  };

  const handleInspectorSave = async (sectionId: string, nextContent: unknown) => {
    if (!siteId) return;

    const target = sections.find((s) => s.id === sectionId);
    if (!target) return;

    setIsSaving(true);
    setInspectorError(null);

    try {
      const payload: UpdateSectionPayload = {
        type: target.type,
        sortOrder: target.sortOrder,
        content: { type: target.type as SectionType, content: nextContent } as SectionContent,
      };

      const updated = await updateSection(siteId, sectionId, payload);
      setSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save section";
      setInspectorError(message);
      if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
        handleUnauthorized();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!siteId) return;

    setIsPublishing(true);
    setPublishError(null);

    try {
      const updated = await publishSite(siteId);
      setSite(updated);

      const ordered = [...(updated.sections ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
      setSections(ordered);

      const slug = updated.slug;
      if (slug) {
        window.open(`/s/${slug}`, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to publish site";
      setPublishError(message);
      if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
        handleUnauthorized();
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCreate = async (sectionType: SectionType = SECTION_TYPES[0]) => {
    if (!siteId || isCreating) return;

    setIsCreating(true);
    setCreateError(null);

    try {
      const payload: NewSectionPayload = {
        type: sectionType,
        sortOrder: sections.length,
        
      };

      const created = await createSection(siteId, payload);
      const newSections = [...sections, created].sort((a, b) => a.sortOrder - b.sortOrder);

      setSections(newSections);
      setSelectedId(created.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create section";
      setCreateError(message);
      if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
        handleUnauthorized();
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!siteId) return;

    const { active, over } = event;
    if (!over) return;

    const activeFrom = active.data.current?.from as string | undefined;
    const activeType = active.data.current?.sectionType as SectionType | undefined;

   
    if (activeFrom === "palette" && activeType) {
      await handleCreate(activeType);
      return;
    }

    
    if (activeFrom === "canvas") {
      if (active.id === over.id) return;

      setReorderError(null);

      const previous = sections;
      const oldIndex = previous.findIndex((s) => s.id === active.id);
      const newIndex = previous.findIndex((s) => s.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(previous, oldIndex, newIndex).map((s, idx) => ({
        ...s,
        sortOrder: idx,
      }));

      setSections(reordered);

      try {
        await reorderSections(siteId, reordered.map((s) => s.id));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to reorder sections";
        setReorderError(message);
        if (message.toLowerCase().includes("unauthorized") || message.includes("401")) {
          handleUnauthorized();
        }
        setSections(previous);
      }
    }
  };

  if (!siteId) {
    return <div className="text-red-200">{t("editor.invalidSite")}</div>;
  }

  if (isLoading) {
    return <div className="text-white/70">{t("editor.loading")}</div>;
  }

  if (pageError) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
        {pageError}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="w-full px-4 py-10 lg:px-8 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">{site?.name ?? t("nav.brand")}</h1>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-white/60">{t("editor.subtitle")}</p>
              {site?.slug && (
                <a
                  href={`/s/${site.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-200 underline underline-offset-4 hover:text-indigo-100"
                >
                  {t("editor.viewLive")}: /s/{site.slug}
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
            >
              {isPublishing ? t("editor.publishing") : t("editor.publish")}
            </button>
          </div>
        </div>

        {createError && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {createError}
          </div>
        )}
        {publishError && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {publishError}
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row xl:gap-8">
          <aside className="w-full lg:w-56 xl:w-60">
            <GlassCard className="h-full p-4 lg:p-6">
              <div className="mb-4">
                <div className="text-lg font-semibold text-white">{t("editor.paletteTitle")}</div>
                <p className="text-sm text-white/60">{t("editor.paletteSubtitle")}</p>
              </div>
              <SectionPalette />
            </GlassCard>
          </aside>

          <main className="w-full min-w-0 flex-1">
            <GlassCard className="h-full space-y-3 p-4 lg:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">{t("editor.canvasTitle")}</div>
                  <p className="text-sm text-white/60">{t("editor.canvasSubtitle")}</p>
                </div>
                {reorderError && (
                  <div className="rounded-full border border-red-400/50 px-3 py-1 text-xs text-red-100">
                    {reorderError}
                  </div>
                )}
              </div>

              <SectionCanvas sections={sections} selectedId={selectedId} onSelect={handleSelect} />
            </GlassCard>
          </main>

          <aside className="w-full lg:w-72 xl:w-80">
            <GlassCard className="h-full p-4 lg:p-6">
              <SectionInspector
                section={selectedSection}
                onChange={handleInspectorChange}
                onSave={handleInspectorSave}
                onDelete={handleDelete}
                isSaving={isSaving}
                isDeleting={isDeleting}
                error={inspectorError}
              />
            </GlassCard>
          </aside>
        </div>
      </div>
    </DndContext>
  );
}









