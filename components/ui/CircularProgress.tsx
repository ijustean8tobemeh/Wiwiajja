import React from 'react';

interface CircularProgressProps {
  percent: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percent, 
  color = "#4f46e5", 
  size = 52, 
  strokeWidth = 3,
  showText = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showText && (
        <span className="absolute text-[10px] font-bold text-slate-200">
          {Math.round(percent)}%
        </span>
      )}
    </div>
  );
};