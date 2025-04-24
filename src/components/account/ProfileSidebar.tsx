// ============================================
// File Purpose: ProfileSidebar with editable modal, Neo4j persistence, and profile photo upload from both main and modal
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/24/2025
// ============================================

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiEdit, FiX } from 'react-icons/fi';
import ProgressCircle from '@components/ProgressCircle';

const ProfileSidebar = () => {
  const { data: session } = useSession();
  const defaultImage = session?.user?.image || '/images/avatar-placeholder.jpg';
  const defaultName = session?.user?.name || 'Your Name';

  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(defaultImage);
  const [role, setRole] = useState('Role');
  const [city, setCity] = useState('City');
  const [stateLoc, setStateLoc] = useState('State');
  const [quote, setQuote] = useState("Here's a quote about me");
  const [joinedDate, setJoinedDate] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const [tempImage, setTempImage] = useState<string>(profileImage);
  const [tempRole, setTempRole] = useState(role);
  const [tempCity, setTempCity] = useState(city);
  const [tempState, setTempState] = useState(stateLoc);
  const [tempQuote, setTempQuote] = useState(quote);

  // Fetch user data on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/account/profile');
      const data = await res.json();

      setRole(data.role || 'Role');
      setCity(data.city || 'City');
      setStateLoc(data.state || 'State');
      setQuote(data.quote || "Here's a quote about me");

      if (data.image) {
        setProfileImage(data.image);
        setTempImage(data.image);
      }

      if (data.createdAt) {
        const formatted = new Date(data.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        setJoinedDate(formatted);
      }
    };
    fetchData();
  }, []);

  const updateImage = async (imageUrl: string) => {
    await fetch('/api/account/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageUrl }),
    });
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fromModal = false
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);

      if (fromModal) {
        setTempImage(newImageUrl);
      } else {
        setProfileImage(newImageUrl);
      }

      await updateImage(newImageUrl);
    }
  };

  const handleSave = async () => {
    if (!tempRole || !tempCity || !tempState || !tempQuote) return;
    setProfileImage(tempImage);
    setRole(tempRole);
    setCity(tempCity);
    setStateLoc(tempState);
    setQuote(tempQuote);
    setShowModal(false);

    await fetch('/api/account/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: tempRole,
        city: tempCity,
        state: tempState,
        quote: tempQuote,
        image: tempImage,
      }),
    });
  };

  return (
    <motion.div
      className="relative min-h-[425px] bg-[#1f1f1f] rounded-2xl border border-[#2c2c2c] shadow-sm p-6 flex flex-col items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Edit Button */}
      <button
        onClick={() => {
          setTempImage(profileImage);
          setTempRole(role);
          setTempCity(city);
          setTempState(stateLoc);
          setTempQuote(quote);
          setShowModal(true);
        }}
        className="absolute top-4 right-4 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 p-2 rounded-full"
      >
        <FiEdit size={16} />
      </button>

      {/* Profile Picture */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-sm group">
        <Image
          src={profileImage}
          alt="Profile Picture"
          fill
          className="object-cover"
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
        >
          <FiEdit size={18} className="text-white" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleImageChange(e, false)}
          className="hidden"
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white">{defaultName}</h2>
        <p className="text-sm text-orange-400 font-medium">{role}</p>
        <p className="text-sm text-gray-400 mt-1">{`${city}, ${stateLoc}`}</p>
        <p className="text-xs text-gray-500 mt-0.5">Joined on {joinedDate || 'Invalid Date'}</p>
      </div>

      <p className="text-center text-sm text-gray-400 px-2 italic line-clamp-3 break-words max-w-xs">
        “{quote}”
      </p>

      {/* Meters */}
      <div className="flex gap-6 justify-center mt-3">
        <ProgressCircle label="Creativity" percent={80} />
        <ProgressCircle label="Communication" percent={70} />
        <ProgressCircle label="Focus" percent={90} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-6 w-full max-w-md relative space-y-4">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <FiX size={18} />
            </button>
            <h2 className="text-white text-lg font-semibold mb-2">Edit Profile</h2>

            {/* Modal Image Editor */}
            <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-orange-500 group">
              <Image src={tempImage} alt="Profile" fill className="object-cover" />
              <div
                onClick={() => modalFileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <FiEdit className="text-white" size={18} />
              </div>
              <input
                ref={modalFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, true)}
              />
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-3 mt-4">
              <label className="text-sm text-gray-300">Role</label>
              <input value={tempRole} onChange={(e) => setTempRole(e.target.value)} className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-md px-3 py-2 text-sm" />

              <label className="text-sm text-gray-300">Location</label>
              <div className="flex gap-2">
                <input value={tempCity} onChange={(e) => setTempCity(e.target.value)} placeholder="City" className="w-1/2 bg-[#0d0d0d] border border-[#333] text-white rounded-md px-3 py-2 text-sm" />
                <input value={tempState} onChange={(e) => setTempState(e.target.value)} placeholder="State" className="w-1/2 bg-[#0d0d0d] border border-[#333] text-white rounded-md px-3 py-2 text-sm" />
              </div>

              <label className="text-sm text-gray-300">Quote</label>
              <textarea value={tempQuote} onChange={(e) => setTempQuote(e.target.value.slice(0, 100))} rows={2} className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded-md px-3 py-2 text-sm" />
            </div>

            {/* Save / Cancel */}
            <div className="flex justify-end mt-6 gap-2">
              <button onClick={() => setShowModal(false)} className="text-sm px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleSave} className="text-sm px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileSidebar;
