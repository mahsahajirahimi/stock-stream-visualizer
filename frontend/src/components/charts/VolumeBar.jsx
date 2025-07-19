import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
  } from 'recharts';
import { chartColors } from '../../theme'; 
  
  export default function VolumeBar({ data }) {
    if (!data.length) return null;
  
    return (
      <div className="bg-transparent p-4 rounded shadow">
        <h2 className="font-semibold mb-2">حجم معاملات (میلیون سهم)</h2>
  
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <XAxis dataKey="t" hide />
            <YAxis
              width={60}
              domain={['auto', 'auto']}
              tickFormatter={(v) => v.toLocaleString()}
            />
            <Tooltip
              formatter={(v) => `${v.toLocaleString()} م`}
              labelFormatter={() => ''}
            />
            <Bar 
            dataKey="vol" 
            fill={chartColors.volume}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  