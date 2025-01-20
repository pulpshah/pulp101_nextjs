import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-8 min-h-[80vh]">
      <header className="mt-14">
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-full px-6 py-3 inline-block mb-4 shadow-md">
          Check out our community guideline!
        </div>
        <h1 className="text-4xl font-semibold mb-4 sm:text-6xl leading-[72px]">
          Pulp101: A Student-run Developer Community & NLP/ML Playground
        </h1>
        <p className="mb-8 text-lg sm:text-xl max-w-2xl mx-auto">
          Everything you need to confidently learn, test, and build Pulp
          software.
        </p>
        <Link
          href="/get-started"
          className="bg-black text-white px-12 py-3 rounded-[12px] text-lg shadow-md border border-[0.5px] border-white backdrop-blur-lg hover:bg-gray-800 relative"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 blur-lg opacity-40 -z-10 rounded-[12px]"></span>
          Get Started
        </Link>
      </header>

      <section className="mt-12 w-full max-w-4xl px-4">
        <video controls className="rounded-lg w-full shadow">
          <source src="/videos/introduction.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  );
}
