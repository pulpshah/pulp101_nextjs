import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon, CommandIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import { getSession } from '@auth0/nextjs-auth0';

export const NAVLINKS = [
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
  const user = session?.user;
  const name = user?.name

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
                user &&
                <>
                  <div className="w-12">
                    <img src={user.picture} alt={user.name} />
                    {/* <h2>{user.name}</h2>
                    <p>{user.email}</p> */}
                  </div>
                  <button className="bg-zinc-1000 w-28 hover:bg-zinc-900 ml-3">
                    <a href="/api/auth/logout">Log out</a>
                  </button>
                </>
              }
              {
                !name && <a href="/api/auth/login"> <button className="bg-zinc-1000 w-28 hover:bg-zinc-900">
                Login
              </button></a>
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
