import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('Invalid messages: must be a non-empty array');
    }

    console.log(messages)

    const openai = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY!,
    });

    const result = await streamText({
      model: openai('llama-3.1-70b-versatile'),
      messages,
    });

    return result.toDataStreamResponse(); // Stream response directly
  } catch (error) {
    // Use a type guard to access the message property safely
    if (error instanceof Error) {
      console.error('Error in API route:', error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    } else {
      console.error('Unknown error:', error);
      return new Response(JSON.stringify({ error: 'An unknown error occurred' }), { status: 500 });
    }
  }
}

