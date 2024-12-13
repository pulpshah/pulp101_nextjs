// components/TopPill/AIButton.tsx
import Image from "next/image";

export default function AIButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <div className="w-[24px] h-[24px]">
      <button onClick={onClick}>
        <Image src={isOpen ? "/icons/ai-filled-icon.svg" : "/icons/ai-icon.svg"} alt="AI" width={24} height={24} />
      </button>
    </div>
  );
}
