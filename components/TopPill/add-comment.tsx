import Image from "next/image";
import NoWorkResult from "postcss/lib/no-work-result";
import { useState } from "react";

type ReplyType = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies?: ReplyType[];
};

type CommentProps = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: ReplyType[];  // Keep this as Comment[] to match Threads
  userVoteLevel: number | null;  // Remove optional
  isTopLevel: boolean;  // Remove optional
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
  
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
  
        const newComment = await response.json();
  
        // Create a complete comment object
        const completeComment: CommentProps = {
          id: newComment.id,
          author: email,
          text: commentText,
          createdAt: new Date().toISOString(),
          replies: [],
          userVoteLevel: 3,
          isTopLevel: true
        };
  
        // Pass the complete comment object to parent
        onAddComment(completeComment);
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
    <div className="flex items-center gap-2 p-1 rounded-lg bg-neutral-800">
      <button 
        className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors"
        onClick={handleSend}
      >
        <Image
          src="/images/plus-square.png"
          alt="Add"
          width={30}
          height={35}
          className="opacity-90"
        />
      </button>
      <div className="flex-1 bg-black rounded-md">
        <input
          type="text"
          placeholder="Write a comment.."
          className="w-full px-3 py-2 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
