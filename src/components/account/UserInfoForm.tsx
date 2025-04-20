// ============================================
// File Purpose: Main user info form component for profile editing 
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// ============================================

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TagList from '@/components/account/TagList';

const UserInfoForm = () => {
  const [formData, setFormData] = useState({
    fullName: 'Jill Anderson',
    dob: '1999-05-12',
    email: 'jill.anderson@example.com',
    phone: '+1 (555) 123-4567',
    laddersID: 'LFL-028475',
    discord: 'jillux#2025',
    school: 'MIT',
    major: 'Computer Science & Business Analytics',
    resume: '',
    interests: ['Traveling', 'UI Design', 'Productivity Tools'],
    address: '123 Brooklyn Ave, NY 11201',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="bg-[#1a1a1a] rounded-2xl shadow-sm p-6 space-y-6 border border-[#2c2c2c]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-white mb-2">
        📝 Account Information
      </h2>

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
              value={(formData as any)[field.name]}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300">Resume</label>
          <input
            type="file"
            name="resume"
            className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-400 hover:file:bg-orange-500/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300">Interests</label>
          <TagList tags={formData.interests} />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300">Home Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfoForm;
