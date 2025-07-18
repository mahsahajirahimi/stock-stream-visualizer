export function parseMessage(text) {

    const cleaned = text.replace(/\u200f/g, '');
  
    const segments = cleaned.split('📈').slice(1); 
    const result   = [];
  
    for (const seg of segments) {
      const lines = seg.trim().split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) continue;
  
      const symbol = lines[0];                      
      if (symbol.includes('بسته ⛔')) continue;      
  
      const priceLine = lines.find((l) => l.includes('💵'));
      if (!priceLine) continue;

      const priceRe =
        /💵\s*(\d+)\s*\([^0-9]*([\d.]+)%[+-]?\)\s*\|\s*(\d+)\s*\([^0-9]*([\d.]+)%[+-]?\)/;
      const m = priceLine.match(priceRe);
      if (!m) continue;
  
      const [ , closingPrice, closingCh, lastPrice, lastCh ] = m.map((x, i) =>
        i === 0 ? x : Number(x)          
      );
  
      const volLine = lines.find((l) => l.startsWith('📊'));
      let volume = null, volPct = null;
      if (volLine) {
        const vm = volLine.match(/📊\s*([\d.]+)\s*م\s*\|\s*%?(\d+)/);
        if (vm) {
          volume  = Number(vm[1]);
          volPct  = Number(vm[2]);
        }
      }
  
      result.push({
        symbol,
        closingPrice,
        closingChange : closingCh,
        lastPrice,
        lastChange    : lastCh,
        volume,
        volumePercent : volPct,
      });
    }
  
    return result;
  }
  