// ============================================
// File Purpose: Student dashboard view with profile, task stats, and task table
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

'use client';

import { ProfileSummaryCard } from './ProfileSummaryCard';
import { TaskStatCard } from './TaskStatCard';
import { TaskTable, Task } from './TaskTable';

interface StudentDashboardProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  tasks: Task[];
}

export function StudentDashboard({ user, tasks }: StudentDashboardProps) {
  if (!tasks) return <div className="text-center p-12">Loading tasks...</div>;

  const incompleteCount = tasks.filter((t) => t.status === 'Not Started').length;
  const pendingCount = tasks.filter((t) => t.status === 'In Progress').length;
  const completeCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 space-y-12">
      {/* Welcome text */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome, {user?.name?.split(' ')[0] ?? 'Guest'} 👋
        </h1>
        <p className="text-gray-400 text-md">
          Glad to have you back on your onboarding journey.
        </p>
      </div>

      {/* Profile and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* Profile */}
        <div className="lg:col-span-1">
          <ProfileSummaryCard
            name={user?.name ?? 'Guest'}
            role="Software Engineer Intern"
            location="Boston, MA"
            startDate="Joined on 3rd June 2024"
            image={user?.image ?? ''}
          />
        </div>

        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskStatCard title="Incomplete Tasks" count={incompleteCount} color="red" />
          <TaskStatCard title="Pending Tasks" count={pendingCount} color="yellow" />
          <TaskStatCard title="Completed Tasks" count={completeCount} color="green" />
        </div>
      </div>

      {/* Task Table */}
      <TaskTable tasks={tasks} />
    </main>
  );
}
