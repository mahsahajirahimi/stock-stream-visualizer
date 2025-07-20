export const MAX_POINTS = 30 as const;

export const faNumber = (v: number) =>
    v.toLocaleString('fa-IR');               
  
  export const faPercent = (v: number) =>
    (v * 100).toFixed(1).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]) + '٪';
  