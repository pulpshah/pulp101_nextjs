// ============================================
// File Purpose: NextAuth handler with Neo4j integration to create user node on first login
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getSession } from '@/lib/neo4j';

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn(context) {
            const { user } = context;
            const session = getSession();

            try {
                await session.run(
                    `
          MERGE (u:User { email: $email })
          ON CREATE SET 
            u.name = $name,
            u.image = $image,
            u.createdAt = datetime()
          `,
                    {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    }
                );
            } catch (error) {
                console.error('Neo4j error during signIn:', error);
                return false;
            } finally {
                await session.close();
            }

            return true;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
