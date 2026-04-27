'use client';

import { useState } from 'react';
import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Divider } from '@/components/atoms/Divider';

export default function SignupPreview() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const nameError = touched.name && !name ? '이름을 입력하세요.' : undefined;

  const emailError =
    touched.email && !email
      ? '이메일을 입력하세요.'
      : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? '올바른 이메일 형식이 아닙니다.'
        : undefined;

  const passwordError =
    touched.password && !password
      ? '비밀번호를 입력하세요.'
      : touched.password && password.length < 8
        ? '8자 이상 입력하세요.'
        : undefined;

  const confirmError =
    touched.confirm && !confirmPassword
      ? '비밀번호를 다시 입력하세요.'
      : touched.confirm && confirmPassword !== password
        ? '비밀번호가 일치하지 않습니다.'
        : undefined;

  return (
    <AuthTemplate
      brand={{ logo: 'B', name: 'Whitebong' }}
      footer={
        <span>
          이미 계정이 있으신가요? <a href="/preview/auth">로그인</a>
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
          회원가입
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-body-sm)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--gap-xs)',
          }}
        >
          계정을 만들고 시작하세요.
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
            이름
          </label>
          <Input
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => markTouched('name')}
            error={nameError}
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
            placeholder="8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => markTouched('password')}
            error={passwordError}
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
            비밀번호 확인
          </label>
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => markTouched('confirm')}
            error={confirmError}
          />
        </div>

        <Checkbox
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          label="이용약관 및 개인정보 처리방침에 동의합니다"
        />

        <Button variant="emphasis" style={{ width: '100%' }}>
          가입하기
        </Button>

        <Divider />

        <Button variant="secondary" style={{ width: '100%' }}>
          Google로 계속하기
        </Button>
      </div>
    </AuthTemplate>
  );
}
