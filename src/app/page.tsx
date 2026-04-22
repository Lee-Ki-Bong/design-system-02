'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
          Whitebong UI
        </h1>
        <p className="mt-2 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          토큰 교체만으로 유니크한 디자인 시스템을 생성하는 셸
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/docs"
            className="home-btn-primary rounded-full px-6 py-2 font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-emphasis)',
            }}
          >
            Docs
          </Link>
          <button
            onClick={toggle}
            className="cursor-pointer rounded-full px-6 py-2 font-medium transition-opacity hover:opacity-75"
            style={{
              backgroundColor: 'var(--color-surface-l3)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>
    </div>
  );
}
