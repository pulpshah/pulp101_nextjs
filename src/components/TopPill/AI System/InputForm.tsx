'use client';

interface InputFormProps {
  input: string;
  initialInput?: string | null | undefined; // New prop for the embedded text
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
  onRemove?: () => void; // Optional remove handler
}

export default function InputForm({
  input,
  initialInput,
  isLoading,
  onInputChange,
  onSubmit,
  onRemove,
}: InputFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 p-4">
      {/* Display Embedded Initial Input with Remove Button */}
      {initialInput && (
        <div className="p-3 bg-gray-700 text-white rounded-lg text-sm flex items-center justify-between">
          <p className="truncate">“{initialInput}”</p>
          {onRemove && (
            <button
              onClick={onRemove}
              type="button"
              className="ml-2 text-red-500 hover:text-red-700 text-xs"
            >
              Remove
            </button>
          )}
        </div>
      )}

      {/* Text Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={isLoading ? 'Generating...' : 'Type your message...'}
          value={input}
          disabled={isLoading}
          onChange={onInputChange}
          className="flex-1 px-4 py-2 bg-gray-800 text-white border-none rounded-l-lg focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg flex items-center justify-center"
        >
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </form>
  );
}
