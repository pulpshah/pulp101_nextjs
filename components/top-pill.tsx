// import Image from "next/image";

// export default function TopPill({
//   onCommentsClick,
//   commentsOpen,
// }: {
//   onCommentsClick: () => void;
//   commentsOpen: boolean;
// }) {
//   return (
//     <div className="top-pill bg-[#2E2E2E]/80 flex flex-row items-center justify-between rounded-[16px] px-[10px] gap-[20px] max-w-[132px] w-full h-[32px]">
//       <div className="w-[24px] h-[24px]">
//         <button onClick={onCommentsClick}>
//           <Image
//             src={commentsOpen ? "/icons/comments-filled-icon.svg" : "/icons/comments-icon.svg"}
//             alt="Comments"
//             width={24}
//             height={24}
//           />
//         </button>
//       </div>
//       <div className="w-[24px] h-[24px]">
//         <button>
//           <Image src="/icons/ai-icon.svg" alt="AI" width={24} height={24} />
//         </button>
//       </div>
//       <div className="w-[24px] h-[24px]">
//         <button>
//           <Image src="/icons/tv-icon.svg" alt="TV" width={24} height={24} />
//         </button>
//       </div>
//     </div>
//   );
// }
