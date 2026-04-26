'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Progress } from '@/components/atoms/Progress';
import { useState, useRef, useCallback } from 'react';

export interface FileUploadFile {
  name: string;
  size: number;
  progress?: number;
  preview?: string;
}

export interface FileUploadProps {
  files?: FileUploadFile[];
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSizeMB?: number;
  onFilesAdd?: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  files = [],
  accept,
  multiple = true,
  disabled = false,
  maxSizeMB,
  onFilesAdd,
  onFileRemove,
  className,
  style,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      let selected = Array.from(fileList);
      if (maxSizeMB) {
        selected = selected.filter((f) => f.size <= maxSizeMB * 1024 * 1024);
      }
      if (selected.length > 0) onFilesAdd?.(selected);
    },
    [maxSizeMB, onFilesAdd],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!disabled && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [disabled, handleFiles],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
        e.target.value = '';
      }
    },
    [handleFiles],
  );

  return (
    <div className={cn('ds-file-upload', className)} style={style}>
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center gap-3 rounded-xl text-center"
        style={{
          padding: 'var(--pad-2xl) var(--pad-lg)',
          border: `2px dashed ${isDragOver ? 'var(--color-primary)' : 'var(--color-border)'}`,
          backgroundColor: isDragOver
            ? 'var(--color-primary-subtle)'
            : 'var(--color-surface-sunken)',
          transition: 'var(--token-transition-fast)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 'var(--opacity-disabled)' : undefined,
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <span
          className="flex items-center justify-center rounded-full"
          style={{
            width: 44,
            height: 44,
            backgroundColor: 'var(--color-surface)',
            color: isDragOver ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
            transition: 'color var(--token-transition-fast)',
          }}
        >
          <Icon name="upload" size={22} />
        </span>
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            파일을 드래그하거나{' '}
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>클릭하여 선택</span>
          </p>
          {(accept || maxSizeMB) && (
            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {[accept && `허용: ${accept}`, maxSizeMB && `최대 ${maxSizeMB}MB`]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-3 flex flex-col" style={{ gap: 'var(--gap-sm)' }}>
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-lg"
              style={{
                padding: 'var(--pad-sm) var(--pad-md)',
                backgroundColor: 'var(--color-surface)',
                border: 'var(--border-width-thin) solid var(--color-border-subtle)',
              }}
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="shrink-0 rounded-md object-cover"
                  style={{ width: 36, height: 36 }}
                />
              ) : (
                <span style={{ color: 'var(--color-text-tertiary)' }}>
                  <Icon name="file" size={18} />
                </span>
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {file.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  {formatSize(file.size)}
                </p>
                {file.progress !== undefined && file.progress < 100 && (
                  <Progress value={file.progress} size="sm" className="mt-1" />
                )}
              </div>
              {onFileRemove && (
                <Button
                  variant="icon"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileRemove(i);
                  }}
                  style={{
                    width: 28,
                    height: 28,
                    minWidth: 28,
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    color: 'var(--color-text-tertiary)',
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  <Icon name="x" size={14} />
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
