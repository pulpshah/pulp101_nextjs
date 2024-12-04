// components/TopPill/TopPill.tsx
import CommentsButton from './CommentsButton';
import AIButton from './AIButton';
import TVButton from './TVButton';


export default function TopPill({
  onCommentsClick,
  commentsOpen,
}: {
  onCommentsClick: () => void;
  commentsOpen: boolean;
}) {
  return (
    <div className="top-pill bg-[#2E2E2E]/80 flex flex-row items-center justify-between rounded-[16px] px-[10px] gap-[20px] max-w-[132px] w-full h-[32px]">
      <CommentsButton onClick={onCommentsClick} isOpen={commentsOpen} />
      <AIButton />
      <TVButton />
    </div>
  );
}
// import CommentsButton from './CommentsButton';
// import AIButton from './AIButton';
// import TVButton from './TVButton';
// import DraggableWrapper from './DraggableWrapper';

// export default function TopPill({
//   onCommentsClick,
//   commentsOpen,
// }: {
//   onCommentsClick: () => void;
//   commentsOpen: boolean;
// }) {
//   return (
//     <DraggableWrapper>
//       <div className="top-pill bg-[#2E2E2E]/80 flex flex-row items-center justify-between rounded-[16px] px-[10px] gap-[20px] max-w-[132px] w-full h-[32px]">
//         <CommentsButton onClick={onCommentsClick} isOpen={commentsOpen} />
//         <AIButton />
//         <TVButton />
//       </div>
//     </DraggableWrapper>
//   );
// }