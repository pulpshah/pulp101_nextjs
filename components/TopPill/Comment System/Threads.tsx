import React, { useState, useEffect } from 'react';
import Comment from "./comment";
import AddCommentPill from "./add-comment";
import Image from "next/image";
import SelfComment from "./self-comment";
import { usePathname } from "next/navigation";

type ReplyType = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies?: ReplyType[];
};

type CommentProps = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: ReplyType[];
  userVoteLevel: number|null;
  isTopLevel: boolean;
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
  email: string;
  onDockLineClick: () => void;
  isExpanded: boolean;
  disableScroll: boolean;
  onDisableScroll: (disable: boolean) => void;
}) {
  const [userComments, setUserComments] = useState<CommentProps[]>([]);
  const [votes, setVotes] = useState<{ [key: number]: number | null }>({});
  const [fetchedComments, setFetchedComments] = useState<CommentProps[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch("/api/username", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUserName();
  }, [email]);

  const handleAddComment = (newComment: CommentProps) => {
    setUserComments((prevComments) => [
      ...prevComments,
      { ...newComment, author: userName },
    ]);
  };

  const handleVoteChange = (commentId: string, newVoteLevel: number | null) => {
    updateVoteLevel(commentId, newVoteLevel);
  };

  const pathname = usePathname();
  const slug = pathname?.split("/").pop();

  const updateVoteLevel = (commentId: string, newVoteLevel: number | null) => {
    setUserComments((prevComments) =>
      prevComments.map((comment) =>
        String(comment.id) === commentId
          ? { ...comment, userVoteLevel: newVoteLevel }
          : comment
      )
    );
  };

  const commentCount = comments.length + userComments.length;
  const allComments = [...comments, ...userComments];
  const sortedComments = allComments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // return (
  //   <div className="flex flex-col w-full h-full bg-[#2D2D2D] text-white">
  //     {/* Header */}
  //     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
  //       <div className="flex items-center gap-2">
  //         <Image 
  //           src="/icons/search-icon.svg" 
  //           alt="Search"
  //           width={20}
  //           height={20}
  //         />
  //         <span className="font-medium">Comments</span>
  //         <span className="text-gray-400">{commentCount}</span>
  //       </div>
  //       <button className="p-1">
  //         <Image 
  //           src="/icons/search-icon.svg" 
  //           alt="Search"
  //           width={18}
  //           height={18}
  //         />
  //       </button>
  //     </div>

  //     {/* Comments List */}
  //     <div 
  //       className={`flex-1 overflow-y-auto space-y-2 p-2 ${
  //         disableScroll ? "overflow-hidden" : ""
  //       }`}
  //       style={{ maxHeight: "60vh" }}
  //     >
  //       {sortedComments.map((comment) => (
  //         comment.author === userName ? (
  //           <SelfComment
  //             key={comment.id}
  //             id={comment.id}
  //             text={comment.text}
  //             author={comment.author}
  //             createdAt={comment.createdAt}
  //             isExpanded={isExpanded}
  //             initialReplies={comment.replies}
  //             email={email}
  //           />
  //         ) : (
  //           <Comment
  //             key={comment.id}
  //             commentIndex={comment.id}
  //             commentText={comment.text}
  //             author={comment.author}
  //             isExpanded={isExpanded}
  //             replies={comment.replies}
  //             isMinimized={!isExpanded}
  //             onDisableScroll={onDisableScroll}
  //             email={email}
  //             commentId={String(comment.id)}
  //             startingVoteLevel={comment.userVoteLevel}
  //             onVoteChange={(id: number, level: number | null) => 
  //               updateVoteLevel(String(id), level)
  //             }
  //           />
  //         )
  //       ))}
  //     </div>

  //     {/* Comment Input */}
  //     {isExpanded && (
  //       <div className="sticky bottom-0 w-full px-2 py-2 bg-[#2D2D2D] border-t border-gray-700">
  //         <AddCommentPill 
  //           onAddComment={handleAddComment} 
  //           slug={slug || ""} 
  //           email={email} 
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="p-[1px] rounded-lg bg-gradient-to-b from-white/20 to-white/5">
      <div className="flex flex-col w-full h-screen bg-[#2E2E2E] overflow-hidden rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#595959]">
          <div className="flex items-center gap-3">
            <Image 
              src="/images/topillfilled.png" 
              alt="Comments"
              width={24}
              height={24}
              className="text-[#FFFFFF]"
            />
            <div className="flex items-center gap-2">
              <span className="text-[#FFFFFF] font-semibold text-lg">Comments</span>
              <span className="text-[#7E7E7E]">({commentCount})</span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 hover:bg-[#2E2E2E] rounded-full transition-colors">
              <Image 
                src="/images/search-lg.png" 
                alt="Search"
                width={20}
                height={20}
                className="opacity-80"
              />
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div 
          className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#595959] scrollbar-track-[#2E2E2E] ${
            disableScroll ? "overflow-hidden" : ""
          }`}
        >
          <div className="space-y-1 p-2 pb-24" >
            {sortedComments.map((comment) => (
              comment.author === userName ? (
                <SelfComment
                  key={comment.id}
                  id={comment.id}
                  text={comment.text}
                  author={comment.author}
                  createdAt={comment.createdAt}
                  isExpanded={isExpanded}
                  initialReplies={comment.replies}
                  email={email}
                />
              ) : (
                <Comment
                  key={comment.id}
                  commentIndex={comment.id}
                  commentText={comment.text}
                  author={comment.author}
                  isExpanded={isExpanded}
                  replies={comment.replies}
                  isMinimized={!isExpanded}
                  onDisableScroll={onDisableScroll}
                  email={email}
                  commentId={String(comment.id)}
                  startingVoteLevel={comment.userVoteLevel}
                  onVoteChange={(id: number, level: number | null) => 
                    updateVoteLevel(String(id), level)
                  }
                />
              )
            ))}
          </div>
        </div>

        {/* Fixed Comment Input at Bottom */}
        <div className="fixed bottom-0 left-2 right-0 w-[93%] bg-neutral-800 border-t border-neutral-800 px-1 py-1 rounded-lg">
          <AddCommentPill
            onAddComment={handleAddComment}
            slug={usePathname()?.split("/").pop() || ""}
            email={email}
          />
        </div>
      </div>
    </div>
);
}