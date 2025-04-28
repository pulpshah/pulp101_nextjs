"use client";
import React from "react";
import Link from "next/link";
import AboutIntro from "@/components/AboutIntro";
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';  // at the top with your other imports

// Reusable Section Component
interface SectionProps {
  title: string;
  children: React.ReactNode;
}
// Reusable Section Component
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <motion.section
    className="mb-12 min-h-[60vh] flex flex-col justify-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.h2
      className="text-3xl font-semibold mb-4 text-white"
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {title}
    </motion.h2>
    {children}
  </motion.section>
);


const About: React.FC = () => {
  const { scrollY } = useViewportScroll();
  const y101 = useTransform(scrollY, [0, 400], [0, -50]);

  return (
    <>
      {/* Animated Intro Section */}
      <AboutIntro />

      {/* Main Content */}
      <main className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-8">

          {/* What is Pulp 101? */}
          <Section title="What is Pulp 101?">
          <div className="relative bg-fixed bg-center bg-gradient-to-br from-purple-900 via-black to-purple-950 p-8 rounded-2xl shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center gap-5">

                {/* Left side - fancy description */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-4xl font-extrabold text-white mb-6">
                    Your Portal to Innovation
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="text-purple-400 font-semibold">Pulp 101</span> is more than a guide — it’s your entryway into Pulp’s ecosystem of innovation. 
                    Whether you’re mastering our SDK or onboarding as a new intern, Pulp 101 connects you directly to the tools, culture, 
                    and community that power everything we build.
                  </p>
                </div>

                {/* Right side - graphic or accent */}
                <div className="flex-1 flex justify-center">
                  <div className="w-72 h-72 rounded-full bg-purple-600/20 border-4 border-purple-400 flex items-center justify-center shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                    <img
                      src="/images/pulp101-logo.svg"
                      alt="Pulp 101 Logo"
                      className="w-40 h-40 object-contain animate-pulse-slow"
                    />
                  </div>
                </div>

              </div>
            </div>
          </Section>

          {/* Key Features */}
          <Section title="Key Features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black p-6 rounded-2xl shadow-lg border border-purple-600 hover:scale-105 hover:shadow-purple-500/60 transition-all duration-300 ease-in-out">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Interactive, Engaging Documentation
                </h3>
                <p className="text-gray-300">
                  Not just static documents — an interactive, hands-on learning platform with live code examples.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black p-6 rounded-2xl shadow-lg border border-purple-600 hover:scale-105 hover:shadow-purple-500/60 transition-all duration-300 ease-in-out">
                <h3 className="text-2xl font-bold text-white mb-2">SDK Mastery</h3>
                <p className="text-gray-300">
                  Step-by-step tutorials, detailed guides, and code references to unlock the full potential of Pulp’s SDK.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black p-6 rounded-2xl shadow-lg border border-purple-600 hover:scale-105 hover:shadow-purple-500/60 transition-all duration-300 ease-in-out">
                <h3 className="text-2xl font-bold text-white mb-2">Team Culture & Collaboration</h3>
                <p className="text-gray-300">
                  A behind-the-scenes look at how Pulp operates, showcasing our collaborative work style and communication tools.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-black p-6 rounded-2xl shadow-lg border border-purple-600 hover:scale-105 hover:shadow-purple-500/60 transition-all duration-300 ease-in-out">
                <h3 className="text-2xl font-bold text-white mb-2">Smooth Onboarding</h3>
                <p className="text-gray-300">
                  Clear onboarding checklists, mentorship guides, and tips to ensure a seamless transition into Pulp’s workflow.
                </p>
              </div>
            </div>
          </Section>

          {/* Our Goals */}
          <Section title="Our Goals">
            <div className="flex flex-col lg:flex-row items-start gap-12 mt-8">
              
              {/* ← Left: Your goals list */}
              <div className="flex-1 flex flex-col gap-12">
                {/* Goal 1 */}
                <motion.div
                  className="flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-5xl font-extrabold text-purple-400">01</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Streamlined Onboarding</h3>
                    <p className="text-gray-400 max-w-2xl">
                      Helping students and interns hit the ground running with clear pathways, training, and support from day one.
                    </p>
                  </div>
                </motion.div>

                {/* Goal 2 */}
                <motion.div
                  className="flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="text-5xl font-extrabold text-purple-400">02</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Empowered SDK Users</h3>
                    <p className="text-gray-400 max-w-2xl">
                      Providing developers the resources they need to master Pulp’s SDK and unlock powerful automation and NLP capabilities.
                    </p>
                  </div>
                </motion.div>

                {/* Goal 3 */}
                <motion.div
                  className="flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-5xl font-extrabold text-purple-400">03</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Collaborative Growth</h3>
                    <p className="text-gray-400 max-w-2xl">
                      Building a strong community where users, students, and team members grow and innovate together through collaboration.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right: Spline animation placeholder */}
              <div className="flex-1 relative min-h-[60vh] rounded-2xl overflow-hidden bg-black">
                <iframe
                  src="https://my.spline.design/worldplanet-wOepMSkHYCtvTFa4MmCLzkV9/"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full pointer-events-none bg-transparent"
                />
              </div>


            </div>
          </Section>


          <Section title="Why Pulp101?">
          <div className="relative flex flex-col lg:flex-row items-center bg-gradient-to-r from-black via-purple-900 to-black p-16 sm:p-20 rounded-2xl overflow-hidden min-h-[60vh]">
          
          {/* Soft background graphic (parallax) */}
          <div
            className="absolute inset-0 bg-fixed bg-center bg-[url('/images/your-tech-pattern.png')] opacity-20"
            aria-hidden="true"
          />

          {/* Text + CTA */}
          <motion.div
            className="relative z-10 lg:w-2/3 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-extrabold text-white">Why Pulp101?</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Pulp101 is your one-stop hub for mastering our SDK, understanding our workflows, and plugging into the collaborative culture that powers Pulp’s innovation.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              From interactive code examples to behind-the-scenes team insights, Pulp101 equips you with everything you need to build, automate, and transform.
            </p>
            <Link
              href="/docs"
              className="inline-block bg-purple-500 text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-400 transition"
            >
              Dive In
            </Link>
          </motion.div>

          {/* Decorative Illustration or Logo */}
          <motion.div
            className="relative z-10 lg:w-1/3 flex justify-center mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/images/pulp101-illustration.svg"
              alt="Pulp 101 Illustration"
              className="w-60 h-60 object-contain animate-float-slow"
            />
          </motion.div>
        </div>
      </Section>


          {/* Call-to-Action */}
          <motion.div
            className="
              glow-border
              relative
              my-16
              py-12
              px-8
              bg-gradient-to-r from-purple-900 to-black
              rounded-3xl
              overflow-hidden
              transition-transform duration-300 hover:scale-105
            "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* subtle texture, optional */}
            <div
              className="absolute inset-0 bg-[url('/images/cta-pattern.png')] bg-center bg-cover opacity-10"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-lg mx-auto text-center space-y-6">
              <h4 className="text-2xl font-semibold text-white">
                Ready to explore Pulp101 in depth?
              </h4>
              <Link
                href="/docs"
                className="
                  inline-flex items-center 
                  bg-white text-black font-bold 
                  px-6 py-3 rounded-full shadow-lg 
                  transition-all duration-300 hover:bg-gray-200 hover:scale-105
                "
              >
                Get Started
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default About;
