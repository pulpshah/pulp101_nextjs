// ============================================
// File Purpose: Cinematic hero with logo zoom, video fade, typing, and scroll lock
// Original Author: Mohammed Ihtisham
// Last Updated By: Assistant
// Last Updated On: 05/07/2025
// ============================================

'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const subtext =
  'Your all-in-one platform to onboard faster, write better documentation, and empower dev teams to move with clarity.';

const ScrollVideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stage, setStage] = useState<'initial' | 'zoomed' | 'final'>('initial');
  const [typedText, setTypedText] = useState('');

  // 🚫 Lock scroll + reset scroll position BEFORE paint
  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      document.body.style.overflow = 'auto'; // cleanup if unmounted
    };
  }, []);

  // 🎬 Run animations + unlock scroll after typing
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
    }

    setTimeout(() => setStage('zoomed'), 2000); // slower logo zoom
    setTimeout(() => setStage('final'), 2600);  // fast background fade
  }, []);

  // ✍️ Typing + scroll unlock AFTER typing finishes
  useEffect(() => {
    if (stage !== 'final') return;

    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + subtext[i]);
      i++;
      if (i >= subtext.length) {
        clearInterval(interval);
        document.body.style.overflow = 'auto'; // ✅ re-enable scroll
      }
    }, 30);

    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* 🎥 Background Video */}
      <motion.video
        ref={videoRef}
        src="/videos/pulp_intro.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        loop
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'final' ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* ✨ Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">

        {/* 🔍 Zooming Logo */}
        <motion.img
          src="/images/pulp101-logo.svg"
          alt="Pulp101 Logo"
          className="w-[24rem] max-w-[90vw] h-auto drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0, y: 0 }}
          animate={{ scale: 2.5, opacity: 1, y: -50 }}
          transition={{ duration: 2 }}
          style={{ display: stage !== 'final' ? 'block' : 'none' }}
        />

        {/* ✅ Final Logo + Subtext */}
        {stage === 'final' && (
          <>
            <motion.img
              src="/images/pulp101-logo.svg"
              alt="Pulp101 Small Logo"
              className="w-[14rem] max-w-[80vw] h-auto mb-8 drop-shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />

            <motion.p
              className="text-3xl font-light max-w-4xl mx-auto text-gray-200 leading-snug whitespace-pre-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {typedText}
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
};

export default ScrollVideoHero;
