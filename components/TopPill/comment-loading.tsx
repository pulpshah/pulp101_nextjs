import React from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  hasVoted: "valid" | "invalid" | null;
}

const CommentLoadingScreen: React.FC<LoadingScreenProps> = ({ hasVoted }) => {
  return (
    <div className="flex flex-row items-end gap-[8px] w-full"> 
      <div>
        <Image 
          src="/profiles/profile_pic_loading.png"
          alt="loading"
          width={34}
          height={34}
        />
      </div>
      <div className="w-full h-auto flex flex-col items-center gap-[6px] px-[10px] py-[10px] rounded-[10px] border border-[#7D7B7C] border-[0.5px] bg-white shadow-loading">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row py-[2px] rounded-[10px] bg-[#E7E7E7]">
            <p className="opacity-0">Username</p>
            <Image
              src={`/icons/${hasVoted}-colored-icon.svg`}
              alt={hasVoted === "valid" ? "Valid" : "Invalid"}
              width={24}
              height={24}
              className="opacity-0"
            />
          </div>
          <div className="py-[2px] rounded-[10px] bg-[#E7E7E7]">
            <p className="opacity-0">reply</p>
          </div>
        </div>
        <div className="flex flex-col gap-[6px] w-full">
          <div className="bg-[#E7E7E7] rounded-[10px] w-full">
            <p className="opacity-0">.</p>
          </div>
          <div className="bg-[#E7E7E7] rounded-[10px] w-4/5">
            <p className="opacity-0">.</p>
          </div>
          <div className="bg-[#E7E7E7] rounded-[10px] w-9/10">
            <p className="opacity-0">.</p>
          </div>
          <div className="bg-[#E7E7E7] rounded-[10px] w-4/5">
            <p className="opacity-0">.</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row gap-[8px] justify-start">
            <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
              <p className="opacity-0">2 👍</p>
            </div>
            <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
              <p className="opacity-0">10 🤓</p>
            </div>
          </div>
          <div className="flex flex-row gap-[6px] justify-start">
            <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
              <p className="opacity-0">102 replies</p>
            </div>
            <div className="bg-[#E7E7E7] rounded-[10px] w-auto justify-center">
              <p className="opacity-0">...............</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentLoadingScreen;
