import Image from "next/image";
import { useState } from "react";
import EmojiCarousel from "./emoji-carousel";
import CommentLoadingScreen from "./comment-loading";
import ConfidenceLevelModal from "./ConfidenceLevelModal";
import { CommentProps } from "../lib/types";

export default function Comment({
  commentText,
  commentIndex,
  isExpanded,
  isMinimized,
  author,
  replies = [],
  onDisableScroll,
}: {
  commentText: string;
  author: string;
  commentIndex: number;
  isExpanded: boolean;
  isMinimized: boolean;
  replies: CommentProps[];
  onDisableScroll: (disable: boolean) => void;
}) {
  console.log(replies);
  const [isVotingOpen, setIsVotingOpen] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<"valid" | "invalid" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfidenceModalOpen, setIsConfidenceModalOpen] =
    useState<boolean>(false);
  const [voteLevel, setVoteLevel] = useState<number | null>(null);
  const [shadowColor, setShadowColor] = useState<string>("");
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [isEmojiCarouselOpen, setIsEmojiCarouselOpen] =
    useState<boolean>(false);

    const toggleReplies = () => {
      setShowReplies((prev) => !prev);
    };
    

  const emojiList = ["👍", "👎", "❤️", "😂", "😢", "🤓", "🙉"];

  const toggleVotingIcons = () => {
    if (!hasVoted) setIsVotingOpen((prev) => !prev);
  };

  const handleVote = (type: "valid" | "invalid") => {
    setHasVoted(type);
    setIsVotingOpen(false);
    setIsConfidenceModalOpen(true);
    onDisableScroll(true);
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

  const handleConfidenceLevelSelect = (level: number, color: string) => {
    setIsConfidenceModalOpen(false);
    onDisableScroll(false);
    setVoteLevel(level);
    setShadowColor(color);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getShadowStyle = () => {
    if (voteLevel === null) {
      return {};
    }
  
    // Convert hex color to RGBA with 0.2 opacity
    const hex = shadowColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return {
      boxShadow: `0px 0px 16px 0px rgba(${r}, ${g}, ${b}, 0.5)`,
    };
  };
  
  

  const handleConfidenceModalClose = () => {
    setIsConfidenceModalOpen(false);
    setHasVoted(null); // Reset voting state to unvoted
    setVoteLevel(null);
    onDisableScroll(false); // Re-enable scroll
  };

  return (
    <div
      className={`comment-wrapper relative w-full transition-all duration-300 ${
        isLoading ? "loading-screen-class" : ""
      }`}
    >
      {/* Loading Screen */}
      {isLoading && <CommentLoadingScreen hasVoted={hasVoted} />}

      {/* Confidence Level Modal */}
      {isConfidenceModalOpen && (
        <ConfidenceLevelModal
          onClose={handleConfidenceModalClose} // Pass the close handler
          onSelectLevel={handleConfidenceLevelSelect}
          isAgreement={hasVoted === "valid"}
        />
      )}

      {!isLoading && (
        <div
          className="flex flex-row items-center gap-[8px] text-black transition-all duration-300 w-full"
          style={getShadowStyle()}
        >
          {/* Profile Picture */}
          {hasVoted && !isLoading && !isMinimized && (
            <div>
              <Image
                src="/profiles/profile_pic_1.png"
                alt="Profile"
                width={34}
                height={34}
              />
            </div>
          )}

          {/* Comment Box */}
          <div
            className="w-full flex flex-col p-[16px] bg-white border-[0.5px] border-[#7D7B7C] rounded-[10px] transition-all duration-300"
            style={getShadowStyle()}
          >
            <div className="flex justify-between items-start">
              {/* Username and Icons Only if Expanded */}
              {isExpanded && hasVoted && (
                <div className="flex items-center gap-[4px]">
                  <p className="font-bold">{author}</p>
                  <Image
                    src={`/icons/${hasVoted}-colored-icon.svg`}
                    alt={hasVoted === "valid" ? "Valid" : "Invalid"}
                    width={24}
                    height={24}
                  />
                </div>
              )}
              {isExpanded &&
                hasVoted && ( // Show voting options only in expanded view
                  <div className="flex gap-[10px]">
                    <button
                      onClick={() => setIsEmojiCarouselOpen((prev) => !prev)}
                    >
                      <Image
                        src="/icons/reaction-icon.svg"
                        alt="Reaction"
                        width={19}
                        height={19}
                      />
                    </button>
                    <Image
                      src="/icons/reply-icon.svg"
                      alt="Reply"
                      width={19}
                      height={19}
                    />
                  </div>
                )}
            </div>

            {/* Comment Text */}
            <p
              className={`${
                isMinimized
                  ? "whitespace-nowrap overflow-hidden text-ellipsis"
                  : ""
              } transition-all duration-300`}
            >
              {commentText}
            </p>

            {/* Reactions and Replies - Hidden in Minimized View */}
            {isExpanded && hasVoted && (
              <div className="flex items-center mt-[8px]">
                <button
                onClick={toggleReplies}
                className="text-blue-500 text-sm hover:underline"
              >
                {showReplies ? "Hide Replies" : `${replies.length} Replies`}
                
              </button>
                <div className="flex flex-wrap gap-[10px]">
                  {Object.entries(reactions).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      onClick={() => handleReactionClick(emoji)}
                      className="flex items-center px-[7px] py-[1px] border-[0.5px] rounded-[5px] shadow-sm"
                    >
                      {count} {emoji}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-[8px] ml-auto min-w-[150px]">
                  <div className="font-bold">{replies.length} replies</div>
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
          {showReplies && (
            <div className="ml-8 mt-4">
              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className="border-l-[2px] border-gray-200 pl-4 mb-4"
                >
                  <div className="flex items-start gap-2">
                    <Image
                      src="/profiles/profile_pic_1.png"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{reply.author}</p>
                      <p className="text-sm text-gray-600">{reply.text}</p>
                      <span className="text-xs text-gray-400">{reply.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Voting Section */}
          {!hasVoted &&
            isExpanded && ( // Hide voting in minimized state
              <div
                className={`min-w-[40px] flex flex-col items-center justify-center transition-all duration-300 ${
                  isVotingOpen ? "gap-[3px]" : "gap-0"
                }`}
              >
                <button
                  onClick={() => handleVote("invalid")}
                  className={`transition-opacity duration-300 ${
                    isVotingOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <Image
                    src="/icons/invalid-icon.svg"
                    alt="Invalid"
                    width={24}
                    height={24}
                  />
                </button>

                <button
                  onClick={() => handleVote("valid")}
                  className={`transition-opacity duration-300 ${
                    isVotingOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <Image
                    src="/icons/valid-icon.svg"
                    alt="Valid"
                    width={24}
                    height={24}
                  />
                </button>

                <button
                  onClick={toggleVotingIcons}
                  className={`transition-transform duration-300 ${
                    isVotingOpen ? "translate-y-0" : "translate-y-0"
                  }`}
                >
                  <Image
                    src="/icons/gavel-icon.svg"
                    alt="Gavel"
                    width={24}
                    height={24}
                  />
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
