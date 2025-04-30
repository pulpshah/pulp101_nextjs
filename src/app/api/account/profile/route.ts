// ============================================
// File Purpose: API route to GET/POST user profile including role, location, and quote
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/30/2025
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
      RETURN u.name AS fullName,
             u.email AS email,
             u.dob AS dob,
             u.phone AS phone,
             u.laddersID AS laddersID,
             u.discord AS discord,
             u.school AS school,
             u.major AS major,
             u.resume AS resume,
             u.interests AS interests,
             u.address AS address,
             u.image AS image,
             u.role AS role,
             u.city AS city,
             u.state AS state,
             u.quote AS quote,
             u.createdAt AS createdAt,
             u.ndaFileUrl AS ndaFileUrl
      `,
            { email: session.user.email }
        );

        if (result.records.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const r = result.records[0];
        return NextResponse.json({
            fullName: r.get('fullName') || '',
            email: r.get('email') || '',
            dob: r.get('dob') || '',
            phone: r.get('phone') || '',
            laddersID: r.get('laddersID') || '',
            discord: r.get('discord') || '',
            school: r.get('school') || '',
            major: r.get('major') || '',
            resume: r.get('resume') || '',
            interests: r.get('interests') || [],
            address: r.get('address') || '',
            image: r.get('image') || '',
            role: r.get('role') || '',
            city: r.get('city') || '',
            state: r.get('state') || '',
            quote: r.get('quote') || '',
            createdAt: r.get('createdAt') || '',
            ndaFileUrl: r.get('ndaFileUrl') || '',
        });
    } catch (err) {
        console.error('Neo4j Fetch Error:', err);
        return NextResponse.json({ error: 'Profile fetch failed' }, { status: 500 });
    } finally {
        await neoSession.close();
    }
}
