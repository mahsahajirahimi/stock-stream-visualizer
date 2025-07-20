/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  // مسیر فایل‌های پروژه‌ات را کامل پوشش بده
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      /* فونت اصلی پروژه */
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      /* انیمیشن چراغ سبز وب‌سوکت */
      keyframes: {
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },

      /* رنگ‌های مبتنی بر متغیّرهای CSS */
      colors: {
        primary   : 'var(--primary)',
        secondary : 'var(--secondary)',
        text      : 'var(--text-main)',
        muted     : 'var(--text-muted)',
        card      : 'var(--card-bg)',
        border    : 'var(--border)',
        dd        : 'var(--dd-bg)',
        ddHover   : 'var(--dd-hover)',
        optHover  : 'var(--opt-hover)',
        optSel    : 'var(--opt-selected)',

        /* رنگ‌های نمودار */
        chartPrice : 'var(--chart-price)',
        chartChange: 'var(--chart-change)',
        chartVolume: 'var(--chart-volume)',
        chartVolpct: 'var(--chart-volpct)',
      },
    },
  },

  plugins: [],
};
