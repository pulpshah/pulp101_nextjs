// ============================================
// File Purpose: API route to fetch and update user bio in Neo4j
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/24/2025
// ============================================

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import driver from '@/lib/neo4j';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const neoSession = driver.session();

    try {
        const result = await neoSession.run(
            `
        MATCH (u:User { email: $email })
        RETURN u.bio AS bio
      `,
            { email: session.user.email }
        );

        const bio = result.records[0]?.get('bio') || '';
        return NextResponse.json({ bio });
    } catch (error) {
        console.error('Failed to fetch bio:', error);
        return NextResponse.json({ error: 'Failed to fetch bio' }, { status: 500 });
    } finally {
        await neoSession.close();
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bio } = await req.json();
    const neoSession = driver.session();

    try {
        await neoSession.run(
            `
        MATCH (u:User { email: $email })
        SET u.bio = $bio
      `,
            { email: session.user.email, bio }
        );

        return NextResponse.json({ message: 'Bio updated successfully' });
    } catch (error) {
        console.error('Failed to update bio:', error);
        return NextResponse.json({ error: 'Failed to update bio' }, { status: 500 });
    } finally {
        await neoSession.close();
    }
}
