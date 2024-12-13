'use client';

import React, { useState, useEffect } from 'react';
import TextSelectionDropdown from './TextSelectionDropdown';
import TopPillManager from '../TopPill/TopPillManager';

export default function ToolbarOverlay({ children }: { children: React.ReactNode }) {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [aiInitialInput, setAIInitialInput] = useState<string | null>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(selection.toString());
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
      setSelectedText(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    return () => document.removeEventListener('mouseup', handleTextSelection);
  }, []);

  const handleOptionSelect = (option: string) => {
    if (option === 'Ask AI') {
      setAIInitialInput(selectedText); // Set the initial input
    }

    setIsDropdownVisible(false);
    setSelectedText(null);
  };

  return (
    <>
      <div className="flex justify-center">
        <TopPillManager email="user@example.com" aiInitialInput={aiInitialInput} />
      </div>

      <div className="relative">
        {children}
        {isDropdownVisible && (
          <TextSelectionDropdown
            position={dropdownPosition}
            onSelect={handleOptionSelect}
          />
        )}
      </div>
    </>
  );
}
