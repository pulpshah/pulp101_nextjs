import { NextResponse } from 'next/server';
import { getQuoteScore, addQuoteScore, addUserScoreToQuote } from '@/lib/neo4j';
import { getSession } from '@/lib/session';

const prompts: { [key in 'appeal' | 'ethos']: string } = {
  appeal: `Analyze the following text in terms of appeal and provide a response in JSON format as {score: float, explanation: String}. The range of score is from 1-10: `,
  ethos: `Evaluate the following text based on its ethos and provide a response in JSON format as {score: float, explanation: String}. The range of score is from 1-10: `
};

type Category = keyof typeof prompts;

interface RequestBody {
  inputText: string;
  category: Category;
  userScore: number;
}


export async function POST(request: Request) {
  try {
    const session = await getSession();
    let userEmail = null;

    if (session && session.user && session.user.email) {
      userEmail = session.user.email;
    } else {
      console.log('User not logged in');
    }

    const { inputText, category, userScore }:RequestBody = await request.json();

    // Check if the quote already exists in the database
    const existingScore = await getQuoteScore(inputText,category);
    if (existingScore) {
      if (userEmail) {
        await addUserScoreToQuote(userEmail, inputText, userScore, category);
      }
      return NextResponse.json(existingScore);
    }

    // If the quote does not exist, call the OpenAI API for scoring
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Make sure this is set in your .env file
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: `${prompts[category]}: "${inputText}"`,
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    // Ensure that the response is returned in the desired format
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const messageContent = data.choices[0].message.content.trim();

      try {
        console.log(messageContent);
        const parsedResponse = JSON.parse(messageContent);

        // Add the new quote with its score and explanation to the Neo4j database
        await addQuoteScore(inputText, parsedResponse.score, parsedResponse.explanation, category);

        if (userEmail) {
          // If user is logged in, store user score to the database
          await addUserScoreToQuote(userEmail, inputText, userScore, category);
        }

        // Return the new score and explanation
        return NextResponse.json(parsedResponse);
      } catch {
        return NextResponse.json({ error: 'Failed to parse GPT-4 response' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid response from GPT-4' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Failed to call OpenAI API' }, { status: 500 });
  }
}
