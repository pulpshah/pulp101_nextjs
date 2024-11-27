import Image from "next/image";
import NoWorkResult from "postcss/lib/no-work-result";
import { useState } from "react";

type CommentProps = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: CommentProps[];
};

export default function AddCommentPill({
  onAddComment,
  slug,
  email,
}: {
  onAddComment: (newComment: CommentProps) => void; // Correct type here
  slug: string;
  email: string;
}) {
  const [commentText, setCommentText] = useState("");

  const handleSend = async () => {
    if (commentText.trim()) {
      try {
        // Send request to backend
        const response = await fetch("/api/addReplyToBlog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug,
            text: commentText,
            email,
          }),
        });

        // Check if response is OK
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }

        // Parse the backend response
        const newComment = await response.json();

        // Use the backend-provided data to update the UI
        onAddComment({
          id: newComment.id, // Backend-generated ID
          author: email, // Current user
          text: newComment.text, // Backend-confirmed text
          createdAt: newComment.createdAt || new Date().toISOString(), // Use backend timestamp or fallback
          replies: [], // Initialize replies as empty
        });

        // Clear the input field
        setCommentText("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-row w-full h-auto gap-[10px] px-[10px] py-[10px] items-center justify-center rounded-[10px] bg-[#2E2E2E]/80 backdrop-blur-[20px]">
      <input
        className="flex flex-row gap-[10px] px-[10px] py-[10px] rounded-[5px] bg-black w-full h-auto items-start justify-start text-white"
        placeholder="Add a comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div>
        <button onClick={handleSend}>
          <Image src="/icons/send-icon.svg" alt="Send" width={29} height={29} />
        </button>
      </div>
    </div>
  );
}
