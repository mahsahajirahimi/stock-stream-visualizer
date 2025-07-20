import { useEffect, useState, type JSX } from 'react';

export default function ThemeToggle(): JSX.Element {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      aria-label="toggle theme"
      onClick={() => setDark(!dark)}
      className="relative w-12 h-6 flex-shrink-0 select-none"
    >
      <span
        className={`
          absolute inset-0 rounded-full
          transition-colors duration-600 ease-in-out
          ${dark ? 'bg-indigo-600/70' : 'bg-amber-300/90'}
        `}
      />

      <span
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow
          transition-transform duration-600 ease-in-out
          ${dark ? 'translate-x-6' : ''}
        `}
      />

      <span
        className={`
          absolute top-0.5 w-5 h-5 flex items-center justify-center text-[13px]
          pointer-events-none leading-none
          transition-all duration-600 ease-in-out
          ${dark ? 'left-0.5' : 'right-0.5'}
        `}
      >
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
