// ============================================
// File Purpose: Editable Bio component with modal, height alignment, and Neo4j persistence via /api/account/bio
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/24/2025
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { FiEdit, FiX } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

interface BioProps {
  customHeight?: number | null;
}

const Bio = ({ customHeight }: BioProps) => {
  const { data: session } = useSession();
  const fullName = session?.user?.name || 'User';
  const firstName = fullName.split(' ')[0];

  const [bioText, setBioText] = useState("Here's my about section.");
  const [tempBioText, setTempBioText] = useState(bioText);
  const [showModal, setShowModal] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch bio from new API route
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await fetch('/api/account/bio');
        const data = await res.json();
        if (data && data.bio) {
          setBioText(data.bio);
          setCharCount(data.bio.length);
        }
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBio();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.slice(0, 300);
    setTempBioText(text);
    setCharCount(text.length);
  };

  const handleSave = async () => {
    if (tempBioText.trim() === '') return;
    setLoading(true);

    try {
      // Update bio on the server
      const res = await fetch('/api/account/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: tempBioText }),
      });

      const data = await res.json();
      if (res.ok) {
        setBioText(tempBioText);
        setShowModal(false);
      } else {
        console.error('Failed to save bio:', data.error);
        alert('Failed to save bio. Please try again.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-[#1a1a1a] rounded-xl border border-[#2c2c2c] px-4 py-3 text-sm text-gray-300 leading-relaxed relative"
      style={{ minHeight: customHeight ?? 'auto' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Edit Icon */}
      <button
        onClick={() => {
          setTempBioText(bioText);
          setCharCount(bioText.length);
          setShowModal(true);
        }}
        className="absolute top-3 right-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 p-1 rounded-full"
      >
        <FiEdit size={14} />
      </button>

      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-orange-400" />
        <h3 className="text-sm font-semibold text-orange-300 tracking-wide">
          About {firstName}
        </h3>
      </div>

      <p className="text-gray-400 whitespace-pre-line break-words">{bioText}</p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-6 w-full max-w-md relative space-y-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FiX size={18} />
            </button>
            <h2 className="text-white text-lg font-semibold mb-2">Edit About Section</h2>

            <textarea
              value={tempBioText}
              onChange={handleTextChange}
              rows={4}
              maxLength={300}
              className="w-full mt-1 bg-[#0d0d0d] border border-[#333] text-white rounded-md px-3 py-2 text-sm"
            />
            <p className="text-xs text-right text-gray-400">{charCount}/300</p>

            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-sm px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                disabled={tempBioText.trim() === '' || loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Bio;
