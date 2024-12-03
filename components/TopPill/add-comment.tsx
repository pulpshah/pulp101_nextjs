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
