import { useDraggable } from "@dnd-kit/core";
import { SECTION_DEFINITIONS, SECTION_TYPES, type SectionType } from "../sections/sectionTypes";

export function SectionPalette() {
  return (
    <div className="space-y-2">
      {SECTION_TYPES.map((type) => (
        <PaletteItem key={type} type={type} />
      ))}
    </div>
  );
}

function PaletteItem({ type }: { type: SectionType }) {
  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { from: "palette", sectionType: type },
  });

  const definition = SECTION_DEFINITIONS[type];
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
        isDragging
          ? "border-indigo-400/60 bg-indigo-500/10 text-white shadow-lg shadow-indigo-900/30"
          : "border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
      }`}

      {...attributes}
      {...listeners}
    >
      <div className="font-semibold text-white">{definition.label}</div>
      <div className="text-xs text-white/60 capitalize">{type}</div>
    </button>
  );
}