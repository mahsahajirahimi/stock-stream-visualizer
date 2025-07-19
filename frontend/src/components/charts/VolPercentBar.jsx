import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function VolPercentBar({ data = [] }) {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="t" hide />
          <YAxis width={40} tickFormatter={(v)=>`${v}%`} stroke="var(--text-muted)"/>
          <Tooltip cursor={false} contentStyle={{ background:"var(--card-bg)", border:"1px solid var(--border)" }}/>
          <Bar dataKey="volPct" fill="var(--chart-volpct)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  