import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
  } from 'recharts';
import { chartColors } from '../../theme';
  
  export default function VolPercentBar({ data }) {
    if (!data.length) return null;
  
    return (
      <div className="bg-transparent p-4 rounded shadow">
        <h2 className="font-semibold mb-2">درصد پُر شدن حجم مبنا</h2>
  
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <XAxis dataKey="t" hide />
            <YAxis
              width={60}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(v) => `${v}%`}
              labelFormatter={() => ''}
            />
            <Bar 
            dataKey="volPct" 
            fill={chartColors.volPercent}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  