"use client";

import { useState } from "react";
import TopPill from "@/components/top-pill";
import Threads from "@/components/threads";

export default function CommentsSection() {
  const [showComments, setShowComments] = useState(false);
  const [expandComments, setExpandComments] = useState(false);

  const handleCommentsClick = () => {
    setShowComments((prevState) => !prevState); // Toggle comments visibility
  };

  const handleDockLineClick = () => {
    setExpandComments((prevState) => !prevState); // Toggle comment expansion
  };

  return (
    <>
      {/* TopPill is fixed at the top of the screen */}
      <div className="fixed top-15 left-1/2 transform -translate-x-1/2 z-[50]">
        <TopPill onCommentsClick={handleCommentsClick} commentsOpen={showComments} />
      </div>

      {/* Comments section slides up from the bottom with a high z-index */}
      {showComments && (
        <div
          className={`fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-[60px] shadow-lg transition-transform z-[100] ${
            expandComments ? "translate-y-0 h-[80%]" : "translate-y-[75%] h-[25%]"
          }`}
        >
          <Threads onDockLineClick={handleDockLineClick} isExpanded={expandComments} />
        </div>
      )}
    </>
  );
}
