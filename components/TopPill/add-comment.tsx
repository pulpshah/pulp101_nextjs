import Image from "next/image";
import { useState } from "react";

export default function AddCommentPill({ onAddComment }: { onAddComment: (commentText: string) => void }) {
  const [commentText, setCommentText] = useState("");

  const handleSend = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
          <Image
            src="/icons/send-icon.svg"
            alt="Send"
            width={29}
            height={29}
          />
        </button>
      </div>
    </div>
  );
}
