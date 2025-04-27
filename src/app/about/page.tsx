"use client";
import React from "react";
import Link from "next/link";
import AboutIntro from "@/components/AboutIntro";
import { motion, useViewportScroll, useTransform } from 'framer-motion';

// Reusable Section Component
interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <motion.section
    className="mb-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.h2
      className="text-3xl font-semibold mb-4 text-white"
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
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
            <div className="relative bg-fixed bg-center bg-gradient-to-br from-purple-900 via-black to-purple-950 p-10 rounded-2xl shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center gap-10">

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
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
            <div className="flex flex-col gap-12 mt-8">
              {[
                ["01", "Streamlined Onboarding", "Helping students and interns hit the ground running with clear pathways, training, and support from day one."],
                ["02", "Empowered SDK Users", "Providing developers the resources they need to master Pulp’s SDK and unlock powerful automation and NLP capabilities."],
                ["03", "Collaborative Growth", "Building a strong community where users, students, and team members grow and innovate together."]
              ].map(([num, title, desc], i) => (
                <motion.div
                  key={num}
                  className="flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="text-5xl font-extrabold text-purple-400">{num}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 max-w-2xl">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Why Pulp101? */}
          <Section title="Why Pulp101?">
            <div className="relative flex flex-col-reverse lg:flex-row items-center bg-fixed bg-center bg-gradient-to-r from-black via-purple-900 to-black p-8 rounded-2xl shadow-2xl">
              {/* Text Column */}
              <div className="lg:w-3/5 space-y-4">
                <motion.p
                  className="text-lg text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                >
                  Pulp101 is your go-to guide for everything Pulp—technical deep dives, team culture insights, and the exact workflows we use to build at scale.
                </motion.p>
                <motion.p
                  className="text-lg text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  In essence, Pulp101 is where <span className="text-purple-400 font-semibold">innovation</span> meets <span className="text-purple-400 font-semibold">community</span>.  
                  It’s the bridge between powerful SDKs and a collaborative ecosystem that empowers you to create, automate, and transform.
                </motion.p>
              </div>

              {/* Big “101” Accent with Parallax */}
              <motion.div
                style={{ y: y101 }}
                className="lg:w-2/5 flex justify-center mb-6 lg:mb-0"
              >
                <div className="text-8xl font-extrabold text-purple-500 opacity-20">
                  101
                </div>
              </motion.div>
            </div>
          </Section>

          {/* Call-to-Action */}
          <div className="text-center mt-12">
            <Link
              href="/docs"
              className="inline-block bg-white text-black px-8 py-4 rounded-md text-lg font-semibold transition duration-200 hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>

        </div>
      </main>
    </>
  );
};

export default About;
