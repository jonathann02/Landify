import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SECTION_DEFINITIONS, type SectionType } from "../sections/sectionTypes";
import type { Section } from "../services/sectionService";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SectionRenderer } from "./SectionRenderer";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslation } from "../i18n/useTranslation";


interface SectionCanvasProps {
    sections: Section[]; 
    selectedId: string | null;
    onSelect: (id: string) => void;

}

export function SectionCanvas({ sections, selectedId, onSelect }: SectionCanvasProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: "canvas", 
    }); 
    const { t } = useTranslation();

    return (
            <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full space-y-6">
        <div
          ref={setNodeRef}
          className={`w-full min-h-[320px] rounded-2xl border border-white/10 bg-white/5 p-3 transition ${
            isOver ? "border-indigo-400/60 bg-indigo-500/5" : ""
          }`}
        >
          {sections.length === 0 ? (
            <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-white/60">
              {t("editor.canvasEmpty")}
            </div>
          ) : (
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {sections.map((section) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    selected={selectedId === section.id}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>

    ); 
}

function SectionCard({
  section,
  selected,
  onSelect,
}: {
  section: Section;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: { from: "canvas" },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const type = section.type as SectionType;
  const definition = SECTION_DEFINITIONS[type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border px-4 py-3 text-left transition ${
        selected
          ? "border-indigo-400/60 bg-indigo-500/10 text-white"
          : "border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
      } ${isDragging ? "scale-[1.01] shadow-lg shadow-indigo-900/40" : ""}`}
      onClick={() => onSelect(section.id)}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-semibold text-white">{definition?.label ?? section.type}</div>
        <div className="text-xs text-white/50">Order {section.sortOrder}</div>
      </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
        <SectionRenderer section={section} />
      </div>
    </div>
  );
}
