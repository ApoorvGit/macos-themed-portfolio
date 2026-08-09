import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { IconTile } from "./IconTile";

export interface IconItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface IconGridProps {
  items: IconItem[];
  onOpen: (id: string) => void;
}

export const IconGrid: React.FC<IconGridProps> = ({
  items: initialItems,
  onOpen,
}) => {
  const [items, setItems] = useState<IconItem[]>(initialItems);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSelect = (id: string, isMulti: boolean) => {
    if (isMulti) {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } else {
      setSelectedIds(new Set([id]));
    }
  };

  const handleDoubleClick = (id: string) => {
    onOpen(id);
    setSelectedIds(new Set());
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-6 gap-4 p-4">
          {items.map((item) => (
            <IconTile
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isSelected={selectedIds.has(item.id)}
              onSelect={handleSelect}
              onDoubleClick={handleDoubleClick}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
