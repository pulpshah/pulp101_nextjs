import { Bot } from "lucide-react";

export default function AIResponse({
  content,
  isLoading,
}: {
  content: string;
  isLoading: boolean;
}) {
  return (
    <div className="p-3 bg-blue-700 rounded-md">
      <div className="flex items-center gap-2">
        <Bot className={`w-6 h-6 ${isLoading ? "animate-bounce" : "text-gray-300"}`} />
        <span className="text-sm">{content}</span>
      </div>
    </div>
  );
}
