import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
    process.env.NEO4J_URI!,
    neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
);

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, status } = await req.json();
    if (!name || !status) {
        return NextResponse.json({ error: 'Missing name or status' }, { status: 400 });
    }

    try {
        const neoSession = driver.session();
        await neoSession.run(
            `
      MATCH (u:User { email: $email }), (t:Task { name: $name })
      MERGE (u)-[r:HAS_TASK]->(t)
      SET r.status = $status
      `,
            { email: session.user.email, name, status }
        );
        await neoSession.close();
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('API /tasks/status error:', err);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}
