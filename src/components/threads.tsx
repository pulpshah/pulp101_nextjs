import Comment from "./comment";
import AddCommentPill from "./add-comment";
import Image from "next/image";
import { useState } from "react";
import SelfComment from "./self-comment";

export default function Threads({
  onDockLineClick,
  isExpanded,
  disableScroll,
  onDisableScroll,
}: {
  onDockLineClick: () => void;
  isExpanded: boolean;
  disableScroll: boolean;
  onDisableScroll: (disable: boolean) => void;
}) {
  const otherComments = [
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic. There is nothing wrong with loving any food, but also recognizing that authentic has a meaning.",
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic. There is nothing wrong with loving any food, but also recognizing that authentic has a meaning.",
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic. There is nothing wrong with loving any food, but also recognizing that authentic has a meaning.",
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic. There is nothing wrong with loving any food, but also recognizing that authentic has a meaning.",
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic. There is nothing wrong with loving any food, but also recognizing that authentic has a meaning.",
  ];

  const [userComments, setUserComments] = useState<string[]>([]);

  const handleAddComment = (commentText: string) => {
    setUserComments((prev) => [...prev, commentText]);
  };

  // Total comment count, combining otherComments and userComments
  const commentCount = otherComments.length + userComments.length;

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
          <span className="font-normal text-[#4D4D4D]">{commentCount}</span>
        </div>
        <div className="search-icon">
          <button>
            <Image src="/icons/search-icon.svg" alt="Search" width={19} height={19} />
          </button>
        </div>
      </div>

      {/* Comments Start Here */}
      <div
        className={`scroll-container flex flex-col gap-[30px] w-full pb-[10px] ${
          disableScroll ? "overflow-hidden" : "overflow-y-auto"
        }`}
        style={{
          maxHeight: "60vh",
        }}
      >
        {visibleComments.map((comment, index) => (
          <Comment
            key={index}
            commentIndex={index}
            commentText={comment}
            isExpanded={isExpanded}
            isMinimized={!isExpanded}
            onDisableScroll={onDisableScroll}
          />
        ))}

        {userComments.map((comment, index) => (
          <SelfComment key={index} commentText={comment} isExpanded={isExpanded} />
        ))}
      </div>

      {isExpanded && (
        <div className="sticky bottom-0 w-full px-[10px] pb-[10px] bg-transparent">
          <AddCommentPill onAddComment={handleAddComment} />
        </div>
      )}
    </div>
  );
}
