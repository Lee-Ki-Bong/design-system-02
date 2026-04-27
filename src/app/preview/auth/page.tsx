'use client';

import { useState } from 'react';
import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Divider } from '@/components/atoms/Divider';

export default function AuthPreview() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const emailError =
    touched.email && !email
      ? '이메일을 입력하세요.'
      : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? '올바른 이메일 형식이 아닙니다.'
        : undefined;

  const passwordError = touched.password && !password ? '비밀번호를 입력하세요.' : undefined;

  return (
    <AuthTemplate
      brand={{ logo: 'B', name: 'Whitebong' }}
      footer={
        <span>
          계정이 없으신가요? <a href="/preview/auth/signup">회원가입</a>
        </span>
      }
    >
      <div style={{ marginBottom: 'var(--pad-xl)' }}>
        <h1
          style={{
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-semibold)',
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          로그인
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-body-sm)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--gap-xs)',
          }}
        >
          계정 정보를 입력하세요.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pad-lg)' }}>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              marginBottom: 'var(--gap-xs)',
            }}
          >
            이메일
          </label>
          <Input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => markTouched('email')}
            error={emailError}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-medium)',
              marginBottom: 'var(--gap-xs)',
            }}
          >
            비밀번호
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => markTouched('password')}
            error={passwordError}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            label="로그인 유지"
          />
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            비밀번호 찾기
          </a>
        </div>

        <Button variant="emphasis" style={{ width: '100%' }}>
          로그인
        </Button>

        <Divider />

        <Button variant="secondary" style={{ width: '100%' }}>
          Google로 계속하기
        </Button>
      </div>
    </AuthTemplate>
  );
}
