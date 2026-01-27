'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { MOOD_EMOJIS } from '@/lib/defaults';

interface MoodChartProps {
  data: { date: string; score: number }[];
}

export function MoodChart({ data }: MoodChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    dateFormatted: format(parseISO(d.date), 'MMM d'),
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="dateFormatted"
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[1, 5]}
          ticks={[1, 2, 3, 4, 5]}
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => MOOD_EMOJIS[value - 1] || ''}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-popover border border-border rounded-lg p-2 shadow-lg">
                  <p className="text-sm font-medium">{data.dateFormatted}</p>
                  <p className="text-lg">{MOOD_EMOJIS[data.score - 1]}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ fill: '#8b5cf6', strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6, fill: '#8b5cf6' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
