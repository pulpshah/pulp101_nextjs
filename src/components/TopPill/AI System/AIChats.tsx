'use client';

import { useChat } from 'ai/react';
import AIResponse from './AIResponse';
import UserResponse from './UserResponse';
import InputForm from './InputForm';
import { useEffect, useState } from 'react';

interface AIChatsProps {
  email: string;
  onClose: () => void;
  initialInput?: string | null | undefined; // New prop for the embedded text
}

export default function AIChats({ email, onClose, initialInput }: AIChatsProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/llm-response',
  });

  const [embeddedText, setEmbeddedText] = useState<string | null | undefined>(initialInput);

  useEffect(() => {
    if (initialInput) {
      setEmbeddedText(initialInput); // Update embedded text whenever `initialInput` changes
    }
  }, [initialInput]);

  const handleRemove = () => {
    setEmbeddedText(null); // Remove embedded text
  };

  const formatPrompt = (): string => {
    return embeddedText
      ? `"${embeddedText}" answer the question from this: "${input}"`
      : input;
  };

  const handleFormattedSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedPrompt = formatPrompt();

    // Submit the formatted prompt to the API
    handleSubmit(e, {
      data: {
        messages: [
          ...messages.map((message) => ({

            role: message.role,
            content: message.content,
          })),
          { role: 'user', content: formattedPrompt },
        ],
      },
    });
  };

  return (
    <div className="fixed top-0 right-2 h-full w-[27%] bg-gray-900 text-white shadow-lg z-[100] transition-transform transform translate-x-0 overflow-y-auto border-4 border-gray-700 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-bold">AI ChatBot</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          Close
        </button>
      </div>

      {/* Chat History */}
      <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800" id="chatbox">
        {messages.map((message, index) => {
          if (message.role === 'user') {
            return <UserResponse key={index} content={message.content} />;
          } else {
            return (
              <AIResponse
                key={index}
                content={message.content}
                isLoading={isLoading && index === messages.length}
              />
            );
          }
        })}
      </div>

      {/* Input Form */}
      <InputForm
        input={input}
        isLoading={isLoading}
        initialInput={embeddedText} // Pass embedded text
        onRemove={handleRemove}
        onInputChange={handleInputChange}
        onSubmit={handleFormattedSubmit}
        onStop={stop}
      />
    </div>
  );
}
