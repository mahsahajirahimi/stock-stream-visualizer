import { useState, useRef, useEffect, JSX } from 'react';

interface Props {
  symbols: string[];
  value: string;
  onChange: (symbol: string) => void;
  className?: string;
}

export default function SymbolSelector({ symbols, value, onChange, className = '' }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between gap-2 px-3 py-[6px] rounded-md text-sm symbol-button ${className}`}
      >
        {value || 'انتخاب نماد'}
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="symbol-dropdown">
          {symbols.map((s) => (
            <li key={s}>
              <button
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className={`w-full text-right px-3 py-2 rounded text-sm ${s === value ? 'symbol-active' : 'symbol-option'}`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
