// ============================================
// File Purpose: Modernized Bio component styled with orange theme
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/23/2025
// ============================================

'use client';

import { Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface BioProps {
  customHeight?: number | null;
}

const Bio = ({ customHeight }: BioProps) => {
  const { data: session } = useSession();
  const fullName = session?.user?.name || 'User';
  const firstName = fullName.split(' ')[0];

  return (
    <div
      className="bg-[#1a1a1a] rounded-xl border border-[#2c2c2c] px-4 py-3 text-sm text-gray-300 leading-relaxed transition-all duration-300 overflow-hidden"
      style={customHeight ? { height: `${customHeight}px` } : {}}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-orange-400" />
        <h3 className="text-sm font-semibold text-orange-300 tracking-wide">
          About {firstName}
        </h3>
      </div>
      <p className="text-gray-400">
        Here's my about section.
      </p>
    </div>
  );
};

export default Bio;
