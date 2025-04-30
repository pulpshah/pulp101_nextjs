// ============================================
// File Purpose: API route for Admin to fetch student deliverable statuses (NDA, ICA, Resume)
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import neo4jDriver from '@/lib/neo4j';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const email = session.user.email;
    const driver = neo4jDriver;
    const dbSession = driver.session();

    try {
        // Make sure the requesting user is an Admin
        const adminCheck = await dbSession.run(
            `
      MATCH (u:User {email: $email})
      RETURN u.isAdmin AS isAdmin
      `,
            { email }
        );

        const isAdmin = adminCheck.records[0]?.get('isAdmin') ?? false;
        if (!isAdmin) {
            return new Response(JSON.stringify({ error: 'Forbidden' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Fetch all users and their deliverables
        const result = await dbSession.run(
            `
      MATCH (u:User)
      RETURN 
        u.name         AS name,
        u.email        AS email,
        u.ndaFileUrl   AS ndaFileUrl,
        u.icaFileUrl   AS icaFileUrl,
        u.resume AS resumeFileUrl
      ORDER BY u.name
      `
        );

        const students = result.records.map((record) => ({
            name: record.get('name'),
            email: record.get('email'),
            ndaFileUrl: record.get('ndaFileUrl') ?? null,
            icaFileUrl: record.get('icaFileUrl') ?? null,
            resumeFileUrl: record.get('resumeFileUrl') ?? null,
        }));

        return new Response(JSON.stringify({ students }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Failed to fetch students:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await dbSession.close();
    }
}
