function getRandomPercent() {
    const percent = (Math.random() * 4).toFixed(2);
    const isPositive = Math.random() > 0.3;
    let icon = "🟢";
    if (!isPositive && percent > 1) icon = "🔴";
    else if (!isPositive) icon = "🟠";
    else if (percent < 1) icon = "🟡";
    return `${icon}${isPositive ? percent + "%+" : percent + "%-"}`;
  }
  
  const symbols = [
    "شپنا", "شبندر", "شتران", "شنفت", "شسپا",
    "شبهرن", "ونفت", "شاوان", "شراز", "شپاس",
    "شزنگ", "شرانل", "شرمان", "شزنگح"
  ];
  
  function generateMockMessage() {
    const date = "📆 یکشنبه، 22 تیر 1404";
    const header = "‏📊ربات دیدبانی تریدبین\n" + date + "\n\n‏نماد\nقیمت پایانی | آخرین قیمت\nحجم | درصد پر شدن حجم مبنا\n";
  
    const body = symbols.map(symbol => {
      if (symbol === "شرانل" || symbol === "شرمان" || symbol === "شزنگح") {
        return `‏📈 ${symbol} | بسته ⛔`;
      }
  
      const price1 = Math.floor(Math.random() * 20000 + 1000);
      const price2 = price1 + Math.floor(Math.random() * 200 - 100);
      const vol = (Math.random() * 200).toFixed(2);
      const percent1 = getRandomPercent();
      const percent2 = getRandomPercent();
      const mabna = Math.random() > 0.8 ? `%${Math.floor(Math.random() * 100)}` : `%100`;
  
      return `\n📈 ${symbol} \n‏💵 ${price1} (${percent1}) | ${price2} (${percent2}) \n📊 ${vol} م |  ${mabna} | کدال`;
    }).join("\n");
  
    const footer = "\n\n🌐 Tradebin.ir\n🆔 @Tradebin_ir";
  
    return header + body + footer;
  }
  
  module.exports = { generateMockMessage };
  