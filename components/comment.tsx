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

  // Toggle voting icons with gavel click (only if not voted)
  const toggleVotingIcons = () => {
    if (!hasVoted) setIsVotingOpen((prev) => !prev);
  };

  // Handle voting action (valid or invalid)
  const handleVote = (type: "valid" | "invalid") => {
    setHasVoted(type); // Register the vote and lock the state
    setIsVotingOpen(false); // Close the voting icons after voting
  };

  const truncatedText =
  !isExpanded && commentText.length > 150 ? commentText.slice(0, 150) + "..." : commentText;

  return (
    <div className="comment flex flex-row items-end gap-[8px] transition-all duration-300 h-auto">
      {/* Profile picture and username appear only after voting */}
      {hasVoted && (
        <div className="flex gap-2">
          <Image src="/profiles/profile_pic_1.png" alt="Profile" width={34} height={34} />
        </div>
      )}

      <div className="w-full h-auto flex flex-row flex-grow gap-[6px] px-[10px] py-[10px] rounded-[10px] border-[0.5px] border-[#7D7B7C] bg-white">
        <div className="flex flex-col w-full max-w-[80%]">
          {hasVoted && (
            <div className="flex flex-row w-full justify-between">
              <div className="username/vote-icon flex flex-row w-auto items-center gap-[4px] py-[2px]">
                <p className="font-bold text-black">Username</p>
                <Image
                  src={`/icons/${hasVoted}-colored-icon.svg`}
                  alt={hasVoted === "valid" ? "Valid" : "Invalid"}
                  width={24}
                  height={24}
                />
              </div>
              <div className="reaction/reply-icons flex flex-row gap-[10px] items-start">
                <Image src="/icons/reaction-icon.svg" alt="Reaction" width={19} height={19} />
                <Image src="/icons/reply-icon.svg" alt="Reply" width={19} height={19} />
              </div>
            </div>
          )}
          <div className="w-full h-auto items-center text-left text-black">
            <p>{commentText}</p>
          </div>
          {hasVoted && (
            <div className="view-reactions/replies text-black flex flex-row items-center justify-between w-full">
                <div className="reactions flex flex-row items-center gap-[8px] w-full h-full">
                    <div className="flex flex-row h-auto gap-[10px] px-[7px] py-[1px] rounded-[5px] border-[0.5px] border-[#7D7B7C] backdrop-blur-[4px] ADD BOX SHADOWS">
                        2 👍
                    </div>
                    <div className="flex flex-row h-auto gap-[10px] px-[7px] py-[1px] rounded-[5px] border-[0.5px] border-[#7D7B7C] backdrop-blur-[4px] ADD BOX SHADOWS">
                        10 🤓
                    </div>
                </div>
                <div className="replies flex items-center">
                  <div className="flex items-start justify-start font-bold">
                    102 replies
                  </div>
                  <div className="flex items-center -space-x-[7px] w-auto py-[10px]">
                    <Image 
                      src="/profiles/profile_pic_1.png"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-white"
                    />
                    <Image 
                      src="/profiles/profile_pic_2.png"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-white"
                    />
                    <Image 
                      src="/profiles/profile_pic_3.png"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-white"
                    />
                    {/* <div className="rounded-full w-[24px] h-[24px] items-center justify-center py-[3px] backdrop-blur-[10px] text-white bg-[#000000] border-[0.5px] border-[#595959]/20">
                      8
                    </div> */}
                  </div>
                </div>
            </div>
            )}
        </div>

        {/* Voting Section */}
        <div
          className={`min-w-[40px] flex flex-col items-center justify-between transition-all duration-300 ${
            isVotingOpen ? "gap-[10px]" : "gap-0"
          }`}
        >
          {/* Voting icons appear only if no vote has been cast */}
          {!hasVoted && (
            <>
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
            </>
          )}

          {/* Gavel icon to toggle the voting icons (disappears after voting) */}
          {!hasVoted && (
            <button
              onClick={toggleVotingIcons}
              className={`transition-transform duration-300 ${
                isVotingOpen ? "translate-y-0" : "translate-y-0"
              }`}
            >
              <Image src="/icons/gavel-icon.svg" alt="Gavel" width={24} height={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
