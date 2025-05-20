import Link from "next/link";
import React from "react";

interface DropdownItemProps {
  href: string;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="block px-4 py-2 font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-[#D9D9D9] transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  );
};

export default DropdownItem;
