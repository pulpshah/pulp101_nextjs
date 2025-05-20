'use client';

import React, { useState, useEffect } from 'react';
import TopPill from './top-pill';
import CommentsSection from './Comment System/comments-section';
import AIChats from './AI System/AIChats';

interface TopPillManagerProps {
  email: string;
  aiInitialInput?: string | null;
}

export default function TopPillManager({ email, aiInitialInput }: TopPillManagerProps) {
  const [activePanel, setActivePanel] = useState<'comments' | 'aiChats' | null>(null);
  const [currentEmbeddedText, setCurrentEmbeddedText] = useState<string | null>(null);

  useEffect(() => {
    if (aiInitialInput) {
      setCurrentEmbeddedText(aiInitialInput); // Update embedded text
      setActivePanel('aiChats'); // Open AIChats
    }
  }, [aiInitialInput]);

  const handleCommentsClick = () => {
    setActivePanel((prev) => (prev === 'comments' ? null : 'comments'));
  };

  const handleAIChatsClick = () => {
    setActivePanel((prev) => (prev === 'aiChats' ? null : 'aiChats'));
  };

  const handleClose = () => {
    setActivePanel(null);
    setCurrentEmbeddedText(null); // Clear embedded text on close
  };
  return (
    <>
      {/* TopPill for toggling Comments and AI Chats */}
      <div className="fixed top-15 left-1/2 transform -translate-x-1/2 z-[9999]">
        <TopPill
          onCommentsClick={handleCommentsClick}
          onAIChatsClick={handleAIChatsClick}
          commentsOpen={activePanel === 'comments'}
          aiChatsOpen={activePanel === 'aiChats'}
        />
      </div>

      {/* Render either CommentsSection or AIChats based on activePanel */}
      {activePanel === 'comments' && (
        <CommentsSection email={email} onClose={handleCommentsClick} />
      )}

      {activePanel === 'aiChats' && (
        <AIChats email={email} onClose={handleClose} initialInput={currentEmbeddedText} />
      )}
    </>
  );
}
