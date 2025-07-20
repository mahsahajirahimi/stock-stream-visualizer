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
import { faPercent } from '@/constants';   

interface Props { data?: DataPoint[] }

export default function ChangePercentLine({ data = [] }: Props): JSX.Element {
  const series = data.map((d) => ({
    ...d,
    pct: d.price ? (d.last - d.price) / d.price : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={series}>
        <XAxis dataKey="t" hide />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={faPercent}
          width={60}
          stroke="var(--border)"
          tick={{ fill: 'var(--border)', fontSize: 15 }}
        />

        <Tooltip
          cursor={false}
          contentStyle={{ background: 'var(--card-bg)', border: 'none', color: 'var(--text-main)' }}
          formatter={(v: number) => faPercent(v)}
          
        />

        <Line
          dataKey="pct"
          stroke="var(--chart-price)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
