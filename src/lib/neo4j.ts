import neo4j, { Driver, Session, Record } from 'neo4j-driver';

type Comment = {
  id: string;
  text: string;
  createdAt: string;
  author: string;
  parentId: string | null;
  userVoteLevel: Number | null;
};

// Use environment variables to get the Neo4j Aura connection details
const NEO4J_URI = process.env.NEO4J_URI ?? '';
const NEO4J_USERNAME = process.env.NEO4J_USERNAME ?? 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? '';

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  throw new Error('Missing Neo4j Aura connection environment variables');
}

// Create the Neo4j driver instance without specifying additional encryption configuration
export const driver: Driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

// Function to fetch comments data for a blog
export async function getCommentsData(slug: string): Promise<Comment[] | null> {
  const session: Session = driver.session();

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

    if (result.records.length > 0) {
      const comments: Comment[] = result.records.map((record: Record) => {
        const comment = record.get('comment');
        return {
          id: comment.id,
          text: comment.text,
          createdAt: comment.createdAt,
          author: comment.author,
          parentId: comment.parentId ?? null,
          userVoteLevel: null
        };
      });
      return comments;
    } else {
      return null;
    }
  } finally {
    await session.close();
  }
}

// Function to fetch comments data for a blog with voting information for a specific user
export async function getCommentsDataWithVotes(slug: string, userEmail: string): Promise<Comment[] | null> {
  const session: Session = driver.session();

  const query = `
    MATCH (blog:Blog {slug: $slug})-[:HAS_COMMENT]->(root:Comment) // Get all root comments for the blog
    OPTIONAL MATCH (root)-[:HAS_REPLY*0..]->(reply:Comment) // Recursively match all replies
    OPTIONAL MATCH (reply)<-[:HAS_REPLY]-(parent:Comment) // Get the parent of each reply
    OPTIONAL MATCH (u:User)-[:WROTE]->(reply) // Match the user who wrote the reply
    OPTIONAL MATCH (voter:User {email: $userEmail})-[vote:VOTED]->(reply) // Check if the specific user voted on the reply
    WITH reply, parent, u, voter, vote.level AS voteLevel, reply.id AS replyId, parent.id AS parentId
    ORDER BY reply.createdAt
    RETURN {
      id: replyId,
      text: reply.text,
      createdAt: reply.createdAt,
      author: u.name,
      parentId: parentId,
      userVoteLevel: voteLevel
    } AS comment
  `;

  try {
    const result = await session.run(query, { slug, userEmail });

    if (result.records.length > 0) {
      const comments: Comment[] = result.records.map((record: Record) => {
        const comment = record.get('comment');
        return {
          id: comment.id,
          text: comment.text,
          createdAt: comment.createdAt,
          author: comment.author,
          parentId: comment.parentId ?? null,
          userVoteLevel: comment.userVoteLevel ?? null
        };
      });
      return comments;
    } else {
      return null;
    }
  } finally {
    await session.close();
  }
}

// Function to add a reply to an existing comment
export async function addReplyToComment(commentId: string, text: string, email: string) {
  const session: Session = driver.session();

  const query = `
    MATCH (parent:Comment {id: $commentId})
    MATCH (u:User {email: $email})
    CREATE (reply:Comment {id: randomUUID(), text: $text, createdAt: datetime()})
    CREATE (u)-[:WROTE]->(reply)
    CREATE (parent)-[:HAS_REPLY]->(reply)
    RETURN reply.id AS replyId, reply.text AS replyText
  `;

  try {
    const result = await session.run(query, { commentId, text, email });
    if (result.records.length > 0) {
      const reply = {
        id: result.records[0].get('replyId'),
        text: result.records[0].get('replyText'),
      };
      return reply;
    } else {
      throw new Error('Failed to add reply to comment');
    }
  } finally {
    await session.close();
  }
}

//Getting userName through email
export async function getUserName(email: string): Promise<string | null> {
  const session: Session = driver.session();

  const query = `
    MATCH (u:User {email: $email})
    RETURN u.name as name
  `;

  try {
    const result = await session.run(query, { email });
    if (result.records.length > 0) {
      return result.records[0].get('name');
    }
    return null;
  } finally {
    await session.close();
  }
}

