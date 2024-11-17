import Comment from "./comment";
import AddCommentPill from "./add-comment";
import Image from "next/image";
import { useState } from "react";
import SelfComment from "./self-comment";
import { usePathname } from "next/navigation";
// import { Comment } from "postcss";
type CommentProps = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: CommentProps[];
};

export default function Threads({
  comments,
  onDockLineClick,
  email,
  isExpanded,
  disableScroll,
  onDisableScroll,
}: {
  comments: CommentProps[];
  email: String;
  onDockLineClick: () => void;
  isExpanded: boolean;
  disableScroll: boolean;
  onDisableScroll: (disable: boolean) => void;
}) {
  console.log(email);
  const [userComments, setUserComments] = useState<CommentProps[]>([]);

  const handleAddComment = (newComment: CommentProps) => {
    setUserComments((prevComments) => [...prevComments, newComment]);
  };
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();

  // Total comment count
  const commentCount = comments.length + userComments.length;

  // Determine visible comments based on expanded state
  const visibleComments = isExpanded ? comments : comments.slice(0, 1);

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
            key={comment.id}
            commentIndex={index}
            commentText={comment.text}
            author={comment.author}
            isExpanded={isExpanded}
            replies={comment.replies}
            isMinimized={!isExpanded}
            onDisableScroll={onDisableScroll}
          />
        ))}

        {userComments.map((comment, index) => (
          <SelfComment 
          key={comment.id}
          id={comment.id}
          text={comment.text}
          author={comment.author}
          createdAt={comment.createdAt}
          isExpanded={isExpanded} />
        ))}
      </div>

      {isExpanded && (
        <div className="sticky bottom-0 w-full px-[10px] pb-[10px] bg-transparent">
          <AddCommentPill onAddComment={handleAddComment} slug = {slug || ""} email={email} />
        </div>
      )}
    </div>
  );
}
