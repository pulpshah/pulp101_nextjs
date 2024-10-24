import neo4j from 'neo4j-driver';

// Use environment variables to get the Neo4j Aura connection details
const NEO4J_URI = process.env.NEO4J_URI ?? '';   // Replace with your Aura's URI
const NEO4J_USERNAME = process.env.NEO4J_USERNAME ?? 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? '';

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  throw new Error('Missing Neo4j Aura connection environment variables');
}

// Create the Neo4j driver instance without specifying additional encryption configuration
export const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

export async function getCommentsData(slug: string) {
  const session = driver.session();

  const query = `
    MATCH (blog:Blog {slug: $slug})-[:HAS_COMMENT]->(root:Comment) // Get all root comments for the blog
    OPTIONAL MATCH (root)-[:HAS_REPLY*0..]->(reply:Comment) // Recursively match all replies
    OPTIONAL MATCH (reply)<-[:HAS_REPLY]-(parent:Comment) // Get the parent of each reply
    OPTIONAL MATCH (u:User)-[:WROTE]->(reply) // Match the user who wrote the reply
    WITH reply, parent, u, reply.id AS replyId, parent.id AS parentId
    ORDER BY reply.createdAt
    RETURN {
      id: replyId,        
      text: reply.text,
      createdAt: reply.createdAt,
      author: u.name,     
      parentId: parentId
    } AS comment
  `;

  try {
    const result = await session.run(query, { slug });

    if (result.records.length > 0) 
    {
      let comments = [];
      for (let i = 0; i<result.records.length; i++)
      {
         comments.push(result.records[i].get('comment'));
      }
      return comments;
    } else {
      return null;
    }
  } finally {
    await session.close();
  }
}

