import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { theme } from '@/theme';
import { JSX } from 'react';
import { DataPoint } from '@/types';

interface Props {
  data?: DataPoint[];
}

export default function ChangePercentLine({ data = [] }: Props): JSX.Element {
  const { border, cardBg, text } = (theme.colors as any);

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
          tickFormatter={(v: number) => (v * 100).toFixed(1) + '%'}
          width={40}
          stroke={border}
          tick={{ fill: border }}
        />
        <Tooltip
          cursor={false}
          contentStyle={{
            background: cardBg,
            border: 'none',
            color: text,
          }}
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
