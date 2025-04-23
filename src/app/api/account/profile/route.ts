// ============================================
// File Purpose: API route to fetch full user profile from Neo4j for form hydration
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
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
             u.image AS image
      `,
            { email: session.user.email }
        );

        if (result.records.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const record = result.records[0];

        return NextResponse.json({
            fullName: record.get('fullName') || '',
            email: record.get('email') || '',
            dob: record.get('dob') || '',
            phone: record.get('phone') || '',
            laddersID: record.get('laddersID') || '',
            discord: record.get('discord') || '',
            school: record.get('school') || '',
            major: record.get('major') || '',
            resume: record.get('resume') || '',
            interests: record.get('interests') || [],
            address: record.get('address') || '',
            image: record.get('image') || '',
        });
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        return NextResponse.json({ error: 'Profile fetch failed' }, { status: 500 });
    } finally {
        await neoSession.close();
    }
}
