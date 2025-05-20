// ============================================
// File Purpose: Profile summary card component for the dashboard,
// displaying user image, name, role, location, and start date.
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/19/2025
// ============================================

'use client';

import Image from "next/image";
import Link from "next/link";

export function ProfileSummaryCard({
  name,
  role,
  location,
  startDate,
  image,
}: {
  name: string;
  role: string;
  location: string;
  startDate: string;
  image: string;
}) {
  return (
    <div className="bg-gray-900 h-[230px] p-6 rounded-xl border border-gray-700 shadow-md flex flex-col justify-center items-center text-center">
      <Image
        src={image}
        alt="Profile"
        width={64}
        height={64}
        className="rounded-full border border-white mb-3"
      />
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-400">{role}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-xs text-gray-600 mb-1">{startDate}</p>
      <Link href="/account" className="text-purple-400 text-sm hover:underline">
        View My Profile
      </Link>
    </div>
  );
}
