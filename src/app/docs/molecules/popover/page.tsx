'use client';

import { Popover } from '@/components/molecules/Popover';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'content', type: 'ReactNode', default: '-' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'" },
  { name: 'width', type: 'number', default: '280' },
  { name: 'children', type: 'ReactElement', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--radius-xl',
  '--shadow-lg',
  '--shadow-xs',
  '--pad-lg',
  '--z-dropdown',
];

function GuideContent() {
  return (
    <>
      <div
        style={{
          fontSize: 'var(--font-size-body)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--gap-xs)',
        }}
      >
        사용 가이드
      </div>
      <div
        style={{
          fontSize: 'var(--font-size-body-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--line-height-body)',
        }}
      >
        이 필드는 프로젝트의 고유 식별자입니다. 한번 설정하면 변경할 수 없습니다.
      </div>
      <div style={{ marginTop: 'var(--gap-md)', display: 'flex', gap: 'var(--gap-sm)' }}>
        <a
          href="#"
          style={{
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-primary)',
            textDecoration: 'underline',
          }}
        >
          더 알아보기
        </a>
      </div>
    </>
  );
}

function ProfileContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-info)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-body-sm)',
            flexShrink: 0,
          }}
        >
          JK
        </div>
        <div>
          <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>김정호</div>
          <div
            style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-tertiary)' }}
          >
            Product Designer
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 'var(--font-size-body-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--line-height-body)',
        }}
      >
        마지막 활동: 2분 전
      </div>
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: 'var(--gap-md)',
          display: 'flex',
          gap: 'var(--gap-sm)',
        }}
      >
        <a
          href="#"
          style={{
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-primary)',
            textDecoration: 'underline',
          }}
        >
          프로필 보기
        </a>
        <a
          href="#"
          style={{
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-text-tertiary)',
            textDecoration: 'underline',
          }}
        >
          메시지 보내기
        </a>
      </div>
    </div>
  );
}

function NotificationContent() {
  const items = [
    { title: '새 댓글', desc: '김정호님이 디자인 리뷰에 댓글을 남겼습니다.', time: '2분 전' },
    { title: '멘션', desc: '이수진님이 태스크에서 당신을 멘션했습니다.', time: '15분 전' },
    {
      title: '상태 변경',
      desc: '"로그인 리디자인" 태스크가 완료로 변경되었습니다.',
      time: '1시간 전',
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div
        style={{
          fontSize: 'var(--font-size-body)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--gap-sm)',
        }}
      >
        알림
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: 'var(--gap-sm) 0',
            borderTop: i > 0 ? '1px solid var(--color-border-subtle)' : undefined,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '2px',
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              {item.title}
            </span>
            <span
              style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-disabled)' }}
            >
              {item.time}
            </span>
          </div>
          <div
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-text-tertiary)',
              lineHeight: 'var(--line-height-body)',
            }}
          >
            {item.desc}
          </div>
        </div>
      ))}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: 'var(--gap-sm)',
          marginTop: 'var(--gap-xs)',
        }}
      >
        <a
          href="#"
          style={{
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-primary)',
            textDecoration: 'underline',
          }}
        >
          모두 보기
        </a>
      </div>
    </div>
  );
}

function TriggerButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{
        height: 'var(--height-md)',
        padding: '0 var(--pad-lg)',
        background: 'var(--color-surface-raised)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--font-size-body-sm)',
        fontWeight: 'var(--font-weight-medium)',
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--gap-sm)',
      }}
    >
      {children}
    </button>
  );
}

export default function PopoverPage() {
  return (
    <AtomDocPage
      name="Popover"
      description="클릭으로 열리는 자유 콘텐츠 오버레이. Tooltip과 동일한 포지셔닝 로직을 사용한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Guide with Footer Link">
        <ThemeSplit cols={1}>
          <Popover content={<GuideContent />}>
            <TriggerButton>Info Popover</TriggerButton>
          </Popover>
        </ThemeSplit>
      </DocSection>

      <DocSection title="User Profile Card">
        <ThemeSplit cols={1}>
          <Popover content={<ProfileContent />} width={260}>
            <TriggerButton>User Profile</TriggerButton>
          </Popover>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Notification List">
        <ThemeSplit cols={1}>
          <Popover content={<NotificationContent />} width={320}>
            <TriggerButton>Notifications</TriggerButton>
          </Popover>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Placement">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-4" style={{ padding: '60px 0' }}>
            <Popover placement="top" content={<GuideContent />}>
              <TriggerButton>Top</TriggerButton>
            </Popover>
            <Popover placement="bottom" content={<GuideContent />}>
              <TriggerButton>Bottom</TriggerButton>
            </Popover>
            <Popover placement="left" content={<GuideContent />}>
              <TriggerButton>Left</TriggerButton>
            </Popover>
            <Popover placement="right" content={<GuideContent />}>
              <TriggerButton>Right</TriggerButton>
            </Popover>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
