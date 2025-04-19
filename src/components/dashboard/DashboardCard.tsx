'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Loader, Calendar } from 'lucide-react';

const statusIcon = {
  Complete: <CheckCircle className="text-green-400" />,
  Pending: <Clock className="text-yellow-400" />,
  "In Progress": <Loader className="text-blue-400 animate-spin" />,
  Scheduled: <Calendar className="text-purple-400" />,
  Upcoming: <Clock className="text-cyan-400" />,
};

export function DashboardCard({
  title,
  status,
}: {
  title: string;
  status: keyof typeof statusIcon;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 rounded-2xl p-5 border border-gray-700 shadow-md"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {statusIcon[status]}
      </div>
      <p className="text-sm text-gray-400 mt-2">Status: {status}</p>
    </motion.div>
  );
}
