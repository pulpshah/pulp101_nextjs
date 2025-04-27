// ============================================
// File Purpose: AdminDashboard page showing student stats and deliverables
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

'use client';

import { ProfileSummaryCard } from './ProfileSummaryCard';
import { AdminStats } from './AdminStats';
import { AdminStudentTable } from './AdminStudentTable';

interface User {
  name: string;
  email: string;
  ndaFileUrl: string | null;
  resumeFileUrl: string | null;
  icaFileUrl: string | null;
}

interface AdminDashboardProps {
  users: User[];
}

export function AdminDashboard({ users }: AdminDashboardProps) {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 space-y-12">
      {/* Welcome text */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Dashboard 👩‍💻</h1>
        <p className="text-gray-400 text-md">
          View student onboarding deliverables and documents.
        </p>
      </div>

      {/* Profile + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        <div className="lg:col-span-1">
          <ProfileSummaryCard
            name="Admin User"
            role="Admin"
            location="Pulp Internet HQ"
            startDate="Admin Access"
            image="/admin-profile.png"
          />
        </div>
        <div className="lg:col-span-3">
          <AdminStats users={users} />
        </div>
      </div>

      {/* Student Table */}
      <AdminStudentTable users={users} />
    </main>
  );
}
