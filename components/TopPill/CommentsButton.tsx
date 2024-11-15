import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CommentsButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <>
    <div className="flex flex-col items-center">
      <button onClick={onClick} className="flex items-center justify-center w-8 h-8">
        <Image
           src={isOpen ? "/icons/comments-filled-icon.svg" : "/icons/comments-icon.svg"}
          alt="Comments"
          width={24}
          height={24}
        />
      </button>
      </div>
    </>
  );
}
