// ============================================
// File Purpose: TaskStatCard component to visually display task
// statistics (overdue, pending, completed) with animation and icon.
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/19/2025
// ============================================

'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const icons = {
  red: { icon: <AlertCircle className="w-5 h-5 text-red-500" />, bg: "bg-red-900/20" },
  yellow: { icon: <Clock className="w-5 h-5 text-yellow-400" />, bg: "bg-yellow-900/20" },
  green: { icon: <CheckCircle className="w-5 h-5 text-green-400" />, bg: "bg-green-900/20" },
};

export function TaskStatCard({
  title,
  count,
  color,
}: {
  title: string;
  count: number;
  color: 'red' | 'yellow' | 'green';
}) {
  const { icon, bg } = icons[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-sm hover:shadow-md flex flex-col justify-between h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-full p-2 ${bg}`}>
          {icon}
        </div>
        <h3 className="text-md font-semibold text-white">{title}</h3>
      </div>

      {/* Count */}
      <p className="text-5xl font-extrabold text-white tracking-tight mb-4">{count}</p>

      {/* View All Button */}
      <div className="mt-auto text-right">
        <Link
          href="/tasks"
          className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition"
        >
          View All →
        </Link>
      </div>
    </motion.div>
  );
}


