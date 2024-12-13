  import Image from "next/image";
  import { useState } from "react";
  import EmojiCarousel from "./emoji-carousel"; // Import the shared EmojiCarousel

  type SelfCommentProps = {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    email:string;
    isExpanded: boolean;
    initialReplies?: { id: number; author: string; text: string; createdAt: string }[];
  };

  export default function SelfComment({
    id,
    author,
    email,
    text,
    createdAt,
    isExpanded,
    initialReplies = [], // Initialize with empty array if no replies
  }: SelfCommentProps) {
    const [replies, setReplies] = useState(initialReplies);
    const [reactions, setReactions] = useState<{ [key: string]: number }>({});
    const [isEmojiCarouselOpen, setIsEmojiCarouselOpen] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState<boolean>(false); // Toggle replies
    const [replyText, setReplyText] = useState<string>(""); // Input for new reply
    const [isReplying, setIsReplying] = useState<boolean>(false);

    const handleReplySubmit = async () => {
      console.log(id);
      console.log(email);
      console.log(replyText);
      if (!replyText.trim()) return;
    
      try {
        // Send reply to the backend
        const response = await fetch("/api/addReplyToComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId: id, // Use the current comment's ID
            text: replyText,
            email: email, // Assume the current user's email or username
          }),
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
          throw new Error(responseData.error || "Failed to submit reply");
        }
    
        // Update local state with the new reply
        const newReply = {
          id: responseData.id || Date.now(), // Fallback to timestamp if no ID returned
          author: author,
          text: replyText,
          createdAt: new Date().toISOString(),
        };
    
        setReplies((prevReplies) => [...prevReplies, newReply]);
        setReplyText(""); // Clear the input field
        setIsReplying(false);
        setShowReplies(true); // Automatically show replies after adding
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    };
    

    const emojiList = ["👍", "👎", "❤️", "😂", "😢", "🤓", "🙉"];

    const handleReaction = (emoji: string) => {
      setReactions((prev) => {
        const currentCount = prev[emoji] || 0;
        return { ...prev, [emoji]: currentCount + 1 };
      });
    };

    const handleReactionClick = (emoji: string) => {
      setReactions((prev) => {
        const currentCount = prev[emoji] || 0;
        if (currentCount > 0) {
          const updatedReactions = { ...prev, [emoji]: currentCount - 1 };
          if (updatedReactions[emoji] === 0) {
            delete updatedReactions[emoji];
          }
          return updatedReactions;
        }
        return prev;
      });
    };

    return (
  // <div className={`self-comment-wrapper relative w-full transition-all duration-300`}>
  //   <div className="flex flex-row items-center gap-[8px] text-white transition-all duration-300 w-full">
  //     {/* Comment Box */}
  //     <div className="w-full flex flex-col px-[10px] py-[10px] gap-[6px] bg-[#2E2E2E] border-[0.5px] border-[#7D7B7C] rounded-[10px] transition-all duration-300">
  //       <div className="flex justify-between items-start w-full">
  //         <div className="flex items-center gap-[4px] py-[2px]">
  //           <p className="font-bold">You</p>
  //         </div>
  //         <div className="flex gap-[10px]">
  //               <button onClick={() => setIsReplying(!isReplying)}>
  //                 <Image src="/icons/reply-white-icon.svg" alt="Reply" width={19} height={19} />
  //               </button>
  //         </div>
  //       </div>

  //       {/* Comment Text */}
  //       <p>{text}</p>
        
  //       {/* Reactions */}
  //       {isExpanded && (
  //         <div className="flex items-center mt-[8px]">
  //           <div className="flex flex-wrap gap-[10px]">
  //             {Object.entries(reactions).map(([emoji, count]) => (
  //               <button key={emoji} onClick={() => handleReactionClick(emoji)} className="flex items-center px-[7px] py-[1px] border-[0.5px] border-[#7D7B7C] rounded-[5px] bg-[#000000]/80 backdrop-blur-[4px] shadow-sm">
  //                 {count} {emoji}
  //               </button>
  //             ))}
  //           </div>
  //           <div className="flex items-center gap-[8px] ml-auto min-w-[150px]">
  //             <div className="font-bold">
  //             <div className="flex items-center gap-2">
  //                       <button
  //                         onClick={() => setShowReplies((prev) => !prev)}
  //                         className="font-bold text-blue-500 text-sm hover:underline"
  //                       >
  //                         {showReplies ? "Hide Replies" : `${replies.length} Replies`}
  //                       </button>

  //                       <button
  //                         onClick={() => setIsReplying((prev) => !prev)}
  //                         className="font-bold text-blue-500 text-sm hover:underline"
  //                       >
  //                         {isReplying ? "Cancel" : "Reply"}
  //                       </button>
  //                     </div>


  //             </div>
  //             <div className="flex -space-x-[7px]">
  //               <Image src="/profiles/profile_pic_1.png" alt="Profile" width={24} height={24} className="rounded-full border-[2px] border-white" />
  //               <Image src="/profiles/profile_pic_2.png" alt="Profile" width={24} height={24} className="rounded-full border-[2px] border-white" />
  //               <Image src="/profiles/profile_pic_3.png" alt="Profile" width={24} height={24} className="rounded-full border-[2px] border-white" />
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>

  //     <div>
  //       <Image src="/profiles/profile_pic_4.png" alt="You" width={34} height={34} />
  //     </div>
  //   </div>

  //   {/* Emoji Carousel */}
  //   {isExpanded && isEmojiCarouselOpen && (
  //     <div className="flex justify-start mt-[5px]">
  //       <EmojiCarousel emojiList={emojiList} onReaction={handleReaction} />
  //     </div>
  //   )}
  //   {/* Reply Input */}
  //   {isReplying && (
  //         <div className="mt-4 ml-8">
  //           <input
  //             type="text"
  //             value={replyText}
  //             onChange={(e) => setReplyText(e.target.value)}
  //             placeholder="Write your reply..."
  //             className="flex-1 p-2 border border-gray-300 rounded-lg bg-white text-black"
  //           />
  //           <button
  //             onClick={handleReplySubmit}
  //             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
  //           >
  //             Submit
  //           </button>
  //         </div>
  //       )}

  //       {/* Replies Section */}
  //       {showReplies && (
  //         <div className="mt-4 ml-8 space-y-4">
  //           {replies.map((reply) => (
  //             <div key={reply.id} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
  //               <Image
  //                 src="/profiles/profile_pic_1.png"
  //                 alt="Profile"
  //                 width={32}
  //                 height={32}
  //                 className="rounded-full"
  //               />
  //               <div className="flex-1">
  //                 <p className="text-sm font-bold text-gray-300">{reply.author}</p>
  //                 <p className="text-sm text-gray-400 mt-1">{reply.text}</p>
  //                 <span className="text-xs text-gray-500 mt-2 block">{reply.createdAt}</span>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  // </div>
  //   );
  <div className="mb-2">
  <div className="flex items-start gap-2">
    {/* Main Comment Box - Made narrower to accommodate profile pic */}
    <div className="flex-1">
      <div className="bg-[#2E2E2E] rounded-xl p-3 border border-white/10">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{author}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="opacity-100 hover:opacity-100 transition-opacity">
              <Image
                src="/icons/reaction-icon.svg"
                alt="Reaction"
                width={19}
                height={19}
                className="invert brightness-0"
              />
            </button>
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/icons/reply-icon.svg"
                alt="Reply"
                width={19}
                height={19}
                className="invert brightness-0 invert(1)"
              />
            </button>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-white text-[15px] mb-3">{text}</p>

        {/* Footer with Reply Count - Removed profile pics from here */}
        <div className="flex items-center justify-end">
          <button 
            onClick={() => setShowReplies(!showReplies)}
            className="text-[white] text-sm hover:text-[white] transition-colors"
          >
            {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
          </button>
        </div>
      </div>
    </div>

    {/* Profile Pictures - Moved outside and to the right */}
    {/* {replies.length > 0 && (
      <div className="flex -space-x-2 self-end">
        <Image
          src="/profiles/profile_pic_1.png"
          alt="Profile"
          width={25}
          height={25}
          className="rounded-full border-2 border-[#2E2E2E]"
        />
        <Image
          src="/profiles/profile_pic_2.png"
          alt="Profile"
          width={25}
          height={25}
          className="rounded-full border-2 border-[#2E2E2E]"
        />
      </div>
    )} */}
    {replies.length >= 0 && (
  <div className="flex -space-x-2 self-end">
    <Image
      src="/profiles/profile_pic_1.png"
      alt="Profile"
      width={25}
      height={25}
      className="rounded-full border-2 border-[#2E2E2E]"
    />
    {replies.length > 1 && (
      <Image
        src="/profiles/profile_pic_2.png"
        alt="Profile"
        width={25}
        height={25}
        className="rounded-full border-2 border-[#2E2E2E]"
      />
    )}
  </div>
)}
  </div>

      {/* Reply Input */}
      {isReplying && (
        <div className="mt-2 ml-8">
          <div className="bg-[#2E2E2E] rounded-xl p-3 border border-white/10">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full bg-transparent text-white border-none outline-none text-sm"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleReplySubmit}
                className="px-4 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replies Section */}
      {showReplies && replies.length > 0 && (
  <div className="ml-4 mt-2 space-y-2">
    {replies.map((reply) => (
      <div key={reply.id} className="flex gap-3">
        <div className="flex flex-col justify-end pb-2">
          <Image
            src="/profiles/profile_pic_1.png"
            alt="Profile"
            width={25}
            height={25}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 bg-[#2E2E2E] rounded-xl p-3 border border-white/10">
          <div className="mb-1">
            <span className="text-white font-medium">{reply.author}</span>
          </div>
          <p className="text-white text-sm">{reply.text}</p>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
  }
