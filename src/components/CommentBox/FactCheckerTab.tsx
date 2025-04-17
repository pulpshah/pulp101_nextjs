// FactCheckerTab.tsx
'use client';

import React, { useState } from 'react';

type Reference = { url: string; keyQuote: string; isSupportive: boolean };

export default function FactCheckerTab() {
  const [input, setInput] = useState('');
  const [factData, setFactData] = useState<{
    factuality: number;
    result: boolean;
    reason: string;
    references: Reference[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReferences, setShowReferences] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setFactData(null); // Clear previous data

    try {
      const response = await fetch(`https://g.jina.ai/${encodeURIComponent(input)}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer jina_d27470d3569849a4a0cb4bc0bfa860d6M0J3QnLi8jkZcsWMTPWoKrMFcRzx',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFactData(data.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Enter fact to check..."
          className="p-2 border rounded w-full mb-2"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-500 text-white p-2 rounded w-full">
          Check Fact
        </button>
      </form>

      {isLoading && <div>Loading...</div>}

      {factData && (
        <div className="text-sm">
          <p><strong>Factuality:</strong> {factData.factuality}</p>
          <p><strong>Result:</strong> {factData.result ? 'True' : 'False'}</p>
          <p><strong>Reason:</strong> {factData.reason}</p>

          {/* Toggle References Button */}
          <button
            onClick={() => setShowReferences(!showReferences)}
            className="text-blue-500 underline mb-2"
          >
            {showReferences ? 'Hide References' : 'Show References'}
          </button>

          {/* Display References Conditionally with Scroll */}
          {showReferences && (
            <div className="max-h-40 overflow-y-auto border-t border-gray-700 mt-2 pt-2">
              <h3>References:</h3>
              <ul className="list-disc ml-5">
                {factData.references.map((ref, index) => (
                  <li key={index} className="mb-2">
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {ref.keyQuote}
                    </a>
                    <p className="text-sm text-gray-500">{ref.isSupportive ? 'Supportive' : 'Not Supportive'}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
