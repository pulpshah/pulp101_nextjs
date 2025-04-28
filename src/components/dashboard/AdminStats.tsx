// ============================================
// File Purpose: AdminStats component for displaying deliverables submission statistics
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

'use client';

import { useEffect, useState } from 'react';

interface Stats {
  ndaSubmitted: number;
  icaSubmitted: number;
  resumeSubmitted: number;
  totalStudents: number;
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    ndaSubmitted: 0,
    icaSubmitted: 0,
    resumeSubmitted: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/students');
        const data = await res.json();
        const students = data.students || [];

        const ndaSubmitted = students.filter((s: any) => s.ndaFileUrl).length;
        const icaSubmitted = students.filter((s: any) => s.icaFileUrl).length;
        const resumeSubmitted = students.filter((s: any) => s.resumeFileUrl).length;

        setStats({
          ndaSubmitted,
          icaSubmitted,
          resumeSubmitted,
          totalStudents: students.length,
        });
      } catch (error) {
        console.error('Failed to load admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md text-center">
        <h3 className="text-purple-400 font-bold mb-2">NDA Submissions</h3>
        <p className="text-white text-2xl font-bold">
          {stats.ndaSubmitted} / {stats.totalStudents}
        </p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md text-center">
        <h3 className="text-purple-400 font-bold mb-2">ICA Submissions</h3>
        <p className="text-white text-2xl font-bold">
          {stats.icaSubmitted} / {stats.totalStudents}
        </p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md text-center">
        <h3 className="text-purple-400 font-bold mb-2">Resume Submissions</h3>
        <p className="text-white text-2xl font-bold">
          {stats.resumeSubmitted} / {stats.totalStudents}
        </p>
      </div>
    </div>
  );
}
