import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";
import Pheaders from "@/components/paragraph-header";
import FAQ from "@/components/faq";
import InfoCarousel from "@/components/info-carousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { align: "start" };

const SLIDES = [
  {
    title: "Card 1",
    status: "Active",
    description: "This is the first card.",
    version: "1.0",
  },
  {
    title: "Card 2",
    status: "Inactive",
    description: "This is the second card.",
    version: "1.1",
  },
  {
    title: "Card 3",
    status: "Active",
    description: "This is the third card.",
    version: "1.2",
  },
  {
    title: "Card 4",
    status: "Active",
    description: "This is the third card.",
    version: "1.2",
  },
  {
    title: "Card 5",
    status: "Active",
    description: "This is the third card.",
    version: "1.2",
  },
  {
    title: "Card 6",
    status: "Active",
    description: "This is the third card.",
    version: "1.2",
  },
]; // Add more slides as needed

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center px-4 mt-8 min-h-[80vh]">
        <header className="mt-16">
          <div className="relative inline-block mb-4">
            <div
              className="rounded-[14px] p-[1px]"
              style={{
                background:
                  "linear-gradient(0deg, rgba(234, 242, 239, 0.06), rgba(234, 242, 239, 0.06)), linear-gradient(44.73deg, rgba(181, 237, 253, 0.0576) -0.47%, rgba(130, 177, 254, 0.0576) 49.77%, rgba(79, 116, 255, 0.24) 100%), linear-gradient(45.26deg, rgba(255, 163, 165, 0) 0.54%, rgba(255, 117, 154, 0.24) 50%, rgba(255, 70, 144, 0.24) 99.46%), linear-gradient(44.73deg, rgba(255, 214, 163, 0.24) -0.47%, rgba(255, 204, 117, 0.24) 49.77%, rgba(255, 193, 70, 0) 100%)",
                backdropFilter: "blur(32px)",
              }}
            >
              <div className="bg-black rounded-[14px] p-[2px]">
                <div
                  className="rounded-[14px] px-2.5 py-0.5 flex justify-center items-center"
                  style={{
                    backgroundImage: "url('/images/pulp-gradient.svg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="text-white">
                    Check out our community guideline!
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h1
            className="mb-6 sm:text-6xl leading-[72px] text-center"
            style={{
              fontFamily: "Inter",
              fontSize: "60px",
              fontWeight: 600,
              lineHeight: "72px",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            Pulp101: A Student-run Developer Community & NLP/ML Playground
          </h1>
          <p
            className="mb-12 max-w-2xl mx-auto"
            style={{
              color: "#EAF2EF",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "30px",
            }}
          >
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

        <section className="mt-12 mb-24 w-full max-w-4xl px-4">
          <video controls className="rounded-lg w-full shadow">
            <source src="/videos/introduction.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      </div>

      {/* Features Section */}
      <div
        className="flex flex-col items-center py-24 self-stretch"
        style={{
          backgroundImage: "url('/images/temporary-brain-img.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Pheaders
          text="Full-stack Information & FAQs"
          supporting="Explore our tech stack from every angle"
          fontSize="36px"
          supportingFontSize="20px"
          letterSpacing={`calc(48px * -0.02)`} // -2% of the font size
          supportingLetterSpacing="0px" // 0% letter spacing
        />

        <div className="flex flex-wrap justify-between w-full max-w-7xl mt-8 gap-25">
          {/* Left Column */}
          <div className="flex-1">
            <div className="flex flex-col gap-8 border-l-2 border-gray-600 hover:border-gray-500">
              <div className="pl-4">
                <h3 className="text-white text-xl font-semibold">
                  Everything Front End
                </h3>
                <p className="text-gray-400">Everything about Front-end</p>
                <Link
                  href="/frontend"
                  className="text-[#94969C] hover:underline"
                >
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-white text-xl font-semibold">
                  Everything Back End
                </h3>
                <p className="text-gray-400">Everything about Back-end</p>
                <Link
                  href="/backend"
                  className="text-[#94969C] hover:underline"
                >
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-white text-xl font-semibold">
                  Everything Design
                </h3>
                <p className="text-gray-400">Everything about Design</p>
                <Link href="/design" className="text-[#94969C] hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex-1">
            <div className="flex flex-col gap-8 border-l-2 border-gray-600 hover:border-[#94969C]">
              <div className="pl-4">
                <h3 className="text-white text-xl font-semibold">
                  Everything Data Science
                </h3>
                <p className="text-gray-400">Everything about Data Science</p>
                <Link
                  href="/datascience"
                  className="text-[#94969C] hover:underline"
                >
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-white text-xl font-semibold">
                  Everything NLP
                </h3>
                <p className="text-gray-400">Everything about NLP</p>
                <Link href="/nlp" className="text-[#94969C] hover:underline">
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-white text-xl font-semibold">
                  Everything ML/AI
                </h3>
                <p className="text-gray-400">Everything about ML/AI</p>
                <Link href="/ml-ai" className="text-[#94969C] hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          {/* Empty Column */}
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Core Products Section */}
      <div className="flex py-24 flex-col items-center gap-16 self-stretch">
        <div className="flex m-w-screen-xl px-0 py-8 flex-col items-start gap-16 self-stretch">
          <div className="flex justify-between items-start content-start gap-8 self-stretch flex-wrap">
            <div className="w-[480px] max-w-screen-xl flex-col items-start gap-5 flex-1">
              <Pheaders
                text="Core Products & Websites "
                supporting="Look through current Pulp projects, products, and pipelines"
                fontSize="36px"
                supportingFontSize="20px"
              ></Pheaders>
              <div className="flex flex-col items-start gap-8">
                <div className="flex items-start gap-8">
                  <InfoCarousel
                    slides={SLIDES}
                    options={OPTIONS}
                  ></InfoCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
