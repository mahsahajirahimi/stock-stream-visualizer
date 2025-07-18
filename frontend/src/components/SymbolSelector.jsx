export default function SymbolSelector({ symbols, value, onChange }) {
    if (!symbols.length) return null;
  
    return (
      <select
        className="border p-2 rounded bg-white shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {symbols.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    );
  }
  