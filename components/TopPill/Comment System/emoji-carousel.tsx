import React from 'react';

interface EmojiCarouselProps {
  emojiList: string[];
  onReaction: (emoji: string) => void;
}

const EmojiCarousel: React.FC<EmojiCarouselProps> = ({ emojiList, onReaction }) => {
  return (
    <div className="flex flex-col w-auto gap-[10px] justify-end items-end">
      <div className="flex flex-col gap-[6px] px-[10px] py-[10px] rounded-[10px] bg-white border-[#7D7B7C] border-[0.5px]">
        <div className="flex flex-row gap-[10px] items-start justify-start w-full">
          {emojiList.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onReaction(emoji)}
              className="emoji-button flex flex-row justify-center items-center gap-[10px] px-[7px] py-[1px] rounded-[5px] bg-white/80 border-[#7D7B7C] border-[0.5px] backdrop-blur-[4px]"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiCarousel;