// Function to add a top-level comment (reply to the blog)
export async function addReplyToBlog(slug: string, text: string, email: string) {
  const session: Session = driver.session();

  const query = `
    MATCH (blog:Blog {slug: $slug})
    MATCH (u:User {email: $email})
    CREATE (comment:Comment {id: randomUUID(), text: $text, createdAt: datetime()})
    CREATE (u)-[:WROTE]->(comment)
    CREATE (blog)-[:HAS_COMMENT]->(comment)
    RETURN comment.id AS commentId, comment.text AS commentText
  `;

  try {
    const result = await session.run(query, { slug, text, email });
    if (result.records.length > 0) {
      const comment = {
        id: result.records[0].get('commentId'),
        text: result.records[0].get('commentText'),
      };
      return comment;
    } else {
      throw new Error('Failed to add top-level comment to blog');
    }
  } finally {
    await session.close();
  }
}

/**
 * Function to vote on a comment.
 * @param email - The email of the user voting.
 * @param commentId - The ID of the comment being voted on.
 * @param level - The voting level (-3 for invalid level 3 to 3 for valid level 3).
 */
export async function voteOnComment(email: string, commentId: string, level: number): Promise<void> {
  const session: Session = driver.session();

  const query = `
    MATCH (u:User {email: $email}), (c:Comment {id: $commentId})
    MERGE (u)-[v:VOTED]->(c)
    SET v.level = $level
  `;

  try {
    await session.run(query, { email, commentId, level });
  } catch (error) {
    console.error('Error adding vote:', error);
    throw new Error('Failed to add vote to comment');
  } finally {
    await session.close();
  }
}

// Function to check if a quote exists in the database and return its score
export async function getQuoteScore(quote: string, category: string): Promise<{ score: string, explanation: string } | null> {
  const session: Session = driver.session();

  const query = `
    MATCH (q:Quote {text: $quote})
    RETURN q.${category}_score AS score, q.${category}_explanation AS explanation
  `;

  try {
    const result = await session.run(query, { quote });
    if (result.records.length > 0) {
      return {
        score: result.records[0].get('score'),
        explanation: result.records[0].get('explanation')
      };
    } else {
      return null;
    }
  } finally {
    await session.close();
  }
}

// Function to add a quote and its score to the database
export async function addQuoteScore(quote: string, score: string, explanation: string,category:string): Promise<void> {
  const session: Session = driver.session();

  const query = `
    CREATE (q:Quote {text: $quote, ${category}_score: $score, ${category}_explanation: $explanation})
  `;

  try {
    await session.run(query, { quote, score, explanation });
  } catch (error) {
    console.error('Error adding quote score:', error);
    throw new Error('Failed to add quote score to the database');
  } finally {
    await session.close();
  }
}

export async function addUserScoreToQuote(userEmail: string, quoteText: string, userScore: number, category: string): Promise<void> {
  const session: Session = driver.session();
  const query = `
    MATCH (u:User {email: $email})
    MERGE (q:Quote {text: $quoteText}) // Ensure the quote node exists
    MERGE (u)-[s:SCORED]->(q)
    ON CREATE SET s.${category}_score = $userScore
    ON MATCH SET s.${category}_score = $userScore
  `;

  try {
    await session.run(query, {
      email: userEmail,
      quoteText: quoteText,
      userScore: userScore,
    });
  } catch (error) {
    console.error('Error adding user score to quote:', error);
    throw new Error('Failed to add user score to the quote');
  } finally {
    await session.close();
  }
}

export async function addClarityIDScoreToQuote(clarityID: string, quoteText: string, userScore: number, category: string): Promise<void> {
  const session: Session = driver.session();
  const query = `
    MERGE (c:ClarityID {id: $clarityID})
    ON CREATE SET c.id = $clarityID
    MERGE (q:Quote {text: $quoteText})
    MERGE (c)-[s:SCORED]->(q)
    ON CREATE SET s.${category}_score = $userScore
    ON MATCH SET s.${category}_score = $userScore
  `;

  try {
    await session.run(query, {
      clarityID: clarityID,
      quoteText: quoteText,
      userScore: userScore,
    });
  } catch (error) {
    console.error('Error adding user score to quote:', error);
    throw new Error('Failed to add user score to the quote');
  } finally {
    await session.close();
  }
}