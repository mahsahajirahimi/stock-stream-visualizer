import { useEffect, useState, useRef } from 'react';
import { parseMessage } from '../utils/parseMessage';

const MAX_POINTS = 30;

export function useWebSocket(url) {
  const [history, setHistory]   = useState({});
  const [isConnected, setConn]  = useState(false);

  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen  = () => setConn(true);
    ws.onclose = () => setConn(false);
    ws.onerror = () => setConn(false);

    ws.onmessage = (e) => {
      const parsed = parseMessage(e.data);
      const now    = Date.now();

      setHistory((prev) => {
        const copy = { ...prev };

        parsed.forEach((d) => {
          const series = copy[d.symbol] ? [...copy[d.symbol]] : [];

          series.push({
            t: now,
            price  : d.closingPrice,
            last   : d.lastPrice,
            vol    : d.volume,
            volPct : d.volumePercent,
            change : d.closingChange,
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
