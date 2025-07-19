export const theme = {
    get colors() {
      const css = getComputedStyle(document.documentElement);
      const pick = (v) => css.getPropertyValue(v).trim();
      return {
        primary:   pick('--primary'),
        secondary: pick('--secondary'),
        text:      pick('--text-main'),
        muted:     pick('--text-muted'),
        cardBg:    pick('--card-bg'),
        border:    pick('--border'),
        chartA:    pick('--chart-a'),
        chartB:    pick('--chart-b'),
        chartC:    pick('--chart-c'),
      };
    },
  };
  