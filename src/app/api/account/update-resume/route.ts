// ============================================
// File Purpose: Updates user's resume URL in Neo4j after successful S3 upload
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/30/2025
// ============================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import neo4jDriver from "@/lib/neo4j";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { resumeUrl } = await req.json();
    if (!resumeUrl) {
        return new Response(JSON.stringify({ error: "Missing resumeUrl" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const neo4jSession = neo4jDriver.session();

    try {
        await neo4jSession.run(
            `
      MATCH (u:User { email: $email })
      SET u.resume = $resumeUrl
      `,
            {
                email: session.user.email,
                resumeUrl,
            }
        );

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Neo4j resume update error:", error);
        return new Response(JSON.stringify({ error: "Failed to update resume" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        await neo4jSession.close();
    }
}
