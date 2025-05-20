import React, { useState, useEffect } from "react";
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
  userVoteLevel: number | null;
  isTopLevel: boolean;
};
type ThreadsProps = {
  comments: CommentProps[];
  onDockLineClick: () => void;
  email: string;
  isExpanded: boolean;
  disableScroll: boolean;
  onDisableScroll: (disable: boolean) => void;
  onVoteUpdate: () => Promise<void>; // Add this line
};

export default function Threads({
  comments,
  onDockLineClick,
  email,
  isExpanded,
  disableScroll,
  onDisableScroll,
  onVoteUpdate,
}: ThreadsProps) {
  const [userComments, setUserComments] = useState<CommentProps[]>([]);
  const [votes, setVotes] = useState<{ [key: number]: number | null }>({});
  const [fetchedComments, setFetchedComments] = useState<CommentProps[]>([]);
  const [userName, setUserName] = useState<string>("");
  console.log(comments);
  // useEffect(() => {
  //   const fetchUserSession = async () => {
  //     try {
  //       // Fetch session from the server-side API (which uses the `getSession` function)
  //       const response = await fetch("/api/getSession");
  //       const data = await response.json();
  //       if (data.user?.email) {
  //         setUserEmail(data.user.email);
  //       } else {
  //         console.error("Email not found in session.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user session:", error);
  //     }
  //   };

  //   fetchUserSession();
  // }, []);
  useEffect(() => {
    if (!email) return; // Only fetch username if userEmail is not empty
    const fetchUserName = async () => {
      try {
        const response = await fetch("/api/username", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUserName();
  }, [email]);

  console.log(userName);

  const handleAddComment = (newComment: CommentProps) => {
    setUserComments((prevComments) => [
      ...prevComments,
      { ...newComment, author: userName },
    ]);
  };

  const handleVoteChange = (commentId: string, newVoteLevel: number | null) => {
    updateVoteLevel(commentId, newVoteLevel);
  };

  const updateVoteLevel = (commentId: string, newVoteLevel: number | null) => {
    setUserComments((prevComments) =>
      prevComments.map((comment) =>
        String(comment.id) === commentId
          ? { ...comment, userVoteLevel: newVoteLevel }
          : comment
      )
    );
  };

  const pathname = usePathname();
  const slug = typeof pathname === "string" ? pathname.split("/").pop() || "" : "";



  // const updateVoteLevel = (commentId: string, newVoteLevel: number | null) => {
  //   setUserComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       String(comment.id) === commentId
  //         ? { ...comment, userVoteLevel: newVoteLevel }
  //         : comment
  //     )
  //   );
  // };
  const commentCount = comments.length + userComments.length;
  const allComments = [...comments, ...userComments];
  const sortedComments = allComments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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
              <span className="text-[#FFFFFF] font-semibold text-lg">
                Comments
              </span>
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
          <div className="space-y-1 p-2 pb-24">
            {sortedComments.map((comment) =>
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
                  onVoteChange={async (id: number, level: number | null) => {
                    updateVoteLevel(String(id), level);
                    await onVoteUpdate(); // Add this line
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Fixed Comment Input at Bottom */}
        <div className="fixed bottom-0 left-2 right-0 w-[93%] bg-neutral-800 border-t border-neutral-800 px-1 py-1 rounded-lg">
          <AddCommentPill
            onAddComment={handleAddComment}
            slug={slug}
            email={email}
          />
        </div>
      </div>
    </div>
  );
}
