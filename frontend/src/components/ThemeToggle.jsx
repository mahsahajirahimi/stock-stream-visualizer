import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const speed = 'duration-600 ease-in-out';

  return (
    <button
      aria-label="toggle theme"
      onClick={() => setDark(!dark)}
      className="relative w-12 h-6 flex-shrink-0 select-none"
    >
      <span
        className={`
          absolute inset-0 rounded-full transition-colors ${speed}
          ${dark ? 'bg-indigo-600/70' : 'bg-amber-400/70'}
        `}
      />

      <span
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow
          transition-transform ${speed}
          ${dark ? 'translate-x-6' : 'translate-x-0'}
        `}
      />

      <span
        className={`
          absolute top-0.5 w-5 h-5 flex items-center justify-center text-[13px]
          pointer-events-none leading-none
          transition-transform ${speed}
          ${dark ? 'left-0.5' : 'right-0.5'}
        `}
      >
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
