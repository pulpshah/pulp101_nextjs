// ============================================
// File Purpose: Dashboard page that displays user profile summary,
//              task statistics and task table for onboarding tracking.
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/19/2025
// This update:   Mohammed Ihtisham — wired up to Neo4j
// ============================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import neo4j from 'neo4j-driver';

import { ProfileSummaryCard } from '@/components/dashboard/ProfileSummaryCard';
import { TaskStatCard }       from '@/components/dashboard/TaskStatCard';
import { TaskTable }          from '@/components/dashboard/TaskTable';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // 1) initialize Neo4j driver
  const driver = neo4j.driver(
    process.env.NEO4J_URI!, 
    neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
  );
  const dbSession = driver.session();

  // 2) fetch all tasks + this user’s status on each
  const result = await dbSession.run(
    `
    MATCH (t:Task)
    OPTIONAL MATCH (u:User {email: $email})-[r:HAS_TASK]->(t)
    RETURN
      t.name        AS name,
      t.description AS description,
      t.deadline    AS deadline,
      coalesce(r.status, 'Not Started') AS status
    ORDER BY t.deadline
    `,
    { email: user?.email }
  );
  await dbSession.close();
  await driver.close();

  // 3) map records into a plain array
  const tasks = result.records.map((rec) => ({
    name:        rec.get('name'),
    description: rec.get('description'),
    deadline:    rec.get('deadline').toString(),  // neo4j Date → "YYYY-MM-DD"
    status:      rec.get('status'),
  }));

  // 4) compute each stat count
  const incompleteCount = tasks.filter(t => t.status === 'Not Started').length;
  const pendingCount    = tasks.filter(t => t.status === 'In Progress').length;
  const completeCount   = tasks.filter(t => t.status === 'Completed').length;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 space-y-12">
      {/* Welcome Text */}
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
          <TaskStatCard title="Pending Tasks"    count={pendingCount}    color="yellow" />
          <TaskStatCard title="Completed Tasks"  count={completeCount}   color="green" />
        </div>
      </div>

      {/* Task Table */}
      <TaskTable tasks={tasks} />
    </main>
  );
}
