import Comment from "./comment";
import AddCommentPill from "./add-comment";
import Image from "next/image";
import { useState } from "react";
import SelfComment from "./self-comment";

export default function Threads({
  onDockLineClick,
  isExpanded,
}: {
  onDockLineClick: () => void;
  isExpanded: boolean;
}) {
  const otherComments = [
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t  authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic. There is nothing wrong with loving any food, but also recognizing that authentic has a meaning.",
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t  authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic. There is nothing wrong with loving any food, but also recognizing that authentic has a meaning.",
    "From the screen to the ring, to the pen, to the king, Where's my crown? That's my bling, always drama when I ring. See, I believe that if I see it in my heart. Smash through the ceiling 'cause I'm reaching for the stars",
    "idk"
  ];

  const [userComments, setUserComments] = useState<string[]>([]); // State to track user comments

  const handleAddComment = (commentText: string) => {
    setUserComments((prev) => [...prev, commentText]); // Add new comment
  };

  // Only render the first comment when not expanded
  const visibleComments = isExpanded ? otherComments : [otherComments[0]];

  return (
    <div className="relative flex flex-col w-full gap-[8px] px-[10px] pt-[7px] items-center justify-start text-black">
      <div className="dock-line flex justify-center">
        <button onClick={onDockLineClick}>
          <Image src="/icons/dock-line.svg" alt="Dock line" width={46} height={5} />
        </button>
      </div>
      <div className="conversations-header flex flex-row w-full h-auto items-center justify-between">
        <div>
          <span className="font-RG font-bold">Threads</span>{" "}
          <span className="font-normal text-[#4D4D4D]">1.2k</span>
        </div>
        <div className="search-icon">
          <button>
            <Image src="/icons/search-icon.svg" alt="Search" width={19} height={19} />
          </button>
        </div>
      </div>

      {/* Comments Start Here */}
      <div className="flex flex-col pb-[10px] gap-[30px] w-full overflow-y-auto">
        {/* Render visible comments from initialComments */}
        {visibleComments.map((comment, index) => (
          <Comment
            key={index}
            commentIndex={index}
            commentText={comment}
            isExpanded={isExpanded}
            isMinimized={!isExpanded}
          />
        ))}

        {/* Render user comments */}
        {userComments.map((comment, index) => (
          <SelfComment
            key={index}
            commentText={comment}
            isExpanded={isExpanded}
          />
        ))}
      </div>

      {/* Add Comment Pill - Positioned sticky at the bottom */}
      {isExpanded && (
        <div className="sticky bottom-0 w-full px-[10px] pb-[10px] bg-transparent">
          <AddCommentPill onAddComment={handleAddComment} />
        </div>
      )}
    </div>
  );
}