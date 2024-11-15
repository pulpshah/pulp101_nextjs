"use client";

import { useEffect, useState } from "react";
import TopPill from "./TopPill/top-pill";
import Threads from "./TopPill/Threads";
import { usePathname } from "next/navigation";
import { Comment } from "./types";

type CommentProps = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: CommentProps[];
};

export default function CommentsSection() {
  const [showComments, setShowComments] = useState(false);
  const [expandComments, setExpandComments] = useState(false);
  const [disableScroll, setDisableScroll] = useState(false);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCommentsClick = () => {
    setShowComments((prevState) => !prevState);
  };
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();

  const handleDockLineClick = () => {
    setExpandComments((prevState) => !prevState);
  };

  const handleDisableScroll = (disable: boolean) => setDisableScroll(disable);

  useEffect(() => {
    const fetchData = async () => {
      if (showComments && slug) {
        setLoading(true);
        try {
          const response = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          });

          const data = await response.json();
          if (response.ok) {
            setComments(data as Comment[]); // Ensure the response matches the `Comment` type
          } else {
            console.error("Error fetching comments:", data.error);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [showComments, slug]);
  console.log(comments);

  return (
    <>
      <div className="fixed top-15 left-1/2 transform -translate-x-1/2 z-[50]">
        <TopPill onCommentsClick={handleCommentsClick} commentsOpen={showComments} />
      </div>

      {showComments && (
        <div
          className={`fixed bottom-0 left-0 w-full transition-transform z-[100] bg-[#FFFFFF]/80 backdrop-blur-[60px] shadow-threads ${
            expandComments ? "max-h-[80vh]" : "max-h-[20vh]"
          }`}
        >
            <Threads
              comments={comments}
              onDockLineClick={handleDockLineClick}
              isExpanded={expandComments}
              disableScroll={disableScroll}
              onDisableScroll={handleDisableScroll}
            />
        </div>
      )}
    </>
  );
}
