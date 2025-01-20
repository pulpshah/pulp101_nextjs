import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";
import Pheaders from "@/components/paragraph-header";
import FAQ from "@/components/faq";
import InfoCarousel from "@/components/info-carousel";
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { align: 'start' }

const SLIDES = [ { title: 'Card 1', status: 'Active', description: 'This is the first card.', version: '1.0' }, 
  { title: 'Card 2', status: 'Inactive', description: 'This is the second card.', version: '1.1' }, 
  { title: 'Card 3', status: 'Active', description: 'This is the third card.', version: '1.2' },
  { title: 'Card 4', status: 'Active', description: 'This is the third card.', version: '1.2' },
  { title: 'Card 5', status: 'Active', description: 'This is the third card.', version: '1.2' },
  { title: 'Card 6', status: 'Active', description: 'This is the third card.', version: '1.2' }
] // Add more slides as needed

const SLIDE_COUNT = SLIDES.length;

export default function Home() {
  return (
    //Parent div containing all sections
    <div>
      <div className="flex sm:min-h-[91vh] min-h-[88vh] flex-col items-center justify-center text-center px-2 py-8">
        <h1 className="text-3xl font-bold mb-4 sm:text-7xl">
          Pulp101: A Student-run Developer Community & NLP/ML Playground 
        </h1>
        <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground">
          Everything you need to confidently learn, test, and build Pulp software
        </p>
        <div className="flex flex-row items-center gap-5">
          <Link 
            href={`/docs${page_routes[0].href}`}
            className={buttonVariants({ variant: "aurora", className: "px-6", size: "lg"})}
            style={{ textShadow: "0px 1.5px 4px rgba(31, 31, 31, 0.2)" }} /*Added style*/
          >
            Get Started
          </Link>

        {/* Previous Buttons -> Explore Pulp and Research-Driven 
          <Link
            href={`/docs${page_routes[0].href}`}
            className={buttonVariants({ className: "px-6", size: "lg" })}
          >
            Explore Pulp
          </Link>
          <Link
            href="/blog"
            className={buttonVariants({
              variant: "secondary",
              className: "px-6",
              size: "lg",
            })}
          >
            Research-Driven
          </Link>
          */}
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="relative w-[916px] h-[516px] bg-center bg-cover rounded-lg shadow-3xl" style={{ backgroundImage: "url('video-placeholder-01.png')" }}>
            {/* Shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent"></div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full backdrop-blur-md bg-white/30 flex items-center justify-center">
                <div className="w-6 h-6 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z" />
                    circle
                  </svg>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-2 left-3 right-5 flex flex-col space-y-1">
              <div className="relative w-full h-2 bg-white/30 rounded">
                <div className="absolute left-0 top-0 h-2 bg-white/50 rounded" style={{ width: "16%" }}></div>
                <div className="absolute left-[4%] top-0 w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>0:00</span>
                <span>8:24</span>
              </div>
            </div>

            {/* Hidden badge and text */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden flex-col space-y-1">
              <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/30 border border-white">
                <span className="text-sm font-medium text-white">LIVE</span>
              </div>
              <h2 className="text-white font-semibold text-3xl tracking-tight">Video Title</h2>
            </div>
          </div>

                
        </div>
      </div>

      {/*Features Section*/}
      <div className="flex py-24 flex-col items-center gap-16 self-stretch">
          <Pheaders text="Full-stack Information & FAQs" supporting="Explore our tech stack from every angle" fontSize="36px" supportingFontSize="20px"/>
          <div className="flex m-w-screen-xl items-center self-stretch">
            <div className="flex flex-col justify-center items-center flex-1 ">
            <div className="flex justify-between items-center w-full"> 
              <div className="flex-1 text-left">
                  <FAQ text="Everything Front End" supporting="Everything about Front-end" fontSize="20px" supportingFontSize="16px"></FAQ>
                  <FAQ text="Everything Back End" supporting="Everything about Back-end" fontSize="20px" supportingFontSize="16px"></FAQ>
                  <FAQ text="Everything Design" supporting="Everything about Design" fontSize="20px" supportingFontSize="16px"></FAQ>
                </div>
                <div className="flex-1 text-right">
                  <FAQ text="Everything Front End" supporting="Everything about Front-end" fontSize="20px" supportingFontSize="16px"></FAQ>
                  <FAQ text="Everything Back End" supporting="Everything about Back-end" fontSize="20px" supportingFontSize="16px"></FAQ>
                  <FAQ text="Everything Design" supporting="Everything about Design" fontSize="20px" supportingFontSize="16px"></FAQ>
                </div>
              </div>
            </div>
          </div>

      </div>

      {/* Core Products Section */}
      <div className="flex py-24 flex-col items-center gap-16 self-stretch">
        <div className="flex m-w-screen-xl px-0 py-8 flex-col items-start gap-16 self-stretch">
          <div className="flex justify-between items-start content-start gap-8 self-stretch flex-wrap">
            <div className="w-[480px] max-w-screen-xl flex-col items-start gap-5 flex-1">
              <Pheaders text="Core Products & Websites " supporting="Look through current Pulp projects, products, and pipelines" fontSize="36px" supportingFontSize="20px"></Pheaders>
              <div className="flex flex-col items-start gap-8">
                <div className="flex items-start gap-8">
                  <InfoCarousel slides={SLIDES} options={OPTIONS}></InfoCarousel>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>



  );
}