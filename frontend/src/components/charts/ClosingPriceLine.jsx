import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { theme } from '../../theme';         

export default function ClosingPriceLine({ data = [] }) {
  const {border, cardBg, text } = theme.colors;  

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <XAxis dataKey="t" hide />
        <YAxis
          width={40}
          stroke={border}
          tick={{ fill: border }}
        />
        <Tooltip
          cursor={false} 
          contentStyle={{ background: cardBg, border: 'none', color: text }}
        />
        <Line
          dataKey="price"
          stroke="var(--chart-change)"
          strokeWidth={3}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
