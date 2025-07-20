import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { JSX } from 'react';
import type { DataPoint } from '@/types';

interface Props { data?: DataPoint[] }

export default function VolPercentBar({ data = [] }: Props): JSX.Element {
  const pct = (v: number) => `${v.toLocaleString('fa-IR')}٪`;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="t" hide />
        <YAxis
          width={60}
          tickFormatter={pct}
          stroke="var(--text-muted)"
        />
        <Tooltip
          cursor={false}
          contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          formatter={(v: number) => pct(v)}
          labelFormatter={() => ''}
        />
        <Bar dataKey="volPct" fill="var(--chart-volpct)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
