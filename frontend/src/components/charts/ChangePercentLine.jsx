import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
  import { uiColors } from '../../theme';
  
  const LINE_COLOR = uiColors.accent ?? '#8b5cf6';

  const PAD_Y = 0.002; 
  
  export default function ChangePercentLine({ data = [] }) {
    const series = data.map((d) => ({
      ...d,
      pct:
        d.price && typeof d.last === 'number'
          ? (d.last - d.price) / d.price
          : 0,
    }));
  
    if (series.length < 2) return <div className="h-[220px]" />;
  
    const vals = series.map((s) => s.pct);
    const min  = Math.min(...vals);
    const max  = Math.max(...vals);
    const domain =
      Math.abs(max - min) < 1e-6
        ? [min - PAD_Y, max + PAD_Y]
        : ['auto', 'auto'];
  
    return (
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={series}>
          <XAxis dataKey="t" hide />
          <YAxis
            domain={domain}
            tickFormatter={(v) => `${(v * 100).toFixed(1)}%`}
            width={36}
          />
          <Tooltip
            contentStyle={{
              background: uiColors.cardBg,
              border: 'none',
              color: uiColors.text,
            }}
            formatter={(v) => `${(v * 100).toFixed(2)}%`}
            labelFormatter={(ts) =>
              new Intl.DateTimeFormat('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(ts)
            }
          />
  
          <Line
            type="monotone"
            dataKey="pct"
            stroke={LINE_COLOR}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  