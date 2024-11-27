import React, { useState } from "react";

interface ConfidenceLevelModalProps {
  onSelectLevel: (level: number, color: string) => void;
  isAgreement: boolean;
  onClose: () => void;
}

export default function ConfidenceLevelModal({
  onSelectLevel,
  isAgreement,
  onClose,
}: ConfidenceLevelModalProps) {
  const levels = isAgreement
    ? ["#83FF5ACC", "#A1FF83CC", "#BFFFAACC", "#DAFFCECC"]
    : ["#FF5A5ACC", "#FF8383CC", "#FFAAAACC", "#FFCECECC"];

  const [selectedLevel, setSelectedLevel] = useState(0);

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    setTimeout(() => onSelectLevel(level, levels[levels.length - level]), 300);
  };

  const selectLevelFromPosition = (clientY: number, rectTop: number, rectHeight: number) => {
    const newLevel = Math.min(
      levels.length,
      Math.max(1, levels.length - Math.floor(((clientY - rectTop) / rectHeight) * levels.length))
    );
    setSelectedLevel(newLevel);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    selectLevelFromPosition(e.clientY, rect.top, rect.height);

    const handleMouseMove = (e: MouseEvent) => {
      selectLevelFromPosition(e.clientY, rect.top, rect.height);
    };

    const handleMouseUp = () => {
      handleLevelSelect(selectedLevel);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    selectLevelFromPosition(e.touches[0].clientY, rect.top, rect.height);

    const handleTouchMove = (e: TouchEvent) => {
      selectLevelFromPosition(e.touches[0].clientY, rect.top, rect.height);
    };

    const handleTouchEnd = () => {
      handleLevelSelect(selectedLevel);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md z-[200]" onClick={onClose}>
      {/* Modal container that stops propagation to prevent closing when clicking inside */}
      <div
        className="w-[70px] h-[240px] flex flex-col rounded-[24px] overflow-hidden border-[1px] border-[#7D7B7C]"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {levels.map((color, index) => (
          <div
            key={index}
            className={`w-full h-[25%] transition-colors border-[#7D7B7C] border-[1px] duration-300 ${
              index === 0 ? "rounded-t-[24px]" : ""
            } ${index === levels.length - 1 ? "rounded-b-[24px]" : ""}`}
            style={{
              backgroundColor: levels.length - index <= selectedLevel ? color : "#2E2E2ECC",
            }}
            onClick={() => handleLevelSelect(levels.length - index)}
          />
        ))}
      </div>
    </div>
  );
}
