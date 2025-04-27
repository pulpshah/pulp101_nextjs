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
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const adminName = session?.user?.name || 'Admin User';
  const adminEmail = session?.user?.email || 'admin@pulp101.com';
  const adminImage = session?.user?.image || '/admin-profile.png';

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
            name={adminName}
            role={adminEmail}
            location="Pulp Internet HQ"
            startDate="Admin Access"
            image={adminImage}
          />
        </div>
        <div className="lg:col-span-3">
          <AdminStats />
        </div>
      </div>

      {/* Student Table */}
      <AdminStudentTable users={users} />
    </main>
  );
}
