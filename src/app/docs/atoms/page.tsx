import Link from 'next/link';

const atoms = [
  { name: 'Button', href: '/docs/atoms/button', desc: '인터랙션의 기본 단위' },
  { name: 'Input', href: '/docs/atoms/input', desc: '텍스트 입력' },
  { name: 'Select', href: '/docs/atoms/select', desc: '드롭다운 선택' },
  { name: 'Textarea', href: '/docs/atoms/textarea', desc: '멀티라인 입력' },
  { name: 'Checkbox', href: '/docs/atoms/checkbox', desc: '체크 토글' },
  { name: 'Radio', href: '/docs/atoms/radio', desc: '단일 선택' },
  { name: 'Switch', href: '/docs/atoms/switch', desc: '온/오프 토글' },
  { name: 'Badge', href: '/docs/atoms/badge', desc: '상태 라벨, 카운트' },
  { name: 'Avatar', href: '/docs/atoms/avatar', desc: '사용자 프로필' },
  { name: 'Icon', href: '/docs/atoms/icon', desc: 'SVG 아이콘 렌더러' },
  { name: 'Tooltip', href: '/docs/atoms/tooltip', desc: '호버 힌트' },
  { name: 'Spinner', href: '/docs/atoms/spinner', desc: '로딩 인디케이터' },
  { name: 'Skeleton', href: '/docs/atoms/skeleton', desc: '로딩 플레이스홀더' },
  { name: 'Progress', href: '/docs/atoms/progress', desc: '진행률 바' },
  { name: 'Divider', href: '/docs/atoms/divider', desc: '구분선' },
];

export default function AtomsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Atoms
      </h1>
      <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        토큰을 직접 소비하는 최소 단위 컴포넌트
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {atoms.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group rounded-xl p-5 transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <div
              className="mb-3 flex h-20 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'var(--color-surface-sunken)' }}
            >
              <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                preview
              </span>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {a.name}
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {a.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
