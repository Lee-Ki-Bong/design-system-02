'use client';

import { ListItem } from '@/components/molecules/ListItem';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'leading', type: 'ReactNode', default: '-' },
  { name: 'title', type: 'string', default: '-' },
  { name: 'description', type: 'string', default: '-' },
  { name: 'meta', type: 'string', default: '-' },
  { name: 'trailing', type: 'ReactNode', default: '-' },
  { name: 'active', type: 'boolean', default: 'false' },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'href', type: 'string', default: '-' },
  { name: 'onClick', type: '() => void', default: '-' },
];

const tokens = [
  '--color-text',
  '--color-text-tertiary',
  '--color-surface-sunken',
  '--pad-sm',
  '--pad-md',
  '--gap-sm',
  '--radius-xl',
  '--opacity-disabled',
  '--token-transition-fast',
];

const listWrap: React.CSSProperties = {
  maxWidth: 420,
  borderRadius: 'var(--radius-xl)',
  border: 'var(--border-width-thin) solid var(--color-border-subtle)',
  overflow: 'hidden',
};

export default function ListItemPage() {
  return (
    <AtomDocPage
      name="ListItem"
      description="Avatar, 텍스트, meta, Badge, 액션을 조합한 범용 리스트 아이템."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="With Avatar">
        <ThemeSplit cols={1}>
          <div className="flex flex-col" style={listWrap}>
            <ListItem
              leading={
                <Avatar size={36} color="var(--accent-blue)">
                  JK
                </Avatar>
              }
              title="김정현"
              description="프론트엔드 엔지니어"
              meta="2분 전"
              onClick={() => {}}
            />
            <ListItem
              leading={
                <Avatar size={36} color="var(--accent-rose)">
                  LM
                </Avatar>
              }
              title="이민수"
              description="백엔드 엔지니어"
              meta="15분 전"
              onClick={() => {}}
            />
            <ListItem
              leading={
                <Avatar size={36} color="var(--accent-violet)">
                  PY
                </Avatar>
              }
              title="박유진"
              description="디자이너"
              meta="1시간 전"
              onClick={() => {}}
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Icon + Badge">
        <ThemeSplit cols={1}>
          <div className="flex flex-col" style={listWrap}>
            <ListItem
              leading={
                <span
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'var(--color-info-bg)',
                    color: 'var(--color-info)',
                  }}
                >
                  <Icon name="mail" size={18} />
                </span>
              }
              title="받은 편지함"
              description="새 메시지가 도착했습니다"
              trailing={<Badge variant="error">3</Badge>}
              onClick={() => {}}
            />
            <ListItem
              leading={
                <span
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'var(--color-success-bg)',
                    color: 'var(--color-success)',
                  }}
                >
                  <Icon name="send" size={18} />
                </span>
              }
              title="보낸 편지함"
              description="최근 발송 완료"
              onClick={() => {}}
            />
            <ListItem
              leading={
                <span
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'var(--color-warning-bg)',
                    color: 'var(--color-warning)',
                  }}
                >
                  <Icon name="file" size={18} />
                </span>
              }
              title="임시 보관함"
              description="작성 중인 메일"
              trailing={<Badge variant="default">12</Badge>}
              onClick={() => {}}
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Active & Disabled">
        <ThemeSplit cols={1}>
          <div className="flex flex-col" style={listWrap}>
            <ListItem
              leading={
                <span
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'var(--color-surface-sunken)',
                    color: 'var(--color-text)',
                  }}
                >
                  <Icon name="home" size={18} />
                </span>
              }
              title="대시보드"
              description="현재 페이지"
              active
              onClick={() => {}}
            />
            <ListItem
              leading={
                <span
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'var(--color-surface-sunken)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  <Icon name="settings" size={18} />
                </span>
              }
              title="설정"
              description="계정 및 환경설정"
              onClick={() => {}}
            />
            <ListItem
              leading={
                <span
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'var(--color-surface-sunken)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  <Icon name="logout" size={18} />
                </span>
              }
              title="로그아웃"
              description="세션 종료"
              disabled
              onClick={() => {}}
            />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
