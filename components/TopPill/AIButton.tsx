// components/TopPill/AIButton.tsx
import Image from "next/image";

export default function AIButton() {
  return (
    <div className="w-[24px] h-[24px]">
      <button>
        <Image src="/icons/ai-icon.svg" alt="AI" width={24} height={24} />
      </button>
    </div>
  );
}
