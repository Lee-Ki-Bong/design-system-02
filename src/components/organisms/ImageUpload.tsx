'use client';

import { useState, useRef, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, useSortable, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/atoms/Icon';

/* ─── types ─── */

export interface ImageItem {
  id: string;
  url: string;
  file?: File;
}

export interface ImageUploadProps {
  value?: ImageItem[];
  onChange?: (items: ImageItem[]) => void;
  max?: number;
  accept?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── SortableImage ─── */

function SortableImage({
  item,
  onRemove,
  disabled,
}: {
  item: ImageItem;
  onRemove: (id: string) => void;
  disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        aspectRatio: '1',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        position: 'relative',
        opacity: isDragging ? 0.5 : 1,
        cursor: disabled ? 'default' : 'grab',
        border: '1px solid var(--color-border-subtle)',
      }}
      {...attributes}
      {...(disabled ? {} : listeners)}
    >
      <img
        src={item.url}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      {!disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 24,
            height: 24,
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--token-transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.75)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.55)';
          }}
          aria-label="이미지 삭제"
        >
          <Icon name="x" size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

/* ─── ImageUpload ─── */

export function ImageUpload({
  value = [],
  onChange,
  max = 10,
  accept = 'image/*',
  disabled = false,
  className,
  style,
}: ImageUploadProps) {
  const [items, setItems] = useState<ImageItem[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentItems = value.length > 0 ? value : items;
  const canAdd = currentItems.length < max && !disabled;

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const updateItems = useCallback(
    (next: ImageItem[]) => {
      setItems(next);
      onChange?.(next);
    },
    [onChange],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = currentItems.findIndex((i) => i.id === active.id);
    const newIdx = currentItems.findIndex((i) => i.id === over.id);
    updateItems(arrayMove(currentItems, oldIdx, newIdx));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = max - currentItems.length;
    const newFiles = Array.from(files).slice(0, remaining);
    const newItems: ImageItem[] = newFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      url: URL.createObjectURL(file),
      file,
    }));
    updateItems([...currentItems, ...newItems]);
  };

  const handleRemove = (id: string) => {
    const item = currentItems.find((i) => i.id === id);
    if (item && !item.file) {
      // external url, no revoke needed
    } else if (item) {
      URL.revokeObjectURL(item.url);
    }
    updateItems(currentItems.filter((i) => i.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn('ds-image-upload', className)} style={style}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={currentItems.map((i) => i.id)} strategy={rectSortingStrategy}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: 'var(--gap-md)',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {currentItems.map((item) => (
              <SortableImage
                key={item.id}
                item={item}
                onRemove={handleRemove}
                disabled={disabled}
              />
            ))}

            {/* Add button */}
            {canAdd && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  aspectRatio: '1',
                  borderRadius: 'var(--radius-xl)',
                  border: '2px dashed var(--color-border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--gap-xs)',
                  color: 'var(--color-text-tertiary)',
                  transition:
                    'border-color var(--token-transition-fast), background var(--token-transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.background = 'var(--color-surface-sunken)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon name="plus" size={24} />
                <span
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {currentItems.length}/{max}
                </span>
              </button>
            )}
          </div>
        </SortableContext>
      </DndContext>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
    </div>
  );
}
