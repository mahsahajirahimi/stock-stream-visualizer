import { ReactNode, JSX } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function ChartCard({ title, children }: Props): JSX.Element {
  return (
    <div className="rounded-xl shadow-lg p-4 bg-[var(--card-bg)] text-[var(--text-main)]">
      <div className="flex justify-center items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
