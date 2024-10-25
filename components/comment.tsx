import Image from "next/image";
import { useState } from "react";

export default function Comment({
  commentText,
  commentIndex,
  isExpanded,
}: {
  commentText: string;
  commentIndex: number;
  isExpanded: boolean;
}) {
  const [isVotingOpen, setIsVotingOpen] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<"valid" | "invalid" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage the loading transition

  // Toggle voting icons with gavel click (only if not voted)
  const toggleVotingIcons = () => {
    if (!hasVoted) setIsVotingOpen((prev) => !prev);
  };

  // Handle voting action (valid or invalid)
  const handleVote = (type: "valid" | "invalid") => {
    setHasVoted(type);
    setIsVotingOpen(false);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const truncatedText =
    !isExpanded && commentText.length > 150 ? commentText.slice(0, 150) + "..." : commentText;

  return (
    <div className={`comment-wrapper relative w-full p-[16px] transition-all duration-300 ${isLoading ? 'loading-screen-class' : ''}`}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="flex flex-row items-end gap-[8px] w-full"> 
          <div>
            <Image 
              src="/profiles/profile_pic_loading.png"
              alt="loading"
              width={34}
              height={34}
            />
          </div>
          <div className="w-full h-auto flex flex-col items-center gap-[6px] px-[10px] py-[10px] rounded-[10px] border border-[#7D7B7C] border-[0.5px] bg-white shadow-loading">
            {/* Loading skeleton */}
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-row py-[2px] rounded-[10px] bg-[#E7E7E7]">
                <p className="opacity-0">Username</p>
                <Image
                  src={`/icons/${hasVoted}-colored-icon.svg`}
                  alt={hasVoted === "valid" ? "Valid" : "Invalid"}
                  width={24}
                  height={24}
                  className="opacity-0"
                />
              </div>
              <div className="py-[2px] rounded-[10px] bg-[#E7E7E7]">
                <p className="opacity-0">reply</p>
              </div>
            </div>
            <div className="flex flex-col gap-[6px] w-full">
              <div className="bg-[#E7E7E7] rounded-[10px] w-full">
                <p className="opacity-0">.</p>
              </div>
              <div className="bg-[#E7E7E7] rounded-[10px] w-4/5">
                <p className="opacity-0">.</p>
              </div>
              <div className="bg-[#E7E7E7] rounded-[10px] w-9/10">
                <p className="opacity-0">.</p>
              </div>
              <div className="bg-[#E7E7E7] rounded-[10px] w-4/5">
                <p className="opacity-0">.</p>
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-row gap-[8px] justify-start">
                <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
                  <p className="opacity-0">2 👍</p>
                </div>
                <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
                  <p className="opacity-0">10 🤓</p>
                </div>
              </div>
              <div className="flex flex-row gap-[6px] justify-start">
                <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
                  <p className="opacity-0">102 replies</p>
                </div>
                <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
                  <p className="opacity-0">...............</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render the actual comment content only when loading is false */}
      {!isLoading && (
        <div className="flex flex-row items-end gap-[8px] text-black transition-all duration-300 w-full">
          {/* Profile picture outside of the comment box */}
          {hasVoted && !isLoading && (
            <div>
              <Image src="/profiles/profile_pic_1.png" alt="Profile" width={34} height={34} />
            </div>
          )}

          {/* Comment Box with Conditional Shadow */}
          <div className={`w-full flex flex-row justify-between p-[16px] bg-white border-[0.5px] border-[#7D7B7C] rounded-[10px] transition-all duration-300 ${hasVoted === "valid" ? 'shadow-valid' : hasVoted === "invalid" ? 'shadow-invalid' : ''}`}>
            {/* Comment Content */}
            <div className="flex flex-col w-full">
              {hasVoted && (
                <div className="flex justify-between">
                  <div className="flex items-center gap-[4px]">
                    <p className="font-bold">Username</p>
                    <Image
                      src={`/icons/${hasVoted}-colored-icon.svg`}
                      alt={hasVoted === "valid" ? "Valid" : "Invalid"}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="flex gap-[10px]">
                    <Image src="/icons/reaction-icon.svg" alt="Reaction" width={19} height={19} />
                    <Image src="/icons/reply-icon.svg" alt="Reply" width={19} height={19} />
                  </div>
                </div>
              )}
              <p>{truncatedText}</p>
              {hasVoted && (
                <div className="flex justify-between items-center mt-[8px]">
                  {/* Reactions Section */}
                  <div className="flex gap-[10px]">
                    <div className="flex items-center px-[7px] py-[1px] border-[0.5px] rounded-[5px] shadow-sm">
                      2 👍
                    </div>
                    <div className="flex items-center px-[7px] py-[1px] border-[0.5px] rounded-[5px] shadow-sm">
                      10 🤓
                    </div>
                  </div>

                  {/* Replies Section */}
                  <div className="flex items-center gap-[8px]">
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
            {!hasVoted && (
              <div
                className={`min-w-[40px] flex flex-col items-center justify-between transition-all duration-300 ${
                  isVotingOpen ? "gap-[3px]" : "gap-0"
                }`}
              >
                <button
                  onClick={() => handleVote("invalid")}
                  className={`transition-opacity duration-300 ${
                    isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                >
                  <Image src="/icons/invalid-icon.svg" alt="Invalid" width={24} height={24} />
                </button>

                <button
                  onClick={() => handleVote("valid")}
                  className={`transition-opacity duration-300 ${
                    isVotingOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                >
                  <Image src="/icons/valid-icon.svg" alt="Valid" width={24} height={24} />
                </button>

                <button
                  onClick={toggleVotingIcons}
                  className={`transition-transform duration-300 ${
                    isVotingOpen ? "translate-y-0" : "translate-y-0"
                  }`}
                >
                  <Image src="/icons/gavel-icon.svg" alt="Gavel" width={24} height={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
