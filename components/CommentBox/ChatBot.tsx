'use client';

import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Markdown from "./Markdown";

export default function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "/api/llm-response",
  });

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4 rounded-lg shadow-lg h-[500px] max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">AI ChatBot</h2>
        <p className="text-sm text-gray-300">Ask anything and get AI-powered responses.</p>
      </div>

      {/* Scrollable Chatbox */}
      <div className="flex-1 overflow-y-auto space-y-4 bg-gray-800 p-3 rounded-lg" id="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-md ${
              message.role === "user" ? "bg-gray-700 text-white" : "bg-blue-700 text-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              {message.role === "user" ? (
                <User2 className="w-6 h-6 text-gray-300" />
              ) : (
                <Bot
                  className={`w-6 h-6 ${
                    isLoading && index === messages.length - 1 ? "animate-bounce" : "text-gray-300"
                  }`}
                />
              )}
              <Markdown text={message.content} />
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input, // Send input as the prompt to the backend
            },
          });
        }}
        className="flex items-center gap-2 mt-4"
      >
        <input
          type="text"
          placeholder={isLoading ? "Generating..." : "Type your message..."}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 bg-gray-800 text-white border-none rounded-l-lg focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-6 w-6" onClick={stop} />
          ) : (
            <Send className="h-6 w-6" />
          )}
        </button>
      </form>
    </div>
  );
}
