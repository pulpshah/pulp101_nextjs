import Image from "next/image";
import { useState,useEffect } from "react";
import EmojiCarousel from "./emoji-carousel";
import CommentLoadingScreen from "./comment-loading";
import ConfidenceLevelModal from "./ConfidenceLevelModal";
import { CommentProps } from "@/lib/types";
import { comment } from "postcss";


/////////////////////
type ReplyType = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies?: ReplyType[];
};

export default function Comment({
  commentText,
  commentIndex,
  isExpanded,
  isMinimized,
  author,
  replies = [],
  onDisableScroll,
  email,
  startingVoteLevel,
  onVoteChange,
  commentId,
}: {
  commentText: string;
  author: string;
  commentIndex: number;
  isExpanded: boolean;
  isMinimized: boolean;
  replies: ReplyType[];
  commentId: String;
  email:string;
  onDisableScroll: (disable: boolean) => void;
  startingVoteLevel: number | null;
  onVoteChange: (commentId: number, newVoteLevel: number | null) => void;
}) {
  const [isVotingOpen, setIsVotingOpen] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<"valid" | "invalid" | null>(
    startingVoteLevel !== null
      ? startingVoteLevel > 0
        ? "valid"
        : "invalid"
      : null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfidenceModalOpen, setIsConfidenceModalOpen] = useState<boolean>(false);
  const [voteLevel, setVoteLevel] = useState<number | null>(null);
  const [shadowColor, setShadowColor] = useState<string>("");
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [isEmojiCarouselOpen, setIsEmojiCarouselOpen] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>(""); 
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState(false);

const handleVoteClick = (type: "valid" | "invalid") => {
  if (!email) {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000); // Hide after 3 seconds
    return;
  }
  handleVote(type);
};

  console.log(author);

  useEffect(() => {
    const levels = [
      "#FF5A5ACC", // Invalid Level 1
      "#FF8383CC", // Invalid Level 2
      "#FFAAAACC", // Invalid Level 3
      "#FFCECECC", // Invalid Level 4
      "#DAFFCECC", // Valid Level 1
      "#BFFFAACC", // Valid Level 2
      "#A1FF83CC", // Valid Level 3
      "#83FF5ACC", // Valid Level 4
    ];
  
    if (startingVoteLevel !== null) {
      setVoteLevel(startingVoteLevel);
  
      // Determine the shadow color based on vote level
      const levelIndex =
        startingVoteLevel < 0
          ? Math.min(Math.abs(startingVoteLevel) - 1, 3) // Invalid levels
          : Math.min(startingVoteLevel - 1 + 4, 7); // Valid levels (offset for index)
  
      setShadowColor(levels[levelIndex]);
  
      setHasVoted(startingVoteLevel !== null ? (startingVoteLevel > 0 ? "valid" : "invalid") : null);
    }
  }, [startingVoteLevel]);
  

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const emojiList = ["👍", "👎", "❤️", "😂", "😢", "🤓", "🙉"];

  const toggleVotingIcons = () => {
    if (!hasVoted) setIsVotingOpen((prev) => !prev);
  };

  const handleVote = (type: "valid" | "invalid") => 
  {
    setHasVoted(type);
    setIsVotingOpen(false);
    setIsConfidenceModalOpen(true);
    onDisableScroll(true);
  };
  // const handleVote = async (level: number) => {
  //   try {
  //     await fetch("/api/vote", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, commentId: commentIndex, level }),
  //     });
  //     setVoteLevel(level);
  //     onVoteChange(commentIndex, level);
  //     setIsConfidenceModalOpen(false);
  //     onDisableScroll(false);
  //   } catch (error) {
  //     console.error("Error submitting vote:", error);
  //   }
  // };
  const openConfidenceModal = () => {
    if (voteLevel === null) {
      setIsConfidenceModalOpen(true);
      onDisableScroll(true);
    }
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

  const handleConfidenceLevelSelect = async(level: number, color: string) =>
    {
    setIsConfidenceModalOpen(false);
    onDisableScroll(false);
    setVoteLevel(level);
    setShadowColor(color);
    setIsLoading(true);
    try {
    await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, commentId: commentId, level }),
    });
    setVoteLevel(level);
    onVoteChange(commentIndex, level);
    setIsConfidenceModalOpen(false);
    onDisableScroll(false);
  } catch (error) {
    console.error("Error submitting vote:", error);
  }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getShadowStyle = () => {
    if (voteLevel === null) {
      return {};
    }
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
    setHasVoted(null);
    setVoteLevel(null);
    onDisableScroll(false);
  };
  const handleReplySubmit = async () => {
     console.log(commentIndex);
    if (!replyText.trim()) {
      console.log("Empty reply text");
      return;
    }
  
    try {
      console.log("Submitting reply:", {
        commentId: commentIndex,
        text: replyText,
        email: email
      });
  
      const response = await fetch("/api/addReplyToComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: commentIndex,
          text: replyText,
          email: email,
        }),
      });
  
      const responseData = await response.json();
      console.log("API Response:", responseData);
  
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit reply");
      }
  
      // Update the local state with the new reply
      const newReply = {
        id: responseData.id || Date.now(), // Fallback to timestamp if no ID returned
        author: email, // You might want to show a username instead
        text: replyText,
        createdAt: new Date().toISOString(),
        replies: [],
      };
  
      // Update replies array immutably
      const updatedReplies = [...replies, newReply];
      replies.length = 0;  // Clear the array
      replies.push(...updatedReplies);  // Add new items
  
      setReplyText("");
      setIsReplying(false);
      setShowReplies(true);  // Show replies after adding new one
  
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
    
  return (
    <div className="comment-wrapper relative w-full flex flex-col transition-all duration-300">
      {isConfidenceModalOpen && (
        <ConfidenceLevelModal
          onClose={handleConfidenceModalClose}
          onSelectLevel={handleConfidenceLevelSelect}
          isAgreement={hasVoted === "valid"}
        />
      )}

      {!isLoading && (
        <>
          <div className="flex flex-row items-start gap-[8px] text-black transition-all duration-300 w-full">
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
              className="flex-grow flex flex-col p-[16px] bg-white border-[0.5px] border-[#7D7B7C] rounded-[10px] transition-all duration-300"
              style={getShadowStyle()}
            >
              <div className="flex justify-between items-start">
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
                {isExpanded && hasVoted && (
                  <div className="flex gap-[10px]">
                    <button onClick={() => setIsEmojiCarouselOpen((prev) => !prev)}>
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

              <p className={`${isMinimized ? "whitespace-nowrap overflow-hidden text-ellipsis" : ""} transition-all duration-300`}>
                {commentText}
              </p>

              {isExpanded && hasVoted && (
                <div className="flex items-center mt-[8px]">
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
                  <div className="flex items-center gap-[8px] ml-auto">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleReplies}
                        className="font-bold text-blue-500 text-sm hover:underline"
                      >
                        {showReplies ? "Hide Replies" : `${replies.length} Replies`}
                      </button>

                      <button
                        onClick={() => setIsReplying((prev) => !prev)}
                        className="font-bold text-blue-500 text-sm hover:underline"
                      >
                        {isReplying ? "Cancel" : "Reply"}
                      </button>
                    </div>

                    {isReplying && (
                      <div className="mt-4 w-full">
                        <div className="flex flex-col md:flex-row items-center w-full gap-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="flex-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
                        />
                          <div className="flex gap-2 w-full md:w-auto justify-end">
                          <button
                            onClick={handleReplySubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                          >
                            Submit
                          </button>
                          </div>
                        </div>
                      </div>
                    )}
  
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
            {!hasVoted && isExpanded && (
              <div className={`min-w-[40px] flex flex-col items-center justify-center transition-all duration-300 ${isVotingOpen ? "gap-[3px]" : "gap-0"}`}>
              <button
                onClick={() => handleVoteClick("invalid")}
                className={`transition-opacity duration-300 ${isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
              >
                <Image
                  src="/icons/invalid-icon.svg"
                  alt="Invalid"
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={() => handleVoteClick("valid")}
                className={`transition-opacity duration-300 ${isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
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
                className="transition-transform duration-300"
              >
                <Image
                  src="/icons/gavel-icon.svg"
                  alt="Gavel"
                  width={24}
                  height={24}
                />
              </button>
              {/* Tooltip for login */}
              {showTooltip && !email && (
                <div className="ml-2 bg-black text-white text-xs rounded-md p-2 shadow-md z-10">
                  <button
                    onClick={() => (window.location.href = '/auth/login')}
                    className="bg-blue-500 text-white text-xs py-1 px-2 rounded shadow hover:bg-blue-600"
                  >
                    Login to vote
                  </button>
                </div>
              )}
            </div>
              // <div className={`min-w-[40px] flex flex-col items-center justify-center transition-all duration-300 ${isVotingOpen ? "gap-[3px]" : "gap-0"}`}>
              //   <button
              //     onClick={() => handleVote("invalid")}
              //     className={`transition-opacity duration-300 ${isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
              //   >
              //     <Image
              //       src="/icons/invalid-icon.svg"
              //       alt="Invalid"
              //       width={24}
              //       height={24}
              //     />
              //   </button>
              //   <button
              //     onClick={() => handleVote("valid")}
              //     className={`transition-opacity duration-300 ${isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
              //   >
              //     <Image
              //       src="/icons/valid-icon.svg"
              //       alt="Valid"
              //       width={24}
              //       height={24}
              //     />
              //   </button>
              //   <button
              //     onClick={toggleVotingIcons}
              //     className="transition-transform duration-300"
              //   >
              //     <Image
              //       src="/icons/gavel-icon.svg"
              //       alt="Gavel"
              //       width={24}
              //       height={24}
              //     />
              //   </button>
              // </div>
            )}
          </div>

          {/* Emoji Carousel */}
          {isExpanded && isEmojiCarouselOpen && (
            <div className="flex justify-end mt-[5px]">
              <EmojiCarousel emojiList={emojiList} onReaction={handleReaction} />
            </div>
          )}

          {/* Replies Section - Now directly below the comment */}
          {showReplies && replies.length > 0 && (
            <div className="mt-4 ml-[42px] space-y-4">
              {replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Image
                    src="/profiles/profile_pic_1.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{reply.author}</p>
                    <p className="text-sm text-gray-600 mt-1">{reply.text}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{reply.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}