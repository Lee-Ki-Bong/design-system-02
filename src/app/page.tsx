export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
          Whitebong UI
        </h1>
        <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          토큰 적용 확인
        </p>
        <button
          className="mt-4 rounded-full px-6 py-2 font-medium"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-emphasis)',
          }}
        >
          Primary Button
        </button>
      </div>
    </div>
  );
}
