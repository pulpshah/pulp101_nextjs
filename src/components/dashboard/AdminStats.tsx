// ============================================
// File Purpose: AdminStats component showing deliverable submission stats
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 05/01/2025
// ============================================

'use client';

import { FiInfo } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  tooltip?: string;
  linkHref?: string;
  large?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  tooltip,
  linkHref,
  large = false,
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative bg-gray-900 rounded-xl shadow-md border border-gray-700 p-6 flex flex-col justify-between hover:shadow-purple-500/20 transition-all group min-h-[180px]">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3 text-purple-400 text-xl">
          {icon}
          <h2 className="font-semibold text-white text-lg">{title}</h2>
        </div>
        {tooltip && (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FiInfo className="text-gray-400 hover:text-white cursor-pointer" />
            {isHovered && (
              <div className="absolute right-0 bottom-full mb-4 w-56 bg-gray-800 text-gray-200 text-sm rounded-lg shadow-lg p-3 z-50">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>

      <p className={`font-extrabold text-white ${large ? 'text-5xl' : 'text-4xl'} mt-4`}>
        {value}
      </p>

      {linkHref && (
        <div className="mt-auto flex justify-end">
          <Link
            href={linkHref}
            className="text-purple-400 text-sm hover:underline transition-all"
          >
            View All →
          </Link>
        </div>
      )}
    </div>
  );
}
