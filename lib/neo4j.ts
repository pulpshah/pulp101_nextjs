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
    MATCH (blog:Blog {slug: $slug})-[:HAS_COMMENT]->(comment:Comment)
    OPTIONAL MATCH (comment)<-[:WROTE]-(author:User)
    WITH blog, comment, author
    OPTIONAL MATCH (reply:Comment)-[:REPLIED_TO]->(comment)
    OPTIONAL MATCH (reply)<-[:WROTE]-(replyAuthor:User)
    WITH blog, comment, author, collect({
      id: reply.id,
      text: reply.text,
      createdAt: reply.createdAt,
      author: replyAuthor.email
    }) AS replies
    RETURN blog.title AS title, blog.slug AS slug, collect({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      author: author.email,
      replies: replies
    }) AS comments
  `;

  try {
    const result = await session.run(query, { slug });

    if (result.records.length > 0) {
      const blogData = result.records[0].get('comments');
      return blogData;
    } else {
      return null;
    }
  } finally {
    await session.close();
  }
}

