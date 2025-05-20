// ============================================
// File Purpose: API route to update user info in Neo4j on Save
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import driver from '@/lib/neo4j';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
        fullName,
        dob,
        email,
        phone,
        laddersID,
        discord,
        school,
        major,
        resume,
        interests,
        address,
        image,
        role,
        city,
        state,
        quote
    } = await req.json();

    const neoSession = driver.session();

    try {
        const result = await neoSession.run(
            `
        MATCH (u:User { email: $email })
        SET 
          u.name = $fullName,
          u.dob = $dob,
          u.phone = $phone,
          u.laddersID = $laddersID,
          u.discord = $discord,
          u.school = $school,
          u.major = $major,
          u.resume = $resume,
          u.interests = $interests,
          u.address = $address,
          u.image = $image,
          u.role = $role,
          u.city = $city,
          u.state = $state,
          u.quote = $quote
        RETURN u
      `,
            {
                email,
                fullName,
                dob,
                phone,
                laddersID,
                discord,
                school,
                major,
                resume,
                interests,
                address,
                image,
                role,
                city,
                state,
                quote
            }
        );

        return NextResponse.json({
            message: 'User updated',
            result: result.records[0]?.get('u') || {},
        });
    } catch (error) {
        console.error('Neo4j update error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    } finally {
        await neoSession.close();
    }
}
