import { useState, useEffect, type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { useWebSocket } from './hooks/useWebSocket';
import type { DataPoint } from './types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SymbolSelector from './components/SymbolSelector';
import ThemeToggle    from './components/ThemeToggle';

import ChartCard         from './components/ChartCard';
import ClosingPriceLine  from './components/charts/ClosingPriceLine';
import ChangePercentLine from './components/charts/ChangePercentLine';
import VolumeBar         from './components/charts/VolumeBar';
import VolPercentBar     from './components/charts/VolPercentBar';

interface UseWebSocketReturn {
  history: Record<string, DataPoint[]>;
  isConnected: boolean;
}

export default function App(): JSX.Element {
  const { t } = useTranslation();

  const { history: wsHistory, isConnected } =
    useWebSocket('ws://localhost:8080') as UseWebSocketReturn;

  const symbols = Object.keys(wsHistory);
  const [symbol, setSymbol] = useState<string>(symbols[0] ?? '');

  useEffect(() => {
    if (!symbol && symbols.length)         setSymbol(symbols[0]);
    else if (symbol && !symbols.includes(symbol) && symbols.length)
                                            setSymbol(symbols[0]);
  }, [symbols, symbol]);

  const data = wsHistory[symbol] ?? [];

  return (
    <>
      <header
        className="
          fixed inset-x-0 top-0 z-50
          flex items-center gap-3
          px-4 py-3 backdrop-blur
        "
        style={{ background: 'var(--header-bg)' }}
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
          <ChartCard title={t('chart.closingPrice')}>
            <ClosingPriceLine data={data} />
          </ChartCard>

          <ChartCard title={t('chart.changePercent')}>
            <ChangePercentLine data={data} />
          </ChartCard>

          <ChartCard title={t('chart.volume')}>
            <VolumeBar data={data} />
          </ChartCard>

          <ChartCard title={t('chart.volPercent')}>
            <VolPercentBar data={data} />
          </ChartCard>
        </div>
      </main>
      <ToastContainer />  
    </>
  );
}
