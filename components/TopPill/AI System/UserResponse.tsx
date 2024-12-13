'use client';

export default function UserResponse({ content }: { content: string }) {
  return (
    <div className="p-3 bg-gray-700 text-white rounded-lg">
      <p>{content}</p>
    </div>
  );
}
