// components/TopPill/TVButton.tsx
import Image from "next/image";

export default function TVButton() {
  return (
    <div className="w-[24px] h-[24px]">
      <button>
        <Image src="/icons/tv-icon.svg" alt="TV" width={24} height={24} />
      </button>
    </div>
  );
}
