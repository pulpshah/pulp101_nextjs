"use client"

import { useState } from "react";
import TopPill from "@/components/top-pill";
import Threads from "@/components/threads";

export default function CommentsSection() {
  const [showComments, setShowComments] = useState(false);
  const [expandComments, setExpandComments] = useState(false);
  const [disableScroll, setDisableScroll] = useState(false);

  const handleCommentsClick = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleDockLineClick = () => {
    setExpandComments((prevState) => !prevState);
  };

  const handleDisableScroll = (disable: boolean) => setDisableScroll(disable);

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
