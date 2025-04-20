// ============================================
// File Purpose: Profile card (editable image upload)
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// ============================================

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';

const ProfileSidebar = () => {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultImage = session?.user?.image || '/images/avatar-placeholder.jpg';
  const [profileImage, setProfileImage] = useState<string>(defaultImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);
    }
  };

  return (
    <motion.div
      className="bg-[#1f1f1f] rounded-2xl border border-[#2c2c2c] shadow-sm p-6 flex flex-col items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Profile Picture */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-sm group">
      {profileImage.startsWith('blob:') ? (
      <img
        src={profileImage}
        alt="Profile Picture"
        className="object-cover w-full h-full"
      />
        ) : (
          <Image
            src={profileImage}
            alt="Profile Picture"
            fill
            className="object-cover"
          />
        )}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
        >
          <Pencil size={18} className="text-white" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white">{session?.user?.name || 'Your Name'}</h2>
        <p className="text-sm text-orange-400 font-medium">UI Designer</p>
        <p className="text-sm text-gray-400 mt-1">Brooklyn, NY</p>
        <p className="text-xs text-gray-500 mt-0.5">Joined on 3rd June 2024</p>
      </div>

      <p className="text-center text-sm text-gray-400 px-2 italic">
        “I’m looking for a site that will simplify the planning of my business trips.”
      </p>

      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {['Organized', 'Hardworking', 'Protective', 'Passionate'].map((tag) => (
          <span
            key={tag}
            className="bg-orange-500/10 text-orange-400 text-xs font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;
