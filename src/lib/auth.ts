// ============================================
// File Purpose: NextAuth configuration with Neo4j integration and Google/Credentials providers
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// ============================================

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Neo4jAdapter } from "@auth/neo4j-adapter";
import neo4j from "neo4j-driver";
import bcrypt from "bcrypt";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Create Neo4j driver instance
const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME || "neo4j",
    process.env.NEO4J_PASSWORD || "password"
  )
);

// Extend the Session and JWT types to include our custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: Neo4jAdapter(driver.session()),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const session = driver.session();
          const result = await session.run(
            `MATCH (u:User {email: $email}) RETURN u`,
            { email: credentials.email }
          );

          await session.close();

          if (result.records.length === 0) {
            return null;
          }

          const user = result.records[0].get('u').properties;

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if (passwordMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const session = driver.session();
        await session.run(
          `
          MERGE (u:User { email: $email })
          ON CREATE SET u.createdAt = datetime()
          SET u.name = $name,
              u.image = $image,
              u.updatedAt = datetime()
          `,
          {
            email: user.email,
            name: user.name,
            image: user.image,
          }
        );
        await session.close();
        return true;
      } catch (err) {
        console.error("Neo4j SignIn Error:", err);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "8f3a12e9d4b7c6k5m2n9p8q7r4t3v2w1x",
};
