import { useState, useRef, useEffect } from 'react';

export default function SymbolSelector({ symbols, value, onChange, className='' }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center justify-between gap-2
          px-3 py-[6px] rounded-md
          bg-gray-700 text-gray-100 text-sm
          hover:bg-gray-600
          ${className}
        `}
      >
        {value || 'انتخاب نماد'}
        <svg
          className={`w-3 h-3 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
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
          className="
            absolute left-0 right-0 mt-1 max-h-60 overflow-auto
            rounded-md bg-gray-800 shadow-lg p-1
            ring-1 ring-black/30 backdrop-blur-sm
            z-50
          "
        >
          {symbols.map((s) => (
            <li key={s}>
              <button
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className={`
                  w-full text-right px-3 py-2 rounded
                  text-sm
                  ${
                    s === value
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-100 hover:bg-gray-700'
                  }`}
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
