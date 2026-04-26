'use client';

import { useState, useCallback } from 'react';
import { FileUpload, type FileUploadFile } from '@/components/molecules/FileUpload';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'files', type: 'FileUploadFile[]', default: '[]' },
  { name: 'accept', type: 'string', default: '-' },
  { name: 'multiple', type: 'boolean', default: 'true' },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'maxSizeMB', type: 'number', default: '-' },
  { name: 'onFilesAdd', type: '(files: File[]) => void', default: '-' },
  { name: 'onFileRemove', type: '(index: number) => void', default: '-' },
  { name: 'files[].preview', type: 'string (URL)', default: '-' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-surface',
  '--color-primary',
  '--color-primary-subtle',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-border',
  '--color-border-subtle',
  '--pad-sm',
  '--pad-md',
  '--pad-lg',
  '--pad-2xl',
  '--gap-sm',
  '--radius-xl',
  '--radius-lg',
  '--border-width-thin',
  '--token-transition-fast',
];

function DemoBasic() {
  const [files, setFiles] = useState<FileUploadFile[]>([]);

  const handleAdd = useCallback((added: File[]) => {
    setFiles((prev) => [...prev, ...added.map((f) => ({ name: f.name, size: f.size }))]);
  }, []);

  const handleRemove = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <FileUpload
      files={files}
      onFilesAdd={handleAdd}
      onFileRemove={handleRemove}
      style={{ maxWidth: 420 }}
    />
  );
}

function DemoWithProgress() {
  const files: FileUploadFile[] = [
    { name: 'report-2024.pdf', size: 2_400_000, progress: 100 },
    { name: 'screenshot.png', size: 850_000, progress: 65 },
    { name: 'data.csv', size: 120_000, progress: 30 },
  ];

  return <FileUpload files={files} onFileRemove={() => {}} style={{ maxWidth: 420 }} />;
}

function DemoImagePreview() {
  const [files, setFiles] = useState<FileUploadFile[]>([]);

  const handleAdd = useCallback((added: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...added.map((f) => ({
        name: f.name,
        size: f.size,
        preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
      })),
    ]);
  }, []);

  const handleRemove = useCallback((index: number) => {
    setFiles((prev) => {
      const removed = prev[index];
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  return (
    <FileUpload
      files={files}
      accept="image/*"
      onFilesAdd={handleAdd}
      onFileRemove={handleRemove}
      style={{ maxWidth: 420 }}
    />
  );
}

function DemoRestricted() {
  const [files, setFiles] = useState<FileUploadFile[]>([]);

  return (
    <FileUpload
      files={files}
      accept=".jpg,.png,.webp"
      maxSizeMB={5}
      onFilesAdd={(added) =>
        setFiles((prev) => [...prev, ...added.map((f) => ({ name: f.name, size: f.size }))])
      }
      onFileRemove={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
      style={{ maxWidth: 420 }}
    />
  );
}

function DemoDisabled() {
  return (
    <FileUpload
      files={[{ name: 'locked-file.pdf', size: 1_200_000 }]}
      disabled
      style={{ maxWidth: 420 }}
    />
  );
}

export default function FileUploadPage() {
  return (
    <AtomDocPage
      name="FileUpload"
      description="드래그앤드롭 파일 업로드 영역. 파일 목록, 진행률 표시, 파일 제거를 지원한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Basic (Drag & Drop)">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Progress">
        <ThemeSplit>
          <DemoWithProgress />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Image Preview">
        <ThemeSplit>
          <DemoImagePreview />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Restricted (Image only, max 5MB)">
        <ThemeSplit>
          <DemoRestricted />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Disabled">
        <ThemeSplit>
          <DemoDisabled />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
