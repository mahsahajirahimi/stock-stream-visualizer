import { useState, useEffect } from 'react';
import { useWebSocket }       from './hooks/useWebSocket';

import SymbolSelector        from './components/SymbolSelector';
import ClosingPriceLine      from './components/charts/ClosingPriceLine';
import ChangePercentLine     from './components/charts/ChangePercentLine';
import VolumeBar             from './components/charts/VolumeBar';
import VolPercentBar         from './components/charts/VolPercentBar';

export default function App() {

  const { history: wsHistory, isConnected } = useWebSocket('ws://localhost:8080');

  const symbols = Object.keys(wsHistory);
  const [symbol, setSymbol] = useState(symbols[0] || '');

  useEffect(() => {
    if (!symbol && symbols.length) setSymbol(symbols[0]);
    else if (symbol && !symbols.includes(symbol) && symbols.length)
      setSymbol(symbols[0]);
  }, [symbols, symbol]);

  const data = wsHistory[symbol] || [];

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <header className="flex items-center flex-wrap gap-4">
        <h1 className="text-xl font-bold">📡 داشبورد قیمت زنده</h1>

        <SymbolSelector symbols={symbols} value={symbol} onChange={setSymbol} />

        <span className="text-sm">
          وضعیت اتصال:&nbsp;
          {isConnected ? (
            <span className="text-green-600 font-semibold">✅ وصل</span>
          ) : (
            <span className="text-red-600 font-semibold">❌ قطع</span>
          )}
        </span>
      </header>

      <ClosingPriceLine data={data} />

      <ChangePercentLine data={data} />

      <VolumeBar data={data} />

      <VolPercentBar data={data} />
    </div>
  );
}
