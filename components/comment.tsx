import Image from "next/image";
import { useState } from "react";
import EmojiCarousel from "./emoji-carousel";
import CommentLoadingScreen from "./comment-loading";

export default function Comment({
  commentText,
  commentIndex,
  isExpanded,
  isMinimized,
}: {
  commentText: string;
  commentIndex: number;
  isExpanded: boolean;
  isMinimized: boolean;
}) {
  const [isVotingOpen, setIsVotingOpen] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<"valid" | "invalid" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [isEmojiCarouselOpen, setIsEmojiCarouselOpen] = useState<boolean>(false);

  const emojiList = ["👍", "👎", "❤️", "😂", "😢", "🤓", "🙉"];

  const toggleVotingIcons = () => {
    if (!hasVoted) setIsVotingOpen((prev) => !prev);
  };

  const handleVote = (type: "valid" | "invalid") => {
    setHasVoted(type);
    setIsVotingOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleReaction = (emoji: string) => {
    setReactions((prev) => {
      const currentCount = prev[emoji] || 0;
      return { ...prev, [emoji]: currentCount + 1 };
    });
    setIsEmojiCarouselOpen(false);
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
    <div className={`comment-wrapper relative w-full transition-all duration-300 ${isLoading ? 'loading-screen-class' : ''}`}>
      {/* Loading Screen */}
      {isLoading && <CommentLoadingScreen hasVoted={hasVoted} />}

      {/* Render the actual comment content only when loading is false */}
      {!isLoading && (
        <div className="flex flex-row items-center gap-[8px] text-black transition-all duration-300 w-full">
          {/* Profile Picture */}
          {hasVoted && !isLoading && !isMinimized && (
            <div>
              <Image src="/profiles/profile_pic_1.png" alt="Profile" width={34} height={34} />
            </div>
          )}

          {/* Comment Box */}
          <div
            className={`w-full flex flex-col p-[16px] bg-white border-[0.5px] border-[#7D7B7C] rounded-[10px] transition-all duration-300 ${
              hasVoted === "valid" ? 'shadow-valid' : hasVoted === "invalid" ? 'shadow-invalid' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              {/* Username and Icons Only if Expanded */}
              {isExpanded && hasVoted && (
                <div className="flex items-center gap-[4px]">
                  <p className="font-bold">Username</p>
                  <Image
                    src={`/icons/${hasVoted}-colored-icon.svg`}
                    alt={hasVoted === "valid" ? "Valid" : "Invalid"}
                    width={24}
                    height={24}
                  />
                </div>
              )}
              {isExpanded && hasVoted && ( // Show voting options only in expanded view
                <div className="flex gap-[10px]">
                  <button onClick={() => setIsEmojiCarouselOpen((prev) => !prev)}>
                    <Image src="/icons/reaction-icon.svg" alt="Reaction" width={19} height={19} />
                  </button>
                  <Image src="/icons/reply-icon.svg" alt="Reply" width={19} height={19} />
                </div>
              )}
            </div>

            {/* Comment Text */}
            <p className={`${isMinimized ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''} transition-all duration-300`}>
              {commentText}
            </p>

            {/* Reactions and Replies - Hidden in Minimized View */}
            {isExpanded && hasVoted && (
              <div className="flex items-center mt-[8px]"> 
                <div className="flex flex-wrap gap-[10px]">
                  {Object.entries(reactions).map(([emoji, count]) => (
                    <button key={emoji} onClick={() => handleReactionClick(emoji)} className="flex items-center px-[7px] py-[1px] border-[0.5px] rounded-[5px] shadow-sm">
                      {count} {emoji}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-[8px] ml-auto min-w-[150px]">
                  <div className="font-bold">102 replies</div>
                  <div className="flex -space-x-[7px]">
                    <Image
                      src="/profiles/profile_pic_1.png"
                      alt="Profile"
                      width={24}
                      height={24}
                      className="rounded-full border-[2px] border-white"
                    />
                    <Image
                      src="/profiles/profile_pic_2.png"
                      alt="Profile"
                      width={24}
                      height={24}
                      className="rounded-full border-[2px] border-white"
                    />
                    <Image
                      src="/profiles/profile_pic_3.png"
                      alt="Profile"
                      width={24}
                      height={24}
                      className="rounded-full border-[2px] border-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        {/* Voting Section */}
        {!hasVoted && isExpanded && ( // Hide voting in minimized state
          <div
            className={`min-w-[40px] flex flex-col items-center justify-center transition-all duration-300 ${isVotingOpen ? "gap-[3px]" : "gap-0"}`}
          >
            <button onClick={() => handleVote("invalid")} className={`transition-opacity duration-300 ${isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              <Image src="/icons/invalid-icon.svg" alt="Invalid" width={24} height={24} />
            </button>

            <button onClick={() => handleVote("valid")} className={`transition-opacity duration-300 ${isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              <Image src="/icons/valid-icon.svg" alt="Valid" width={24} height={24} />
            </button>

            <button onClick={toggleVotingIcons} className={`transition-transform duration-300 ${isVotingOpen ? "translate-y-0" : "translate-y-0"}`}>
              <Image src="/icons/gavel-icon.svg" alt="Gavel" width={24} height={24} />
            </button>
          </div>
        )}
        </div>
      )}
      {isExpanded && isEmojiCarouselOpen && (
        <div className="flex justify-end mt-[5px]">
          <EmojiCarousel emojiList={emojiList} onReaction={handleReaction} />
        </div>
      )}
    </div>
  );
}
