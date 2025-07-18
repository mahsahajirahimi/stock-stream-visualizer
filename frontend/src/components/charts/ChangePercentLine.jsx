import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
  } from 'recharts';
  
  export default function ChangePercentLine({ data }) {
    if (!data.length) return null;
  
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">درصد تغییر قیمت پایانی</h2>
  
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <XAxis dataKey="t" hide />
            <YAxis
              domain={['auto', 'auto']}
              width={60}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(v) => `${v}%`}
              labelFormatter={() => ''}
            />
            <Line
              type="monotone"
              dataKey="change"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  