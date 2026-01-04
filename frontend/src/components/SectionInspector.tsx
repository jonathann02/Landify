import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import type { Section } from "../services/sectionService";
import { SECTION_DEFINITIONS,
  type FeaturesContent,
  type HeroContent,
  type SectionType,
  type CtaContent,
} from "../sections/sectionTypes";
import { useTranslation } from "../i18n/useTranslation";
import type { TranslationKey } from "../i18n";


type DraftContent = HeroContent | FeaturesContent | CtaContent;


interface SectionInspectorProps {
    section: Section | null;
    onChange: (sectionId: string, NextContent: unknown) => void; 
    onSave: (sectionId: string, NextContent: unknown) => Promise<void>; 
    onDelete: () => void; 
    isSaving: boolean; 
    isDeleting: boolean; 
    error?: string | null;
}

export function SectionInspector({
    section, 
    onChange, 
    onSave,
    onDelete,
    isSaving,
    isDeleting,
    error,
}: SectionInspectorProps) {
  const { t } = useTranslation();
  const type = (section?.type as SectionType | undefined) ?? null;
  const definition = type ? SECTION_DEFINITIONS[type] : null;

  const initialContent = useMemo<DraftContent | null>(() => {
    if (!section || !type || !definition) return null;



    const parsed = section.content && "content" in section.content ? (section.content.content as DraftContent) : null; 

    return parsed ?? (definition.defaultContent as DraftContent);
    }, [section, type, definition]);

    const [draft, setDraft] = useState<DraftContent | null>(initialContent);

    useEffect(() => {
        setDraft(initialContent);
    }, [initialContent]);

    if (!section || !type || !definition) {
        return <div className="text-white/70">{t("inspector.selectSection")}</div>;
    }



    const handleChange = (next: DraftContent) => {
        setDraft(next);
        onChange(section.id, next);
    }; 

    const handleSaveClick = async () => {
        if (!draft) return; 
        await onSave(section.id, draft); 
    }; 

  return (
    <div className="space-y-4">
      <div>
        <div className="text-lg font-semibold text-white">{definition.label}</div>
        <p className="text-sm text-white/60">{t("editor.inspectorSubtitle")}</p>
      </div>

      <div className="space-y-4">
        {renderFields(type, draft ?? (definition.defaultContent as DraftContent), handleChange, t)}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-100">
          {error}
        </div>
      )}

        <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSaveClick}
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? t("editor.saving") : t("editor.saveChanges")}
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="inline-flex items-center justify-center rounded-full border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? t("editor.deleting") : t("editor.deleteSection")}
        </button>
      </div>
    </div>
  );
}

    function renderFields(
        type: SectionType, 
        draft: DraftContent, 
        onChange: (next: DraftContent) => void,
        t: (key: TranslationKey) => string, 
    ): ReactElement {
    switch (type) {
    case "hero":
        return <HeroInspectorFields value={draft as HeroContent} onChange={onChange} t={t} />;
    case "features":
        return <FeaturesInspectorFields value={draft as FeaturesContent} onChange={onChange} t={t} />;
    case "cta":
        return <CtaInspectorFields value={draft as CtaContent} onChange={onChange} t={t} />;
    default:
        return <div className="text-white/70">Unsupported section type: {type}</div>;
    }
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-white">{label}</label>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-white">{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>
  );
}


function HeroInspectorFields({
    value, 
    onChange, 
    t, 
}: {
    value: HeroContent;
    onChange: (v: DraftContent) => void; 
    t: (key: TranslationKey) => string; 
}) {

    const update = (patch: Partial<HeroContent>) => onChange({ ...value, ...patch }); 
    return (
    <div className="space-y-3">
      <TextField label={t("inspector.heading")} value={value.heading} onChange={(v) => update({ heading: v })} />
      <TextAreaField label={t("inspector.subheading")} value={value.subheading} rows={2} onChange={(v) => update({ subheading: v })} />
      <TextField label={t("inspector.ctaLabel")} value={value.ctaLabel} onChange={(v) => update({ ctaLabel: v })} />
      <TextField label={t("inspector.ctaUrl")} value={value.ctaUrl} onChange={(v) => update({ ctaUrl: v })} />

      
    </div>
  );
}

function FeaturesInspectorFields({
    value, 
    onChange, 
    t, 
}: {
    value: FeaturesContent;
    onChange: (v: DraftContent) => void;
    t: (key: TranslationKey) => string;
}) {
    const update = (patch: Partial<FeaturesContent>) => onChange({ ...value, ...patch });

    const updateItem = (idx: number, patch: Partial<FeaturesContent["items"][number]>) => {
        const items = [...(value.items ?? [])]; 
        items[idx] = { ...(items[idx] ?? { title: "", description: "" }), ...patch };
        update({ items });
  };

    return (
    <div className="space-y-3">
      <TextField label={t("inspector.heading")} value={value.heading} onChange={(v) => update({ heading: v })} />
      <TextAreaField label={t("inspector.subheading")} value={value.subheading} rows={2} onChange={(v) => update({ subheading: v })} />

      <div className="space-y-2">
        <div className="text-sm font-semibold text-white">{t("inspector.featureItems")}</div>
        {(value.items ?? []).slice(0, 3).map((item, idx) => (
          <div key={idx} className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
            <TextField label={`${t("inspector.title")} ${idx + 1}`} value={item.title} onChange={(v) => updateItem(idx, { title: v })} />
            <TextAreaField label={t("inspector.description")} value={item.description} rows={2} onChange={(v) => updateItem(idx, { description: v })} />
          </div>
        ))}
      </div>
    </div>
  );
}


function CtaInspectorFields({
  value,
  onChange,
  t,
}: {
  value: CtaContent;
  onChange: (v: DraftContent) => void;
  t: (key: TranslationKey) => string;
}) {
  const update = (patch: Partial<CtaContent>) => onChange({ ...value, ...patch });
  return (
    <div className="space-y-3">
      <TextField label={t("inspector.heading")} value={value.heading} onChange={(v) => update({ heading: v })} />
      <TextAreaField label={t("inspector.subheading")} value={value.subheading} rows={2} onChange={(v) => update({ subheading: v })} />
      <TextField label={t("inspector.ctaLabel")} value={value.ctaLabel} onChange={(v) => update({ ctaLabel: v })} />
      <TextField label={t("inspector.ctaUrl")} value={value.ctaUrl} onChange={(v) => update({ ctaUrl: v })} />
    </div>
  );
}

