// ============================================
// File Purpose: Modern profile layout with vertical alignment improvements
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

'use client';

import { useEffect, useRef, useState } from 'react';
import ProfileSidebar from '@/components/account/ProfileSidebar';
import UserInfoForm from '@/components/account/UserInfoForm';
import Bio from '@/components/account/Bio';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [bioHeight, setBioHeight] = useState<number | null>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const profileSidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (rightPanelRef.current && profileSidebarRef.current) {
        const rightHeight = rightPanelRef.current.offsetHeight;
        const profileHeight = profileSidebarRef.current.offsetHeight;
        const remainingHeight = rightHeight - profileHeight - 12;
    
        setBioHeight(remainingHeight > 0 ? remainingHeight : null);
      }
    };    

    // Trigger once on mount
    calculateHeight();

    // Observe Sidebar changes in real-time
    const resizeObserver = new ResizeObserver(() => {
      calculateHeight();
    });

    if (profileSidebarRef.current) {
      resizeObserver.observe(profileSidebarRef.current);
    }

    window.addEventListener('resize', calculateHeight);

    return () => {
      if (profileSidebarRef.current) {
        resizeObserver.unobserve(profileSidebarRef.current);
      }
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return (
    <main className="flex items-start justify-center min-h-screen bg-[#0d0d0d] text-white p-6 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl items-start">
        
        {/* Left Panel */}
        <div className="flex flex-col lg:w-1/3 w-full">
          <motion.div
            ref={profileSidebarRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileSidebar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3"
          >
            <Bio customHeight={bioHeight} />
          </motion.div>
        </div>

        {/* Right Panel */}
        <motion.div
          ref={rightPanelRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-2/3 w-full"
        >
          <UserInfoForm />
        </motion.div>
      </div>
    </main>
  );
}
