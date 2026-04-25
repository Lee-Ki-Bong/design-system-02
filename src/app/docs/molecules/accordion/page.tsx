'use client';

import { Accordion } from '@/components/molecules/Accordion';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'items', type: 'AccordionItem[]', default: '-' },
  { name: 'multiple', type: 'boolean', default: 'false' },
  { name: 'defaultOpen', type: 'number[]', default: '[]' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--radius-xl',
  '--shadow-sm',
  '--pad-md',
  '--pad-lg',
  '--font-size-body',
  '--font-size-body-sm',
  '--font-weight-medium',
  '--line-height-body',
  '--token-transition',
  '--token-transition-fast',
];

const faqItems = [
  {
    label: '결제 수단을 변경할 수 있나요?',
    content:
      '설정 > 결제 관리에서 언제든지 변경할 수 있습니다. 변경 사항은 다음 결제 주기부터 적용됩니다.',
  },
  {
    label: '환불 정책은 어떻게 되나요?',
    content:
      '구매 후 14일 이내에 환불을 요청할 수 있습니다. 사용 이력이 없는 경우 전액 환불됩니다.',
  },
  {
    label: '팀 멤버를 추가하려면?',
    content:
      '설정 > 팀 관리에서 이메일 초대로 멤버를 추가할 수 있습니다. 관리자 권한이 필요합니다.',
  },
];

export default function AccordionPage() {
  return (
    <AtomDocPage
      name="Accordion"
      description="접기/펼치기 패널. 단일 열기와 다중 열기 모드를 지원한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Single (기본)">
        <ThemeSplit cols={1}>
          <div style={{ maxWidth: 480 }}>
            <Accordion items={faqItems} defaultOpen={[0]} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Multiple">
        <ThemeSplit cols={1}>
          <div style={{ maxWidth: 480 }}>
            <Accordion items={faqItems} multiple defaultOpen={[0, 2]} />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
