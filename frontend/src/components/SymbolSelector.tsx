import { useState, useRef, useEffect, type JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  symbols: string[];
  value: string;
  onChange: (symbol: string) => void;
  className?: string;
}

export default function SymbolSelector({
  symbols,
  value,
  onChange,
  className = '',
}: Props): JSX.Element {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (
        e instanceof MouseEvent &&
        wrapRef.current &&
        !wrapRef.current.contains(e.target as Node)
      )
        setOpen(false);
      if (e instanceof KeyboardEvent && e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('click', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', close);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center justify-between gap-2
          px-3 py-[6px] rounded-md text-sm
          border border-(--border) bg-(--card-bg) text-(--text-main)
          hover:bg-(--dd-hover) transition-colors
          ${className}
        `}
      >
        {value || t('selectSymbol')}
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
        <ul
          role="listbox"
          className={`
            absolute z-50 mt-1 w-full max-h-48 overflow-auto rounded-md
            bg-(--dd-bg) shadow-lg border border-(--border)
          `}
        >
          {symbols.map((s) => {
            const isSelected = s === value;
            return (
              <li key={s}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                  className={`
                    w-full text-right px-3 py-2 text-sm transition-colors
                    ${
                      isSelected
                        ? 'bg-(--opt-selected) text-(--text-main) dark:text-white'
                        : 'text-(--text-main) hover:bg-(--opt-hover)'
                    }
                  `}
                >
                  {s}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}