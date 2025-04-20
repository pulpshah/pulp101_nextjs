// ============================================
// File Purpose: Create a modern, responsive user profile dashboard (with bio below sidebar)
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// ============================================

'use client';

import { useEffect } from 'react';
import ProfileSidebar from '@/components/account/ProfileSidebar';
import UserInfoForm from '@/components/account/UserInfoForm';
import Bio from '@/components/account/Bio';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-[#0d0d0d] text-white p-6">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl h-full">
            
            {/* Left Panel */}
            <div className="flex flex-col lg:w-1/3 w-full">
            <motion.div
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
                className="flex-grow mt-4"
            >
                <Bio />
            </motion.div>
            </div>

            {/* Right Panel */}
            <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/3 w-full h-full"
            >
            <UserInfoForm />
            </motion.div>
        </div>
        </main>

  );
}
