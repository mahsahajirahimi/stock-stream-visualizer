import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { chartColors } from '../../theme';

export default function ClosingPriceLine({ data }) {
  if (!data.length) return null;

  return (
    <div className="bg-transparent p-4 rounded shadow">
      <h2 className="font-semibold mb-2">قیمت پایانی (آخرین ۳۰ نقطه)</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis
            dataKey="t"
            hide
          />
          <YAxis
            domain={['auto', 'auto']}
            width={60}
          />
          <Tooltip
            labelFormatter={() => ''}
            formatter={(v) => v.toLocaleString()}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={chartColors.closingPrice}
            strokeWidth={3.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
