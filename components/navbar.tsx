import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import Search from "./search"; // Keeping the search bar
import CollapsibleDropdownSection from "./CollapsibleDropdownSection"; // Import the new component

export async function Navbar() {
  const session = await getSession();
  const name = session?.user?.name;

  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-black flex items-center">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left Section - Logo and Nav Links */}
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden lg:flex gap-6 text-gray-400 text-sm font-medium">
            <NavLink href="/">Home</NavLink>
            <Dropdown title="Products">
              <DropdownItem href="#">...</DropdownItem>
            </Dropdown>
            <Dropdown title="Resources">
              <CollapsibleDropdownSection
                title="Contracts"
                items={[
                  { label: "Pulp NDA", href: "/resources/pulp-nda" },
                  {
                    label: "Pulp IC Agreement",
                    href: "/resources/pulp-ic-agreement",
                  },
                ]}
              />
              <CollapsibleDropdownSection
                title="Workplace Policies"
                items={[
                  {
                    label: "Communication Guidelines",
                    href: "/resources/communication-guidelines",
                  },
                  {
                    label: "Operations Policies",
                    href: "/resources/operations-policies",
                  },
                ]}
              />
            </Dropdown>
          </div>
        </div>

        {/* Right Section - Search Bar and Auth */}
        <div className="flex items-center gap-4">
          <Search />
          {name ? (
            <span className="text-white">Hello, {name}</span>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 transition"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-gray-900 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Logo Component
export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <img src="/images/logo.svg" alt="Logo" className="h-6" />
    </Link>
  );
}

// Reusable NavLink Component for Hover Effect
function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-gray-400 transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  );
}

// Dropdown Component with Persistent Hover
function Dropdown({ title, children }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-gray-400 transition-colors duration-200 hover:text-white">
        {title}
        <Image
          src="/images/dropdown-arrow.svg"
          alt="Dropdown Arrow"
          width={12}
          height={12}
        />
      </button>

      {/* Dropdown Menu positioned directly below the button */}
      <div
        className="absolute left-0 top-full bg-black shadow-lg rounded-md w-64 p-3 
                   hidden group-hover:flex flex-col"
      >
        {children}
      </div>
    </div>
  );
}

// Dropdown Item Component
function DropdownItem({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
