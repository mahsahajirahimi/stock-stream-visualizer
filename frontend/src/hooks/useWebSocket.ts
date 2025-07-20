import { useEffect, useState, useRef, } from 'react';
import { toast } from 'react-toastify';
import { parseMessage } from '@/utils/parseMessage';

const MAX_POINTS = 30;

export interface DataPoint {
  t: number;
  price: number;
  last: number;
  vol: number;
  volPct: number;
  change: number;
}

export type History = Record<string, DataPoint[]>;

export function useWebSocket(url: string): { history: History; isConnected: boolean } {
  const [history, setHistory] = useState<History>({});
  const [isConnected, setConn] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConn(true);
      toast.dismiss('ws-error');
    };

    const handleDisconnect = () => {
      setConn(false);
      toast.error('اتصال وب‌سوکت قطع شد', { toastId: 'ws-error' });
    };

    ws.onclose = handleDisconnect;
    ws.onerror = handleDisconnect;

    ws.onmessage = (e: MessageEvent<string>) => {
      const parsed = parseMessage(e.data) as Array<{
        symbol: string;
        closingPrice: number;
        lastPrice: number;
        volume: number;
        volumePercent: number;
        closingChange: number;
      }>;

      const now = Date.now();

      setHistory(prev => {
        const copy: History = { ...prev };

        parsed.forEach(d => {
          const series: DataPoint[] = copy[d.symbol] ? [...copy[d.symbol]] : [];

          series.push({
            t: now,
            price: d.closingPrice,
            last: d.lastPrice,
            vol: d.volume,
            volPct: d.volumePercent,
            change: d.closingChange,
          });

          if (series.length > MAX_POINTS) series.shift();
          copy[d.symbol] = series;
        });

        return copy;
      });
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { history, isConnected };
}
