'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressCircleProps {
  label: string;
  percent: number;
}

const ProgressCircle = ({ label, percent }: ProgressCircleProps) => {
  const radius = 18;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const progress = circumference - (percent / 100) * circumference;
      setTimeout(() => {
        setOffset(progress);
        setHasAnimated(true);
      }, 300);
    }
  }, [circumference, percent, hasAnimated]);

  return (
    <div className="flex flex-col items-center">
      <svg className="w-16 h-16" viewBox="0 0 40 40">
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth={stroke}
        />

        {/* Animated circle */}
        <motion.circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#f97316"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />

        {/* Centered Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-white text-[8px] font-semibold"
        >
          {percent}%
        </text>
      </svg>
      <p className="text-xs text-white mt-2 font-medium">{label}</p>
    </div>
  );
};

export default ProgressCircle;
