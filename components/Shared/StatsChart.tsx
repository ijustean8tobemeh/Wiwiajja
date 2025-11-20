
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, YAxis, CartesianGrid } from 'recharts';

interface StatsChartProps {
  data: { date: string; value: number }[];
  color?: string;
  height?: number;
}

export const StatsChart: React.FC<StatsChartProps> = ({ data, color = "#6366f1", height = 250 }) => {
  const chartData = data.length > 0 ? data : [
    {date: 'Mon', value: 0}, {date: 'Tue', value: 0}, 
    {date: 'Wed', value: 0}, {date: 'Thu', value: 0}, 
    {date: 'Fri', value: 0}, {date: 'Sat', value: 0}, {date: 'Sun', value: 0}
  ];

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,0.03)'}}
            contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          />
          <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={32}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
