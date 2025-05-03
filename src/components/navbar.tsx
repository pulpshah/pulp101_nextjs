import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CollapsibleDropdownSection from "./CollapsibleDropdownSection";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

import { UserDropdown } from "@components/UserDropdown";;

export async function Navbar() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;
  const image = session?.user?.image;

  return (
    <nav className="w-full border-b bg-black sticky top-0 z-50">
      <div className="container mx-auto flex items-center h-16 px-8">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex-1 flex items-center justify-center">
          <NavMenu />
        </div>

        {/* Right: Profile or Sign In */}
        <div className="flex items-center">
          {name ? (
            <UserDropdown name={name} image={image} />
          ) : (
            <div className="flex gap-[37px] items-center">
              <Link
                href="/auth/signin"
                className="font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-[#D9D9D9] transition-colors duration-200 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-[#887998] px-4 py-2 rounded-md font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-white hover:bg-[#574E61] transition"
              >
                Request Invite
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
      <Image
        src="/images/pulp101-logo.svg"
        alt="Logo"
        width={100}
        height={24}
        priority
      />
    </Link>
  );
}

// NavLink
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-[#D9D9D9] transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  );
}

// NavMenu
export function NavMenu({ isSheet = false }: { isSheet?: boolean }) {
  const containerClass = isSheet
    ? "flex flex-col gap-2.5 font-inter border-solid border-white font-semibold text-[14px] leading-[24px] tracking-normal"
    : "flex gap-[85px] font-inter border-solid border-white font-semibold text-[14px] leading-[24px] tracking-normal";

  return (
    <div className={containerClass}>
      <NavLink href="/">Home</NavLink>

      <Dropdown title="About Pulp101" href="/about">
        <DropdownItem href="/about/apprenticeship">Apprenticeship</DropdownItem>
        <DropdownItem href="/about/research">Research</DropdownItem>
      </Dropdown>

      <Dropdown title="Apprentice Resources" href="#">
        <CollapsibleDropdownSection
          title="Pulp Contracts"
          items={[
            { label: "Pulp NDA", href: "/resources/pulp-nda" },
            { label: "Pulp ICA", href: "/resources/pulp-ic-agreement" },
          ]}
        />
        <CollapsibleDropdownSection
          title="Pulp Workplace Policies"
          items={[
            { label: "Communication Guideline", href: "/resources/communication-guideline" },
            { label: "Discord/Phone/Email", href: "/resources/discord-phone-email" },
            { label: "Operations Policies", href: "/resources/operations-policies" },
          ]}
        />
        <DropdownItem href="/resources/github-notion-loom">GitHub/Notion/Loom</DropdownItem>
        <DropdownItem href="/resources/timesheets">Timesheets</DropdownItem>
        <DropdownItem href="/resources/log-in-after-auth">Log In (after auth)</DropdownItem>
      </Dropdown>

      <Dropdown title="Docs" href="#">
        <DropdownItem href="/docs/log-in-after-auth">Log In (after auth)</DropdownItem>
        <DropdownItem href="/docs/api">API Docs</DropdownItem>
        <DropdownItem href="/docs/sdk">SDK Docs</DropdownItem>
      </Dropdown>
    </div>
  );
}
