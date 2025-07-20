import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { JSX } from 'react';
import type { DataPoint } from '@/types';

interface Props { data?: DataPoint[] }

export default function ChangePercentLine({ data = [] }: Props): JSX.Element {
  const series = data;
  const fmt = (v: number) => v.toLocaleString('fa-IR');

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={series}>
        <XAxis dataKey="t" hide />

        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={fmt}
          width={60}
          stroke="var(--border)"
          tick={{ fill: 'var(--border)', fontSize: 15 }}
        />

        <Tooltip
          cursor={false}
          contentStyle={{ background: 'var(--card-bg)', border: 'none', color: 'var(--text-main)' }}
          formatter={(v: number) => fmt(v)}
          labelFormatter={() => ''}
        />

        <Line
          dataKey="last"
          stroke="var(--chart-price)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
