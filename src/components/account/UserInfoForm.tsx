// ============================================
// File Purpose: Account settings form with persistent Neo4j profile sync
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TagList from '@/components/account/TagList';

const UserInfoForm = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    laddersID: '',
    discord: '',
    school: '',
    major: '',
    resume: '',
    interests: [] as string[],
    address: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/account/profile');
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert("Name and email are required.");
      return;
    }

    try {
      const res = await fetch('/api/account/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(await res.text());

      setFormData((prev) => ({ ...prev }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving account info:', error);
      alert('There was an issue saving your account information.');
    }
  };

  return (
    <motion.div
      className="bg-[#1a1a1a] rounded-2xl shadow-sm p-6 space-y-6 border border-[#2c2c2c] min-h-[665px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Account Information</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-orange-400 hover:text-orange-300 transition-all text-sm font-medium"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Date of Birth', name: 'dob', type: 'date' },
          { label: 'Email Address', name: 'email', type: 'email' },
          { label: 'Phone Number', name: 'phone', type: 'tel' },
          { label: 'Ladders for Leaders ID', name: 'laddersID', type: 'text' },
          { label: 'Discord Tag', name: 'discord', type: 'text' },
          { label: 'School / Education', name: 'school', type: 'text' },
          { label: 'Major(s)/Minor(s)', name: 'major', type: 'text' },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-sm font-medium text-gray-300">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              disabled={!isEditing}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300">Home Address</label>
          <input
            type="text"
            name="address"
            disabled={!isEditing}
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300">Resume</label>
          <input
            type="text"
            name="resume"
            disabled={!isEditing}
            value={formData.resume}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Interests</label>
          <TagList
            tags={formData.interests}
            editable={isEditing}
            onChange={(updated) =>
              setFormData((prev) => ({ ...prev, interests: updated }))
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfoForm;
