'use client';

import React from 'react';

interface DropdownProps {
  position: { top: number; left: number };
  onSelect: (option: string) => void;
}

const TextSelectionDropdown: React.FC<DropdownProps> = ({ position, onSelect }) => {
  const options = [
    'Save to pill',
    'Ask AI',
    'Add to comment',
    'See related',
  ];

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 text-sm"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TextSelectionDropdown;
