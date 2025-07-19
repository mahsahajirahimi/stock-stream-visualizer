import { uiColors } from '../theme';

export default function ChartCard({ title, children }) {
  return (
    <div
      className="w-full h-full rounded-2xl shadow-lg flex flex-col"
      style={{
        background: uiColors.cardBg,         
        boxShadow: `0 8px 20px ${uiColors.cardShadow}`,
      }}
    >
      <h2 className="font-semibold mb-2 px-5 pt-5">{title}</h2>
      <div className="flex-1 px-5 pb-5 bg-transparent">{children}</div>
    </div>
  );
}
