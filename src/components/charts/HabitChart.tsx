'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface HabitChartProps {
  data: { date: string; completed: number; total: number }[];
}

export function HabitChart({ data }: HabitChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    dateFormatted: format(parseISO(d.date), 'EEE'),
    percentage: d.total > 0 ? Math.round((d.completed / d.total) * 100) : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="dateFormatted"
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 100]}
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-popover border border-border rounded-lg p-2 shadow-lg">
                  <p className="text-sm font-medium">{data.dateFormatted}</p>
                  <p className="text-sm text-emerald-400">
                    {data.completed}/{data.total} habits ({data.percentage}%)
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="percentage"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
