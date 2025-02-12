import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";
import Pheaders from "@/components/paragraph-header";
import FAQ from "@/components/faq";
import InfoCarousel from "@/components/info-carousel";
import { EmblaOptionsType } from "embla-carousel";
import AnimatedSection from "@/components/animate-section"; //For animation easing in content purposes
import InfiniteScroll from "@/components/infinite-loop-scroll" //for the infinite logo sliding show


// Constants
const OPTIONS: EmblaOptionsType = { align: "start" };
const logos = [
  { src: '/images/pulpapi-logo.svg', alt: 'API' },
  { src: '/images/suade-logo.svg', alt: 'Suade' },
  { src: '/images/speakeasy-logo.svg', alt: 'SpeakEasty' },
  { src: '/images/textmri-logo.svg', alt: 'TextMRI' },
  { src: '/images/pulpthink-logo.svg', alt: 'PulpThink' },
  { src: '/images/pulp101-logo.svg', alt: 'Pulp101' },
  { src: '/images/trendingrhetoric-logo.svg', alt: 'TrendingRhetoric' },
];
const SLIDES = [
  {
    logo: "/images/pulpapi-logo.svg",
    title: "PulpAPI",
    status: "Active",
    description: "Everything needed to build and deploy amazing NLP-focused tools and micro-services.",
    productType: "Dev Tool",
    version: "1.0",
  },
  {
    logo: "/images/suade-logo.svg",
    title: "Suade",
    status: "Active",
    description: "The ultimate discussion platform with a focus on interaction design, information literacy, and competitive conversations.",
    productType: "Infrastructure",
    version: "1.3",
  },
  {
    logo: "/images/speakeasy-logo.svg",
    title: "SpeakEasy",
    status: "Inactive",
    description: "A multipurpose widget meant to instantly enhance website engagement with dynamic comments, AI chatbot, and more.",
    productType: "Toolkit",
    version: "2.0",
  },
  {
    logo: "/images/pulp101-logo.svg",
    title: "Pulp101",
    status: "Active",
    description: "This site didn’t build itself! We make Pulp101 to improve developer engagement and workflow efficiency.",
    productType: "Management",
    version: "1.1",
  },
  {
    logo: "/images/pulpthink-logo.svg",
    title: "PulpThink",
    status: "Active",
    description: "A place for the Pulp team to share engagement friendly content towards establishing Pulp’s domain expertise.",
    productType: "AI Tool",
    version: "0.9",
  },
  {
    logo: "/images/trendingrhetoric-logo.svg",
    title: "TrendingRhetoric",
    status: "Active",
    description: "An interactive visualizer to track trending topics, rhetorical styles, and audience sentiment -- based on source and target locations.",
    productType: "Analytics",
    version: "3.2",
  },
  {
    logo: "/images/textmri-logo.svg",
    title: "TextMRI",
    status: "Active",
    description: "Automated Exploratory Data Analysis tool for objectives that center around natural language, reasoning, and decision-making.",
    productType: "Analytics",
    version: "3.2",
  },
];

const TOGGLE_CLASSES = "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

