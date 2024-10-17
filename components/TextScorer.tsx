"use client";

import { useState } from 'react';

type TextScorerProps = {
  text: string;
  score: number;
  expl: string;
};

const TextScorer: React.FC<TextScorerProps> = ({ text, score, expl }) => {
  const [userScore, setUserScore] = useState<number | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userScore !== null) {
      // Send the user score to the server (you can implement the logic here)
      // await fetch('/api/submit-score', { method: 'POST', body: JSON.stringify({ userScore }) });

      setShowReveal(true);
      setSubmitted(true);
    }
  };

  return (
    <div className="mt-8 p-6 rounded-lg shadow-lg text-black dark:bg-black dark:text-white transition-colors duration-300">
      <p className="text-lg mb-6">{text}</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <label htmlFor="score" className="text-black dark:text-white">
            Your Score:
          </label>
          <input
            type="number"
            id="score"
            step="0.1"
            className="w-16 p-2 bg-gray-200 text-black border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring focus:border-gray-500"
            value={userScore ?? ''}
            onChange={(e) => setUserScore(parseFloat(e.target.value))}
            min="0"
            max="10"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors duration-300"
          >
            Submit Score
          </button>
        </form>
      ) : (
        <p className="mt-4 text-black dark:text-white">Thank you for submitting your score.</p>
      )}

      {showReveal && (
        <div className="mt-6">
          <p className="text-xl font-semibold text-black dark:text-white">
            You gave it the score of {userScore}.
          </p>
          <p className="text-xl font-semibold text-black dark:text-white">
            We gave it the score of {score}.
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-400">Explanation: {expl}</p>
        </div>
      )}
    </div>
  );
};

export default TextScorer;
