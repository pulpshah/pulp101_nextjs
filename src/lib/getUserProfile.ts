// ============================================
// File Purpose: Fetch full user profile from Neo4j by email
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

import neo4jDriver from "./neo4j";

export async function getUserProfile(email: string) {
    const session = neo4jDriver.session();
    try {
        const result = await session.run(
            `
      MATCH (u:User {email: $email})
      RETURN u.name AS name, u.email AS email, u.image AS image, u.isAdmin AS isAdmin
      `,
            { email }
        );

        if (result.records.length === 0) return null;

        const user = result.records[0];
        return {
            name: user.get("name"),
            email: user.get("email"),
            image: user.get("image"),
            isAdmin: user.get("isAdmin") || false,
        };
    } finally {
        await session.close();
    }
}
