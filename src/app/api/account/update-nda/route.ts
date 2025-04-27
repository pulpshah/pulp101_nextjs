import neo4jDriver from '@/lib/neo4j';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    const { ndaFileUrl } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email || !ndaFileUrl) {
        return new Response('Missing email or URL', { status: 400 });
    }

    const sessionDb = neo4jDriver.session();
    try {
        await sessionDb.run(
            `
      MATCH (u:User {email: $email})
      SET u.ndaFileUrl = $ndaFileUrl
      `,
            { email, ndaFileUrl }
        );

        return new Response('OK', { status: 200 });
    } catch (error) {
        console.error('Error updating NDA link:', error);
        return new Response('Neo4j update failed', { status: 500 });
    } finally {
        await sessionDb.close();
    }
}
