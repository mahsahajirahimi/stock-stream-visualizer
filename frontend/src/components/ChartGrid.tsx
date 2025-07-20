import { JSX, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ChartGrid({ children }: Props): JSX.Element {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      {children}
    </div>
  );
}
