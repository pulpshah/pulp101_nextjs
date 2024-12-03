"use client";

import { useEffect, useState } from "react";
import TopPill from "./TopPill/top-pill";
import Threads from "./TopPill/Threads";
import { usePathname } from "next/navigation";
// import { Comment } from "../lib/types";

interface CommentSectionProperties {
  email: string;
}
type Comment= {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: Comment[];
  userVoteLevel: number|null;
  isTopLevel: boolean,
  }

type CommentProps = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: Comment[];
  userVoteLevel: number|null;
  isTopLevel: boolean,
};

export default function CommentsSection({email }: CommentSectionProperties) {
  const [showComments, setShowComments] = useState(false);
  const [expandComments, setExpandComments] = useState(false);
  const [disableScroll, setDisableScroll] = useState(false);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (createdAt: { day: any, month: any, year: any, hour: any, minute: any, second: any }): string => {
    const currentDate = new Date();
    const date = new Date(
      createdAt.year.low,
      createdAt.month.low - 1, // Month is 0-based
      createdAt.day.low,
      createdAt.hour.low,
      createdAt.minute.low,
      createdAt.second.low
    );
    const secondsAgo = Math.floor((currentDate.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (secondsAgo < 60) return rtf.format(-secondsAgo, "second");
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return rtf.format(-minutesAgo, "minute");
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return rtf.format(-hoursAgo, "hour");
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) return rtf.format(-daysAgo, "day");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const convertComments = (array: any[]): Comment[] => {
  const commentMap: { [key: string]: Comment } = {};
  const topLevelComments: Comment[] = [];

  array.forEach((item) => {
    const comment: Comment = {
      id: item.id,
      author: item.author,         // Keep the author/username
      text: item.text,
      createdAt: formatDate(item.createdAt),
      replies: [],
      userVoteLevel: item.userVoteLevel,
      isTopLevel: !item.parentId  
    };

    commentMap[item.id] = comment;

    if (item.parentId) {
      commentMap[item.parentId]?.replies.push(comment);
    } else {
      topLevelComments.push(comment);
    }
  });
  return topLevelComments;
};

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
            body: JSON.stringify({ slug: slug,
            userEmail: email, }),
          });

          const data = await response.json();
          if (response.ok) {
            setComments(convertComments(data));
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
              email={email}
            />
        </div>
      )}
    </>
  );
}
