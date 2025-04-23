// ============================================
// File Purpose: Modal component for displaying input popups like adding interests, with close functionality and animation support
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#1a1a1a] text-white rounded-xl p-6 w-full max-w-sm shadow-xl border border-[#2c2c2c]"
      >
        {children}
        <button
          className="absolute top-4 right-5 text-gray-400 hover:text-red-400"
          onClick={onClose}
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
