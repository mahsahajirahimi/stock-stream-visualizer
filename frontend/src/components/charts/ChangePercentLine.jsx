import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { theme } from '../../theme';

export default function ChangePercentLine({ data = [] }) {
  const {border, cardBg, text } = theme.colors;

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
          tickFormatter={(v) => (v * 100).toFixed(1) + '%'}
          width={40}
          stroke={border}
          tick={{ fill: border }}
        />
        <Tooltip
          cursor={false} 
          contentStyle={{ background: cardBg, border: 'none', color: text }}
          formatter={(v) => (v * 100).toFixed(2) + '%'}
        />

        <Line dataKey="pct" stroke="var(--chart-price)" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
