import Image from "next/image";
import { useState } from "react";
import EmojiCarousel from "./emoji-carousel"; // Import the shared EmojiCarousel

export default function SelfComment({
  commentText,
  isExpanded,
}: {
  commentText: string;
  isExpanded: boolean;
}) {
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [isEmojiCarouselOpen, setIsEmojiCarouselOpen] = useState<boolean>(false);

  const emojiList = ["👍", "👎", "❤️", "😂", "😢", "🤓", "🙉"];

  const handleReaction = (emoji: string) => {
    setReactions((prev) => {
      const currentCount = prev[emoji] || 0;
      return { ...prev, [emoji]: currentCount + 1 };
    });
  };

  const handleReactionClick = (emoji: string) => {
    setReactions((prev) => {
      const currentCount = prev[emoji] || 0;
      if (currentCount > 0) {
        const updatedReactions = { ...prev, [emoji]: currentCount - 1 };
        if (updatedReactions[emoji] === 0) {
          delete updatedReactions[emoji];
        }
        return updatedReactions;
      }
      return prev;
    });
  };

  return (
<div className={`self-comment-wrapper relative w-full transition-all duration-300`}>
  <div className="flex flex-row items-center gap-[8px] text-white transition-all duration-300 w-full">
    {/* Comment Box */}
    <div className="w-full flex flex-col px-[10px] py-[10px] gap-[6px] bg-[#2E2E2E] border-[0.5px] border-[#7D7B7C] rounded-[10px] transition-all duration-300">
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center gap-[4px] py-[2px]">
          <p className="font-bold">You</p>
        </div>
        {isExpanded && (
          <div className="flex gap-[10px]">
            <button onClick={() => setIsEmojiCarouselOpen((prev) => !prev)}>
              <Image src="/icons/reaction-white-icon.svg" alt="Reaction" width={19} height={19} />
            </button>
            <Image src="/icons/reply-white-icon.svg" alt="Reply" width={19} height={19} />
          </div>
        )}
      </div>

      {/* Comment Text */}
      <p>{commentText}</p>

      {/* Reactions */}
      {isExpanded && (
        <div className="flex items-center mt-[8px]">
          <div className="flex flex-wrap gap-[10px]">
            {Object.entries(reactions).map(([emoji, count]) => (
              <button key={emoji} onClick={() => handleReactionClick(emoji)} className="flex items-center px-[7px] py-[1px] border-[0.5px] border-[#7D7B7C] rounded-[5px] bg-[#000000]/80 backdrop-blur-[4px] shadow-sm">
                {count} {emoji}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-[8px] ml-auto min-w-[150px]">
            <div className="font-bold">102 replies</div>
            <div className="flex -space-x-[7px]">
              <Image src="/profiles/profile_pic_1.png" alt="Profile" width={24} height={24} className="rounded-full border-[2px] border-white" />
              <Image src="/profiles/profile_pic_2.png" alt="Profile" width={24} height={24} className="rounded-full border-[2px] border-white" />
              <Image src="/profiles/profile_pic_3.png" alt="Profile" width={24} height={24} className="rounded-full border-[2px] border-white" />
            </div>
          </div>
        </div>
      )}
    </div>

    <div>
      <Image src="/profiles/profile_pic_4.png" alt="You" width={34} height={34} />
    </div>
  </div>

  {/* Emoji Carousel */}
  {isExpanded && isEmojiCarouselOpen && (
    <div className="flex justify-start mt-[5px]">
      <EmojiCarousel emojiList={emojiList} onReaction={handleReaction} />
    </div>
  )}
</div>
  );
}
