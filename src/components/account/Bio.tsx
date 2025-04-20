// ============================================
// File Purpose: Modernized Bio component styled with orange theme
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// ============================================

'use client';

import { Sparkles } from 'lucide-react';

const Bio = () => {
  return (
    <div className="w-full bg-[#1a1a1a] rounded-xl border border-[#2c2c2c] px-5 py-4 text-sm text-gray-300 leading-relaxed">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-orange-400" />
        <h3 className="text-sm font-semibold text-orange-300 tracking-wide">About Jill</h3>
      </div>
      <p className="text-gray-400">
        Jill is a Regional Director who travels 4–8 times each month for work. She has a
        specific region in which she travels and often stays in the same hotels. She's
        frustrated by how long it takes to book even repetitive trips and wants travel
        tools that are as organized as she is.
      </p>
    </div>
  );
};

export default Bio;
