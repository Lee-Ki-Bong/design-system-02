'use client';

import { FormLayout, FormField, FormRow, FormActions } from '@/components/organisms/FormLayout';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { DatePicker } from '@/components/molecules/DatePicker';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'title', type: 'string', default: '-' },
  { name: 'children', type: 'ReactNode', default: '-' },
  { name: 'actions', type: 'ReactNode', default: '-' },
  { name: 'maxWidth', type: 'number | string', default: '480' },
];

const subComponents = [
  { name: 'FormField', type: 'label, required, error, hint, children', default: '-' },
  { name: 'FormRow', type: 'columns (number), children', default: 'columns=2' },
  { name: 'FormActions', type: 'children', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-text',
  '--color-text-tertiary',
  '--color-error',
  '--color-border-subtle',
  '--radius-2xl',
  '--shadow-md',
  '--pad-2xl',
  '--gap-xs',
  '--gap-sm',
  '--gap-lg',
  '--gap-xl',
  '--gap-2xl',
  '--font-size-h3',
  '--font-size-body-sm',
  '--font-size-caption',
  '--font-weight-semibold',
  '--font-weight-medium',
];

function DemoBasic() {
  return (
    <FormLayout
      title="새 프로젝트"
      actions={
        <FormActions>
          <Button variant="ghost">취소</Button>
          <Button variant="emphasis">생성</Button>
        </FormActions>
      }
    >
      <FormField label="프로젝트 이름" required>
        <Input placeholder="프로젝트 이름을 입력하세요" defaultValue="Customer Portal Redesign" />
      </FormField>

      <FormRow>
        <FormField label="시작일">
          <DatePicker defaultValue={new Date(2026, 3, 21)} />
        </FormField>
        <FormField label="마감일" hint="비워두면 기한 없음">
          <DatePicker />
        </FormField>
      </FormRow>

      <FormField label="설명" error="프로젝트 설명은 필수 항목입니다.">
        <Input error="프로젝트 설명은 필수 항목입니다." />
      </FormField>
    </FormLayout>
  );
}

function DemoWithTextarea() {
  return (
    <FormLayout
      title="피드백 작성"
      actions={
        <FormActions>
          <Button variant="ghost">취소</Button>
          <Button variant="emphasis">제출</Button>
        </FormActions>
      }
    >
      <FormField label="카테고리" required>
        <Select
          options={[
            { label: '선택하세요', value: '' },
            { label: '버그 리포트', value: 'bug' },
            { label: '기능 요청', value: 'feature' },
            { label: '기타', value: 'etc' },
          ]}
        />
      </FormField>

      <FormField label="제목" required>
        <Input placeholder="제목을 입력하세요" />
      </FormField>

      <FormField label="상세 내용" hint="최대 500자">
        <Textarea placeholder="내용을 입력하세요" rows={4} />
      </FormField>
    </FormLayout>
  );
}

export default function FormLayoutPage() {
  return (
    <AtomDocPage
      name="FormLayout"
      description="폼 카드 + 필드 그리드 + 유효성 + 액션 버튼을 조합한 Organism. FormField, FormRow, FormActions 서브 컴포넌트 포��."
      props={[...props, ...subComponents]}
      tokens={tokens}
      category="Organisms"
      categoryHref="/docs/organisms"
    >
      <DocSection title="Basic (v1 form-layout 재현)">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Textarea + Select">
        <ThemeSplit>
          <DemoWithTextarea />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
