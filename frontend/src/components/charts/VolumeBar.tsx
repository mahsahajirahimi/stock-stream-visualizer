import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { JSX } from 'react';
import { DataPoint } from '@/types';

interface Props {
  data?: DataPoint[];
}

export default function VolumeBar({ data = [] }: Props): JSX.Element {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="t" hide />
        <YAxis width={40} stroke="var(--text-muted)" />
        <Tooltip
          cursor={false}
          contentStyle={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
          }}
        />
        <Bar dataKey="vol" fill="var(--chart-volume)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
