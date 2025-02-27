import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import CollapsibleDropdownSection from "./CollapsibleDropdownSection";

// Navbar Component
export async function Navbar() {
  const session = await getSession();
  const name = session?.user?.name;

  return (
    <nav className="w-full border-b bg-black sticky top-0 z-50">
      <div className="container mx-auto flex items-center h-16 px-8">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Middle: Navigation Links (centered) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-[85px] font-inter font-semibold text-[14px] leading-[24px] tracking-normal">
            {/* 1) Home (direct link) */}
            <NavLink href="/">Home</NavLink>

            {/* 2) About Pulp101 */}
            <Dropdown title="About Pulp101">
              <DropdownItem href="/about/apprenticeship">
                Apprenticeship
              </DropdownItem>
              <DropdownItem href="/about/research">Research</DropdownItem>
            </Dropdown>

            {/* 3) Apprentice Resources */}
            <Dropdown title="Apprentice Resources">
              {/* Collapsible: Pulp Contracts */}
              <CollapsibleDropdownSection
                title="Pulp Contracts"
                items={[
                  { label: "Pulp NDA", href: "/resources/pulp-nda" },
                  { label: "Pulp ICA", href: "/resources/pulp-ic-agreement" },
                ]}
              />

              {/* Collapsible: Pulp Workplace Policies */}
              <CollapsibleDropdownSection
                title="Pulp Workplace Policies"
                items={[
                  {
                    label: "Communication Guideline",
                    href: "/resources/communication-guideline",
                  },
                  {
                    label: "Discord/Phone/Email",
                    href: "/resources/discord-phone-email",
                  },
                  {
                    label: "Operations Policies",
                    href: "/resources/operations-policies",
                  },
                ]}
              />

              {/* Single links in the dropdown */}
              <DropdownItem href="/resources/github-notion-loom">
                GitHub/Notion/Loom
              </DropdownItem>
              <DropdownItem href="/resources/timesheets">
                Timesheets
              </DropdownItem>

              {/* Conditional item: shown only if user is logged in */}
              {session?.user && (
                <DropdownItem href="/resources/log-in-after-auth">
                  Log In (after auth)
                </DropdownItem>
              )}
            </Dropdown>

            {/* 4) Docs */}
            <Dropdown title="Docs">
              {/* Conditional item: shown only if user is logged in */}
              {session?.user && (
                <DropdownItem href="/docs/log-in-after-auth">
                  Log In (after auth)
                </DropdownItem>
              )}
              <DropdownItem href="/docs/api">API Docs</DropdownItem>
              <DropdownItem href="/docs/sdk">SDK Docs</DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* Right: Sign In / Request Invite or Greeting */}
        <div className="flex items-center">
          {name ? (
            <span className="text-white">Hello, {name}</span>
          ) : (
            <div className="flex gap-[37px] items-center">
              <Link
                href="/auth/login"
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
      <img src="/images/pulp101-logo.svg" alt="Logo" className="h-6" />
    </Link>
  );
}

// Reusable NavLink Component
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-[#D9D9D9] transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  );
}

// Dropdown Component
function Dropdown({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-[#D9D9D9] transition-colors duration-200 hover:text-white"
      >
        {title}
        <Image
          src="/images/dropdown-arrow.svg"
          alt="Dropdown Arrow"
          width={12}
          height={12}
        />
      </button>
      {/* Dropdown Menu */}
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
function DropdownItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 font-inter font-semibold text-[14px] leading-[24px] tracking-normal text-[#D9D9D9] transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  );
}
