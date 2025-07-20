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

export default function VolumeBar({ data = [] }: Props): JSX.Element {
  const fmt = (v: number) => `${v.toLocaleString('fa-IR')} `;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="t" hide />
        <YAxis
          width={60}
          tickFormatter={fmt}
          stroke="var(--text-muted)"
        />
        <Tooltip
          cursor={false}
          contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          formatter={(v: number) => fmt(v)}
          labelFormatter={() => ''}
        />
        <Bar dataKey="vol" fill="var(--chart-volume)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
