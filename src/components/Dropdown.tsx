import Link from "next/link";
import Image from "next/image";
import React from "react";

interface DropdownProps {
  title: string;
  href: string; // the main link when clicking on the title
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, href, children }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-1">
        {/* Title acts as the clickable link to /about */}
        <Link
          href={href}
          className="font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-[#D9D9D9] transition-colors duration-200 hover:text-white"
        >
          {title}
        </Link>
        {/* Dropdown arrow that shows the subpages on hover */}
        <button className="group-hover:text-white">
          <Image
            src="/images/dropdown-arrow.svg"
            alt="Dropdown Arrow"
            width={12}
            height={12}
          />
        </button>
      </div>
      {/* Dropdown Menu */}
      <div className="absolute left-0 top-full bg-black shadow-lg rounded-md w-64 p-3 hidden group-hover:flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
