// ============================================
// File Purpose: TaskStatCard component to visually display task
// statistics (overdue, pending, completed) with animation and icon.
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/19/2025
// ============================================

'use client';

import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";

const icons = {
  red: <AlertCircle className="text-red-400" />,
  yellow: <Clock className="text-yellow-400" />,
  green: <CheckCircle className="text-green-400" />,
};

export function TaskStatCard({
  title,
  count,
  color,
}: {
  title: string;
  count: number;
  color: "red" | "yellow" | "green";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 rounded-xl p-5 border border-gray-700 flex flex-col justify-center items-start"
    >
      <div className="flex items-center gap-3">
        {icons[color]}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </motion.div>
  );
}