// Main Component
export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 mt-8 min-h-[80vh] text-textColor">
        <AnimatedSection className="mt-16">
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
                  <span className="text-white">Check out our community guideline!</span>
                </div>
              </div>
            </div>
          </div>

          <h1
            className="mb-6 sm:text-6xl leading-[72px] text-center text-textColor font-normal inter"
            style={{
              fontSize: "60px",
              fontWeight: 600,
              lineHeight: "72px",
              letterSpacing: "-0.02em",
            }}
          >
            Pulp101: A Student-run Developer Community & NLP/ML Playground
          </h1>
          <p
            className="mb-12 max-w-2xl mx-auto text-textColor font-normal inter"
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "30px",
            }}
          >
            Everything you need to confidently learn, test, and build Pulp software.
          </p>
          <Link
            href="/get-started"
            className="bg-black text-white px-12 py-3 rounded-[12px] text-lg shadow-md border border-[0.5px] border-white backdrop-blur-lg hover:bg-gray-800 relative"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 blur-lg opacity-40 -z-10 rounded-[12px]"></span>
            Get Started
          </Link>
        </AnimatedSection>

        <AnimatedSection className="mt-12 mb-24 w-full max-w-4xl px-4">
          <video controls className="rounded-lg w-full shadow">
            <source src="/videos/introduction.mp4" type="video/mp4" className="h-auto w-auto"/>
            Your browser does not support the video tag.
          </video>
        </AnimatedSection>
      </div>

      {/* Features Section */}
      <div
        className="flex flex-col items-center py-24 self-stretch"
        style={{
          backgroundImage: "url('/images/temporary_brain_pic_bg_removed.png')",
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
          letterSpacing={"calc(48px * -0.02)"}
          supportingLetterSpacing="0px"
        />

        <AnimatedSection className="flex flex-wrap justify-between w-full max-w-7xl mt-8 gap-25">
          {/* Left Column */}
          <div className="flex-1">
            <div className="flex flex-col gap-8 border-l-2 border-gray-600 hover:border-white">
              <div className="pl-4">
                <h3 className="text-textColor text-xl font-semibold">Everything Front End</h3>
                <p className="text-gray-400 mt-2">Everything about Front-end</p>
                <Link href="/frontend" className="bg-white text-gray-900 font-semibold py-1.5 px-4 rounded-md hover:bg-gray-200 mt-3 inline-block">
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-textColor text-xl font-semibold">Everything Back End</h3>
                <p className="text-gray-400 mt-2">Everything about Back-end</p>
                <Link href="/backend" className="bg-white text-gray-900 font-semibold py-1.5 px-4 rounded-md hover:bg-gray-200 mt-3 inline-block">
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-textColor text-xl font-semibold">Everything Design</h3>
                <p className="text-gray-400 mt-2">Everything about Design</p>
                <Link href="/design" className="bg-white text-gray-900 font-semibold py-1.5 px-4 rounded-md hover:bg-gray-200 mt-3 inline-block">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex-1">
            <div className="flex flex-col gap-8 border-l-2 border-gray-600 hover:border-white">
              <div className="pl-4">
                <h3 className="text-textColor text-xl font-semibold">Everything Data Science</h3>
                <p className="text-gray-400 mt-2">Everything about Data Science</p>
                <Link href="/datascience" className="bg-white text-gray-900 font-semibold py-1.5 px-4 rounded-md hover:bg-gray-200 mt-3 inline-block">
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-textColor text-xl font-semibold">Everything NLP</h3>
                <p className="text-gray-400 mt-2">Everything about NLP</p>
                <Link href="/nlp" className="bg-white text-gray-900 font-semibold py-1.5 px-4 rounded-md hover:bg-gray-200 mt-3 inline-block">
                  Learn more →
                </Link>
              </div>
              <div className="pl-4">
                <h3 className="text-textColor text-xl font-semibold">Everything ML/AI</h3>
                <p className="text-gray-400 mt-2">Everything about ML/AI</p>
                <Link href="/ml-ai" className="bg-white text-gray-900 font-semibold py-1.5 px-4 rounded-md hover:bg-gray-200 mt-3 inline-block">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          {/* Empty Column */}
          <div className="flex-1"></div>
        </AnimatedSection>
      </div>

      {/* Core Products Section */}
      <AnimatedSection className="flex py-24 flex-col items-center gap-16 self-stretch">
        <div className="flex m-w-screen-xl px-0 py-8 flex-col items-start gap-16 self-stretch">
          <div className="flex justify-between items-start content-start gap-8 self-stretch flex-wrap">
            <div className="w-full max-w-screen-xl flex-col items-start gap-5 flex-1 overflow-hidden">
              <Pheaders
                text="Core Products & Websites"
                supporting="Look through current Pulp projects, products, and pipelines"
                fontSize="36px"
                supportingFontSize="20px"
              />
              <div className="flex flex-col items-start gap-8">
                <div className="flex items-start gap-8">
                  <InfoCarousel slides={SLIDES} options={OPTIONS} color="default" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Development Tools & Modules Section */}
      <AnimatedSection className="flex py-24 flex-col items-center gap-16 self-stretch">
        <div className="flex m-w-screen-xl px-0 py-8 flex-col items-start gap-16 self-stretch">
          <div className="flex justify-between items-start content-start gap-8 self-stretch flex-wrap">
            <div className="w-full max-w-screen-xl flex-col items-start gap-5 flex-1 overflow-hidden">
              <Pheaders
                text="Development Tools & Modules"
                supporting="Look through current Pulp Development Tools & Modules"
                fontSize="36px"
                supportingFontSize="20px"
                align="left"
              />
              <div className="flex flex-col items-start gap-8">
                <div className="flex items-start gap-8">
                  <InfoCarousel slides={SLIDES} options={OPTIONS} color="default" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer Section */}
      <AnimatedSection className="flex flex-col items-center gap-16 self-stretch pt-[64px] pb-[48px] opacity-100 transition-opacity duration-1000 ease-out-in">
        <div className="flex flex-col items-start gap-8 self-stretch max-w-[1280px] px-[32px]">
          <div className="flex flex-col items-center gap-12 self-stretch text-center">
            <Pheaders
              text="Let's get started on something great!"
              supporting="Join our community"
              fontSize="30px"
              supportingFontSize="20px"
              align="center"
            />
            <Link
              href="/get-started"
              className="bg-black text-white px-12 py-3 rounded-[12px] text-lg shadow-md border border-[0.5px] border-white backdrop-blur-lg hover:bg-gray-800 relative"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 blur-lg opacity-40 -z-10 rounded-[12px]"></span>
              Get Started
            </Link>
          </div>
        </div>
      
        {/*Infinite Scroll of Logos Section*/}
        <div className="inline-flex flex-nowrap max-w-[600px] overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <InfiniteScroll logos={logos}></InfiniteScroll>
          <InfiniteScroll logos={logos} aria-hidden="true"></InfiniteScroll>
        </div>
        
        

        <div className="flex max-w-[1280px] px-8 flex-col items-start gap-8 self-stretch">
          <div className="flex pt-8 justify-between items-center content-center gap-6 self-stretch flex-wrap">
            <img src="/images/pulp101-logo.svg" alt="Logo" className="w-24 h-auto" />
            <footer className="text-textColor font-inter text-base font-normal leading-6">© 2025 Pulp Internet Corporation</footer>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}