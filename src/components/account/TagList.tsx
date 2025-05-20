// ============================================
// File Purpose: TagList component with modal input for managing user interests
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

'use client';

import { useRef, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

type TagListProps = {
  tags: string[];
  editable?: boolean;
  onChange?: (updatedTags: string[]) => void;
};

export default function TagList({ tags, editable = false, onChange }: TagListProps) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const newTag = inputRef.current?.value.trim();
    if (!newTag) return setError('Cannot be empty');
    if (newTag.length > 10) return setError('Max 10 characters');
    if (tags.includes(newTag)) return setError('Already added');
    if (tags.length >= 6) return setError('Max 6 tags');

    onChange?.([...tags, newTag]);
    setShowModal(false);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeTag = (tag: string) => {
    onChange?.(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 relative">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-orange-500/10 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2"
        >
          {tag}
          {editable && (
            <button onClick={() => removeTag(tag)} className="hover:text-orange-300">
              <FiX size={14} />
            </button>
          )}
        </span>
      ))}

      {editable && tags.length < 6 && (
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-orange-400 text-orange-300 hover:bg-orange-500/10 transition-all font-medium"
        >
          <FiPlus size={14} /> Add Interest
        </button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                <div className="w-[90%] max-w-sm bg-[#1a1a1a] rounded-lg border border-[#2c2c2c] p-6 shadow-lg text-white relative">
                    <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-orange-400">
                        Add a New Interest
                    </h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500">
                        <FiX size={18} />
                    </button>
                    </div>

                    <input
                    ref={inputRef}
                    maxLength={10}
                    placeholder="e.g. Coding"
                    className="w-full mb-3 rounded-md border border-[#333] bg-[#0d0d0d] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:ring-orange-400 focus:border-orange-400"
                    />

                    {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

                    <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-sm px-3 py-1 text-gray-300 hover:text-red-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={addTag}
                        className="text-sm px-4 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                    >
                        Add
                    </button>
                    </div>
                </div>
                </motion.div>

          </>
        )}
      </AnimatePresence>
    </div>
  );
}
