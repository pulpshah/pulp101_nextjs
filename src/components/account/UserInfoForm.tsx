// ============================================
// File Purpose: User info form with styled interest section and edit toggle
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiUserCheck, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import Modal from '@/components/ui/Modal';

const UserInfoForm = () => {
  const { data: session } = useSession();
  const interestInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

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
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.user.name || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      if (!formData.fullName.trim() || !formData.email.trim()) {
        alert('Full Name and Email cannot be empty.');
        return;
      }
  
      // Proceed with save to Neo4j here
      console.log('Saving changes to Neo4j...', formData);
    }
  
    setIsEditing(!isEditing);
  };

  return (
    <motion.div
      className="relative bg-[#1a1a1a] rounded-2xl shadow-sm p-6 space-y-6 border border-[#2c2c2c] min-h-[665px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FiUserCheck className="text-orange-400" size={20} />
          Account Information
        </h2>
        <button
          onClick={toggleEdit}
          className="text-orange-400 hover:text-orange-500 transition-all"
          title={isEditing ? 'Save' : 'Edit'}
        >
          {isEditing ? <FiCheck size={20} /> : <FiEdit2 size={20} />}
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
              value={(formData as any)[field.name]}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm ${
                !isEditing ? 'cursor-not-allowed opacity-60' : ''
              }`}
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Home Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm ${
              !isEditing ? 'cursor-not-allowed opacity-60' : ''
            }`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300">Resume</label>
          <input
            type="file"
            name="resume"
            disabled={!isEditing}
            className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-400 hover:file:bg-orange-500/20 disabled:opacity-50"
          />
        </div>

        {/* Interests */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Interests</label>

          <div className="flex flex-wrap gap-3 items-center mb-3">
            {formData.interests.map((tag, index) => (
              <span
                key={index}
                className="bg-orange-500/10 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2"
              >
                {tag}
                {isEditing && (
                  <button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        interests: prev.interests.filter((_, i) => i !== index),
                      }))
                    }
                    className="text-orange-300 hover:text-orange-500"
                  >
                    <FiX />
                  </button>
                )}
              </span>
            ))}

            {isEditing && formData.interests.length < 6 && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-orange-400 text-orange-300 hover:bg-orange-500/10 transition-all font-medium"
              >
                <span className="text-lg leading-none">＋</span> Add Interest
              </button>
            )}
          </div>

          {!isEditing && formData.interests.length === 0 && (
            <p className="text-gray-500 text-sm italic">No interests added</p>
          )}

          {/* Interest Modal */}
          <Modal
            show={showModal}
            onClose={() => {
              setShowModal(false);
              setError('');
              if (interestInputRef.current) interestInputRef.current.value = '';
            }}
          >
            <div className="relative">
              {/* Close icon */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setError('');
                  if (interestInputRef.current) interestInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-orange-400 transition"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = interestInputRef.current?.value.trim() || '';

                  if (!input) return setError('Interest cannot be empty');
                  if (input.length > 10) return setError('Interest must be ≤ 10 chars');
                  if (formData.interests.includes(input)) return setError('Interest already added');
                  if (formData.interests.length >= 6) return setError('Maximum of 6 interests allowed');

                  setFormData((prev) => ({
                    ...prev,
                    interests: [...prev.interests, input],
                  }));

                  setError('');
                  setShowModal(false);
                  interestInputRef.current!.value = '';
                }}
              >
                <h3 className="text-lg font-semibold mb-1">Add Interest</h3>
                <p className="text-xs text-gray-400 mb-3">Max 6 interests · 10 characters each</p>

                <input
                  type="text"
                  ref={interestInputRef}
                  maxLength={10}
                  placeholder="e.g. Coding"
                  className="w-full mb-3 rounded-md border border-[#333] bg-[#0d0d0d] text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400"
                />

                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all text-sm"
                >
                  Add
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfoForm;
