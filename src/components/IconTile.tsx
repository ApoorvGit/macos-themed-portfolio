import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IconTileProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: (id: string, isMulti: boolean) => void;
  onDoubleClick: (id: string) => void;
}

export const IconTile: React.FC<IconTileProps> = ({
  id,
  label,
  icon,
  isSelected,
  onSelect,
  onDoubleClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => onSelect(id, e.metaKey || e.ctrlKey || e.shiftKey)}
      onDoubleClick={() => onDoubleClick(id)}
      className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
        isSelected ? "bg-blue-500/40 backdrop-blur-sm" : "hover:bg-white/10"
      }`}
      aria-label={label}
    >
      <div className="w-16 h-16 flex items-center justify-center drop-shadow-xl">
        {icon}
      </div>
      <span className="text-xs text-white text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-semibold max-w-[70px] truncate">
        {label}
      </span>
    </button>
  );
};
