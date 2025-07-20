import { ReactNode, JSX } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function ChartCard({ title, children }: Props): JSX.Element {
  return (
    <div className="rounded-xl shadow-lg p-4 bg-(--card-bg) text-(--text-main)">
      <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
      {children}
    </div>
  );
}
