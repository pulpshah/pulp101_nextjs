// ============================================
// File Purpose: Renders AdminDashboard or StudentDashboard based on user type
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import neo4j from 'neo4j-driver';

import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-center p-12">Unauthorized</div>;
  }

  const driver = neo4j.driver(
    process.env.NEO4J_URI!,
    neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
  );
  const dbSession = driver.session();

  // Fetch isAdmin flag
  const userResult = await dbSession.run(
    `
    MATCH (u:User {email: $email})
    RETURN u.isAdmin AS isAdmin
    `,
    { email: user.email }
  );

  const isAdmin = userResult.records[0]?.get('isAdmin') ?? false;

  if (isAdmin) {
    // Admin view: fetch all users
    const usersResult = await dbSession.run(
      `
      MATCH (u:User)
      RETURN
        u.name AS name,
        u.email AS email,
        u.ndaFileUrl AS ndaFileUrl,
        u.resumeFileUrl AS resumeFileUrl,
        u.icaFileUrl AS icaFileUrl
      `
    );

    const users = usersResult.records.map((rec) => ({
      name: rec.get('name'),
      email: rec.get('email'),
      ndaFileUrl: rec.get('ndaFileUrl') || null,
      resumeFileUrl: rec.get('resumeFileUrl') || null,
      icaFileUrl: rec.get('icaFileUrl') || null,
    }));

    await dbSession.close();
    await driver.close();

    return <AdminDashboard users={users} />;
  } else {
    // Student view: fetch tasks
    const tasksResult = await dbSession.run(
      `
      MATCH (t:Task)
      OPTIONAL MATCH (u:User {email: $email})-[r:HAS_TASK]->(t)
      RETURN
        t.name AS name,
        t.description AS description,
        t.deadline AS deadline,
        coalesce(r.status, 'Not Started') AS status
      ORDER BY t.deadline
      `,
      { email: user.email }
    );

    const tasks = tasksResult.records.map((rec) => ({
      name: rec.get('name'),
      description: rec.get('description'),
      deadline: rec.get('deadline')?.toString() ?? '',
      status: rec.get('status'),
    }));

    await dbSession.close();
    await driver.close();

    return <StudentDashboard user={user} tasks={tasks} />;
  }
}
