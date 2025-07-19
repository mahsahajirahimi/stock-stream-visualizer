import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function VolumeBar({ data = [] }) {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="t" hide />
          <YAxis width={40} stroke="var(--text-muted)" />
          <Tooltip cursor={false} contentStyle={{ background:"var(--card-bg)", border:"1px solid var(--border)" }}/>
          <Bar dataKey="vol" fill="var(--chart-volume)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  