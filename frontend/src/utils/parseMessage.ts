export interface ParsedMessage {
  symbol: string;
  closingPrice: number;
  closingChange: number;
  lastPrice: number;
  lastChange: number;
  volume: number | null;
  volumePercent: number | null;
}

export function parseMessage(text: string): ParsedMessage[] {
  const cleaned = text.replace(/\u200f/g, '');

  const segments = cleaned.split('📈').slice(1);
  const result: ParsedMessage[] = [];

  for (const seg of segments) {
    const lines = seg.trim().split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;

    const symbol = lines[0];
    if (symbol.includes('بسته ⛔')) continue;

    const priceLine = lines.find((l) => l.includes('💵'));
    if (!priceLine) continue;

    const priceRe = /💵\s*(\d+)\s*\([^0-9]*([\d.]+)%[+-]?\)\s*\|\s*(\d+)\s*\([^0-9]*([\d.]+)%[+-]?\)/;
    const m = priceLine.match(priceRe);
    if (!m) continue;

    const [, closingPriceStr, closingChStr, lastPriceStr, lastChStr] = m;
    const closingPrice = Number(closingPriceStr);
    const closingChange = Number(closingChStr);
    const lastPrice = Number(lastPriceStr);
    const lastChange = Number(lastChStr);

    const volLine = lines.find((l) => l.startsWith('📊'));
    let volume: number | null = null;
    let volPct: number | null = null;

    if (volLine) {
      const vm = volLine.match(/📊\s*([\d.]+)\s*م\s*\|\s*%?(\d+)/);
      if (vm) {
        volume = Number(vm[1]);
        volPct = Number(vm[2]);
      }
    }

    result.push({
      symbol,
      closingPrice,
      closingChange,
      lastPrice,
      lastChange,
      volume,
      volumePercent: volPct,
    });
  }

  return result;
}
