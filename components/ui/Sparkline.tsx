
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, color = "#818cf8" }) => {
  // Ensure we always have at least some data to render to avoid crashes
  // If data is empty, provide a zero-filled array
  const chartData = data.length > 0 
    ? data.map((v, i) => ({ i, v })) 
    : Array(7).fill(0).map((_, i) => ({ i, v: 0 }));

  return (
    <div className="h-24 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`colorV-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip 
            cursor={false}
            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 8px', fontSize: '10px' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [value, 'Score']}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey="v" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#colorV-${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
