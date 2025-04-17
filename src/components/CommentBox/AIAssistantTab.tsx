'use client';

import React, { useState } from 'react';

// Define types for the images and results
type Image = { url: string };
type Result = { title: string; url: string; score: number };

export default function AIAssistantTab() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ id: number; role: 'user' | 'ai'; content: string }[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // Toggle for additional details

  // Update input as user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Stop the request
  const stop = () => {
    setIsLoading(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { id: Date.now(), role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setInput(''); // Clear input after submission

    try {
      // Call the Next.js API route instead of Tavily directly
      const response = await fetch('/api/tavily-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage = { id: Date.now() + 1, role: 'ai' as const, content: data.answer || 'No response found.' };
      setMessages((prev) => [...prev, aiMessage]);

      // Set images, results, and response time if available
      setImages(data.images?.map(({ url }: Image) => ({ url })) || []);
      setResults(data.results?.map(({ title, url, score }: Result) => ({ title, url, score })) || []);
      setResponseTime(data.responseTime || null);
      setShowDetails(false); // Reset details view on each new query
    } catch (error) {
      console.error('Error fetching data from API route:', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai' as const, content: 'Error retrieving response.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Scrollable message display */}
      <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-4 bg-gray-800 max-h-60">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.role === 'user' ? 'User:' : 'AI:'}</strong> {message.content}
          </div>
        ))}
      </div>

      {/* Loading indicator and stop button */}
      {isLoading && (
        <div className="mb-4">
          <div className="spinner">Loading...</div> {/* Replace with your spinner component */}
          <button type="button" onClick={stop} className="text-red-500 underline">
            Stop
          </button>
        </div>
      )}

      {/* Show More/Less Details button */}
      {(images.length > 0 || results.length > 0) && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-500 underline mb-4"
        >
          {showDetails ? 'Less Details' : 'More Details'}
        </button>
      )}

      {/* Scrollable Details Section */}
      {showDetails && (
        <div className="overflow-y-auto max-h-60 mb-4 border-t border-gray-700 pt-4">
          {/* Display Images */}
          {images.length > 0 && (
            <div className="mt-4">
              <h3>Images:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <img src={image.url} alt="Image" className="w-full h-auto rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display Source Results */}
          {results.length > 0 && (
            <div className="mt-4">
              <h3>Sources:</h3>
              <ul className="list-disc ml-5">
                {results.map((result, index) => (
                  <li key={index} className="mb-2">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {result.title}
                    </a>
                    <p className="text-sm text-gray-500">Relevance Score: {result.score}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Type your question here..."
          className="p-2 border rounded w-full mb-2"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-500 text-white p-2 rounded w-full">
          Submit
        </button>
      </form>

      {/* Display Response Time */}
      {responseTime !== null && (
        <div className="mt-4 text-gray-500">
          Response time: {responseTime.toFixed(2)} seconds
        </div>
      )}
    </div>
  );
}
