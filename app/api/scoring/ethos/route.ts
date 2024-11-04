import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { inputText } = await request.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Make sure this is set in your .env file
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Analyze the following text in terms of ethos and provide a response in JSON format as {score: float, explanation: String}. The range of score is from 1-10.: "${inputText}"`,
          },
        ],
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    // Ensure that the response is returned in the desired format
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const messageContent = data.choices[0].message.content.trim();
      try {
        const parsedResponse = JSON.parse(messageContent);
        return NextResponse.json(parsedResponse);
      } catch {
        return NextResponse.json({ error: 'Failed to parse GPT-4 response' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid response from GPT-4' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to call OpenAI API' }, { status: 500 });
  }
}
