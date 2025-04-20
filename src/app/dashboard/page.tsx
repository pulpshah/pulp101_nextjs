// ============================================
// File Purpose: Dashboard page that displays user profile summary, task statistics, and task table for onboarding tracking.
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/19/2025
// ============================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfileSummaryCard } from "@/components/dashboard/ProfileSummaryCard";
import { TaskStatCard } from "@/components/dashboard/TaskStatCard";
import { TaskTable } from "@/components/dashboard/TaskTable";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 space-y-12">
      {/* Welcome Text */}
      <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Welcome, {user?.name?.split(" ")[0] ?? "Guest"} 👋
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
            name={user?.name ?? "Guest"}
            role="Software Engineer Intern"
            location="Boston, MA"
            startDate="Joined on 3rd June 2024"
            image={user?.image ?? ""}
          />
        </div>

        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskStatCard title="Incomplete Tasks" count={2} color="red" />
          <TaskStatCard title="Pending Tasks" count={10} color="yellow" />
          <TaskStatCard title="Completed Tasks" count={5} color="green" />
        </div>
      </div>

      {/* Task Table */}
      <TaskTable />
    </main>
  );
}
