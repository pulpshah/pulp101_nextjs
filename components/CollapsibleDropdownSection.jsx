// CollapsibleDropdownSection.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function CollapsibleDropdownSection({ title, items }) {
  const [open, setOpen] = useState(false);

  const toggleSection = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="mb-2">
      <button
        onClick={toggleSection}
        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
          open ? "text-purple-400 font-bold" : "text-gray-400"
        }`}
      >
        {title}
      </button>
      {open && (
        <div className="ml-4 mt-1 flex flex-col bg-black rounded-md p-2 border border-gray-700">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-2 py-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleSection}
            className="mt-1 text-xs text-red-400 hover:underline self-end"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
