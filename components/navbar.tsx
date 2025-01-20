import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon, CommandIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import { getSession } from "@/lib/session";

export const NAVLINKS = [
  {
    title: "Home",
    href: `/`,
  },
  {
    title: "Products",
    href: `/`,
    isDropDown: true,
    dropdownItems: [
      {title: "Product 1", href: `/`},
      {title: "Product 2", href: `/`},
    ],
  },
  {
    title: "Resources",
    href: `/`,
    isDropDown: true,
    dropdownItems: [
      {title: "Resource 1", href: `/`},
      {title: "Resource 2", href: `/`},
    ],
  },
  {
    title: "How It Works",
    href: `/docs${page_routes[0].href}`,
  },
  {
    title: "Research",
    href: "/blog",
  },
  {
    title: "Authors",
    href: "/authors",
  },
];

export async function Navbar() 
{
  const session = await getSession();
  const name = session?.user.name;
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search />
            <div className="flex ml-2.5 sm:ml-0">
              <ModeToggle />
              {
                name &&<p>Hello, {name}</p>
              }
              {
                !name && <button className="bg-zinc-1000 w-28 hover:bg-zinc-900">
                <a href="/auth/login">Log in</a>
              </button>
              }
              {
                !name && <button className="bg-gray-700 w-28 hover: bg-gray-900 rounded-md">
                  <a href="/auth/signup">Sign up</a>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <img src={"/images/logo.svg"} alt="Logo" />
    </Link>
  );
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        if(item.isDropDown){
          return (
            <div key={item.title}>
              <div className="relative group">
                <Anchor
                  activeClassName="!text-primary md:font-semibold font-medium"
                  absolute
                  className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800 underline"
                  href={item.href}
                >
                  {item.title}
                </Anchor>
                <div className="absolute left-0 hidden group-hover:block mt-2 bg-black shadow-lg rounded-md w-48">
                  {item.dropdownItems.map((dropdownItem) => (
                    <Anchor
                      key={dropdownItem.title}
                      activeClassName="!text-primary font-semibold"
                      className="block px-4 py-2 text-sm text-stone-800"
                      href={dropdownItem.href}
                    >
                      {dropdownItem.title}
                    </Anchor>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary md:font-semibold font-medium"
            absolute
            className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800"
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}