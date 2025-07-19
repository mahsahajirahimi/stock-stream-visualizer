import { useState, useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';

import SymbolSelector from './components/SymbolSelector';
import ThemeToggle    from './components/ThemeToggle';

import ChartCard         from './components/ChartCard';
import ClosingPriceLine  from './components/charts/ClosingPriceLine';
import ChangePercentLine from './components/charts/ChangePercentLine';
import VolumeBar         from './components/charts/VolumeBar';
import VolPercentBar     from './components/charts/VolPercentBar';

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
    <>
      <header
        className="
          fixed inset-x-0 top-0 z-50
          flex items-center gap-3
          px-4 py-3 backdrop-blur
          bg-[rgba(31,35,61,0.9)] dark:bg-[rgba(15,17,30,0.9)]
        "
        style={{ background: "var(--header-bg)" }}  
      >
      
        <span
          className={`
            w-3 h-3 rounded-full
            ${isConnected ? 'bg-green-600 animate-ping-slow' : 'bg-red-600'}
          `}
        />

        <ThemeToggle />

        <SymbolSelector
          symbols={symbols}
          value={symbol}
          onChange={setSymbol}
          className="flex-1 mr-auto"
        />
      </header>

      <main className="pt-20 p-6 space-y-6 min-h-screen">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <ChartCard title="قیمت پایانی">
            <ClosingPriceLine data={data} />
          </ChartCard>

          <ChartCard title="درصد تغییر قیمت">
            <ChangePercentLine data={data} />
          </ChartCard>

          <ChartCard title="حجم معاملات">
            <VolumeBar data={data} />
          </ChartCard>

          <ChartCard title="درصد حجم مبنا">
            <VolPercentBar data={data} />
          </ChartCard>
        </div>
      </main>
    </>
  );
}
