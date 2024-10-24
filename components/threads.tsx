import Comment from "./comment";
import Image from "next/image";

export default function Threads({ onDockLineClick, isExpanded }: { onDockLineClick: () => void, isExpanded: boolean }) {
  // Sample comments array (you can replace this with your dynamic comments data)
  const comments = [
    "Ok, as an Italian American, here’s the thing. Olive Garden isn’t authentic and it’s also not what a lot of us grew up eating. So we don’t like it. Now, would I eat Gordon Ramsey’s carbonara? Yea. Of course. It’s probably delicious. It’s not authentic.",
    "Authenticity in food is overrated; the most important thing is whether it tastes good or not.",
    "I love fusion cuisine. It combines the best of both worlds!"
  ];

  // Only render the first comment when not expanded
  const visibleComments = isExpanded ? comments : [comments[0]];

  return (
    <div className="flex flex-col w-full gap-[8px] px-[10px] pt-[7px] pb-[10px] items-center justify-center text-black bg-[#FFFFFF]/80">
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
      <div className="flex flex-col pb-[10px] gap-[30px] w-full h-auto">
        {/* Render visible comments based on expanded state */}
        {visibleComments.map((comment, index) => (
          <Comment
            key={index}
            commentIndex={index}
            commentText={comment}
            isExpanded={isExpanded}
          />
        ))}
      </div>
    </div>
  );
}
