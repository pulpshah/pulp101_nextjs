import { NextResponse } from 'next/server';
import { tavily } from '@tavily/core';

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY }); // Ensure this is set in your .env.local file

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const response = await tvly.search(query, {
      includeAnswer: true,
      includeImageDescriptions: true,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error calling Tavily API:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Tavily' }, { status: 500 });
  }
}
