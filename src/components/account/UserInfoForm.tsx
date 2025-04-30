// ============================================
// File Purpose: Account settings form with persistent Neo4j profile sync + polished resume upload + modal view + validation
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/26/2025
// ============================================

'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import TagList from '@/components/account/TagList';
import { FiUser } from 'react-icons/fi';

const UserInfoForm = () => {
  const { data: session } = useSession();

  const initialData = {
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
  };

  const [formData, setFormData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/account/profile');
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setFormData(data);
        setOriginalData(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const validateField = (name: string, value: string) => {
    let message = '';

    if ((name === 'fullName' || name === 'email') && !value.trim()) {
      message = `${name === 'fullName' ? 'Name' : 'Email'} is required`;
    }

    if (name === 'phone' && value && !/^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[-\s]?)?\d{3}[-\s]?\d{4}$/.test(value)) {
      message = 'Invalid phone number format';
    }

    if (name === 'laddersID' && value && !/^\d{7}L$/.test(value)) {
      message = 'ID must be 7 digits followed by "L"';
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSave = async () => {
    Object.entries(formData).forEach(([name, value]) => {
      if (typeof value === 'string') validateField(name, value);
    });

    const hasErrors = Object.values(errors).some((msg) => msg);
    if (hasErrors) return;

    try {
      const res = await fetch('/api/account/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(await res.text());

      setOriginalData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving account info:', error);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setErrors({});
    setIsEditing(false);
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onloadend = async () => {
      const base64Data = reader.result?.toString().split(',')[1];
      if (!base64Data) return alert('Could not read file.');
  
      const fileName = `resumes/${file.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
      const fileType = file.type;
  
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: base64Data, fileName, fileType }),
        });
  
        if (!uploadRes.ok) throw new Error('Upload failed');
  
        const { url } = await uploadRes.json();
        alert('Resume uploaded successfully.');
  
        // update user profile
        const updateRes = await fetch('/api/account/update-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeUrl: url }),
        });
  
        if (!updateRes.ok) {
          console.error('Resume URL not saved.');
        } else {
            console.log('Resume URL saved to Neo4j.');
            setFormData((prev) => ({ ...prev, resume: url }));
        }
      } catch (err) {
        console.error(err);
        alert('Upload failed.');
      }
    };
  
    reader.readAsDataURL(file);
  };
  

  return (
    <>
      <motion.div
        className="bg-[#1a1a1a] rounded-2xl shadow-sm p-6 space-y-4 border border-[#2c2c2c] min-h-[680px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FiUser className="text-orange-400" />
            Account Information
          </h2>
          <div className="space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="text-orange-400 hover:text-orange-300 transition-all text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-300 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-orange-400 hover:text-orange-300 transition-all text-sm font-medium"
              >
                Edit
              </button>
            )}
          </div>
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
              <label className="text-sm font-medium text-gray-300">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                disabled={!isEditing}
                value={(formData as any)[field.name]}
                placeholder={isEditing && !(formData as any)[field.name] ? field.label : ''}
                onChange={handleChange}
                className={`mt-1 w-full rounded-md border ${
                  errors[field.name] ? 'border-red-500' : 'border-[#333]'
                } bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-300 mb-2 block">Home Address</label>
            <input
              type="text"
              name="address"
              disabled={!isEditing}
              value={formData.address}
              placeholder={isEditing && !formData.address ? 'Home Address' : ''}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-[#333] bg-[#0d0d0d] text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400 text-sm"
            />
          </div>

          {/* Resume Section */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-300 mb-2 block">Resume</label>
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="inline-flex items-center justify-center mt-1 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-semibold shadow-md hover:from-orange-500 hover:to-orange-600 transition-all duration-300 w-fit"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  Upload Resume
                </button>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                {formData.resume && (
                  <p className="text-xs text-gray-400 mt-2">Selected: {formData.resume.split('/').pop()}</p>
                )}
              </>
            ) : (
              <>
                {formData.resume ? (
                  <button
                    type="button"
                    onClick={() => setIsResumeModalOpen(true)}
                    className="inline-flex items-center justify-center mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-semibold shadow-md hover:from-orange-500 hover:to-orange-600 transition-all duration-300 w-fit"
                  >
                    View Resume
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">No resume uploaded</p>
                )}
              </>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-300 mb-2 block">Interests</label>
            <TagList
              tags={formData.interests}
              editable={isEditing}
              onChange={(updated) => setFormData((prev) => ({ ...prev, interests: updated }))}
            />
          </div>
        </div>
      </motion.div>

      {/* Resume Modal */}
      <Dialog open={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-2">
              <h2 className="text-lg font-semibold">Resume Preview</h2>
              <button onClick={() => setIsResumeModalOpen(false)} className="text-sm hover:underline">
                Close
              </button>
            </div>
            <iframe
              src={formData.resume}
              className="w-full h-[75vh]"
              title="Resume PDF"
              frameBorder="0"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default UserInfoForm;
