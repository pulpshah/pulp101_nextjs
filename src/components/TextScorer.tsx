'use client';
import { useState, useEffect } from 'react';

const quotes = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
  "Life is what happens when you're busy making other plans. — John Lennon",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. — Buddha",
  "In the end, we will remember not the words of our enemies, but the silence of our friends. — Martin Luther King Jr.",
  "The purpose of our lives is to be happy. — Dalai Lama",
  "Be yourself; everyone else is already taken. — Oscar Wilde",
  "You only live once, but if you do it right, once is enough. — Mae West",
  "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. — Confucius",
  "Everything you've ever wanted is on the other side of fear. — George Addair",
  "You miss 100% of the shots you don't take. — Wayne Gretzky",
  "The best way to predict the future is to create it. — Abraham Lincoln",
  "We generate fears while we sit. We overcome them by action. — Dr. Henry Link",
  "Life is really simple, but we insist on making it complicated. — Confucius",
  "The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt",
  "Go confidently in the direction of your dreams! Live the life you've imagined. — Henry David Thoreau",
  "Do what you can, with what you have, where you are. — Theodore Roosevelt",
  "The only person you should try to be better than is the person you were yesterday. — Unknown",
  "Difficulties in life are intended to make us better, not bitter. — Dan Reeves",
  "A person who never made a mistake never tried anything new. — Albert Einstein",
  "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
  "Change your thoughts and you change your world. — Norman Vincent Peale",
  "The only impossible journey is the one you never begin. — Tony Robbins",
  "Don't let yesterday take up too much of today. — Will Rogers",
  "The best revenge is massive success. — Frank Sinatra",
  "Dream big and dare to fail. — Norman Vaughan",
  "Act as if what you do makes a difference. It does. — William James"
];

type TextScorerProps = {
  category: string;
};

const TextScorer: React.FC<TextScorerProps> = ({ category }) => 
{
  const [userScore, setUserScore] = useState<number | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [gptResponse, setGptResponse] = useState<{ score: string; explanation: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [randomQuote, setRandomQuote] = useState<string>('');

  useEffect(() => {
    // Generate the random quote on the client side
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userScore !== null) 
    {
      setLoading(true); // Set loading to true when the request starts
      try {
        const response = await fetch(`/api/scoring`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputText: randomQuote,
            userScore: userScore,
            category: category,
          }),
        });

        const data = await response.json();
        setGptResponse({
          score: data.score || 'No score provided',
          explanation: data.explanation || 'No explanation provided',
        });
        setShowReveal(true);
        setSubmitted(true);
      } catch (error) {
        console.error('Error fetching GPT-4 response:', error);
      } finally {
        setLoading(false); // Set loading to false when the request is completed
      }
    }
  };

  return (
    <div className="mt-8 p-6 rounded-lg shadow-lg text-black dark:bg-black dark:text-white transition-colors duration-300">
      <p className="text-lg mb-6">{randomQuote}</p>

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

      {loading && (
        <p className="mt-6 text-black dark:text-white">Loading scores...</p>
      )}

      {showReveal && !loading && gptResponse && (
        <div className="mt-6">
          <p className="text-xl font-semibold text-black dark:text-white">
            You gave it the score of {userScore}.
          </p>
          <p className="text-xl font-semibold text-black dark:text-white">
            We gave it the score of {gptResponse.score}.
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-400">Explanation: {gptResponse.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default TextScorer;
