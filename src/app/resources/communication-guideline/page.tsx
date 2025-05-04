"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Mic, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Pheaders from '@/components/paragraph-header';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const discordItems = [
  { label: 'Quick Questions', icon: <MessageCircle className="h-8 w-8 text-green-400" /> },
  { label: 'Project Updates', icon: <Users className="h-8 w-8 text-blue-400" /> },
  { label: 'Brainstorming', icon: <Mic className="h-8 w-8 text-purple-400" /> },
  { label: 'Voice/Video Calls', icon: <Globe className="h-8 w-8 text-yellow-400" /> },
];

const bestPractices = [
  { title: 'Be Clear & Concise', desc: 'Avoid long-winded messages. Get to the point while providing enough context.' },
  { title: 'Be Professional & Respectful', desc: 'Maintain professionalism in all channels.' },
  { title: 'Use Async Communication', desc: 'Leverage Notion or Loom for non-urgent discussions.' },
  { title: 'Keep Discussions Public', desc: 'Share in public channels unless privacy is required.' },
  { title: 'Visualize & Verbalize Complex Topics', desc: 'Record concise, frequent videos that break down intricate ideas into clear, accessible insights.' },
  { title: 'Engage in Conversations', desc: 'React or reply briefly to confirm receipt.' },
];

export default function CommunicationGuidelinePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bgPosition = (speed: number) => ({ backgroundPosition: `center ${-scrollY * speed}px` });

  return (
    <main className="text-white">
      {/* Hero */}
      <motion.section
        className="h-screen flex items-center justify-center bg-black bg-fixed bg-center bg-no-repeat"
        style={bgPosition(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div
          className="relative z-10 max-w-3xl space-y-6 text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Ensuring clear, efficient, and professional interactions at Pulp
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Effective communication is key to maintaining productivity, collaboration, and a positive team culture at Pulp.
          </p>
        </motion.div>
      </motion.section>

      {/* Discord Cards */}
      <motion.section
        className="py-20 bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-white mb-8">
            Discord – Daily Team Communication
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discordItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.label}</h3>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-gray-300">
            <Pheaders
              text="Best Practices:"
              supporting=""
              fontSize="20px"
              supportingFontSize="16px"
              fontColor="white"
            />
            {/* bump the list up to remove the gap */}
            <ul className="-mt-2 list-disc list-inside text-gray-400 space-y-1">
              <li>
                Use <strong>threaded messages</strong> to keep conversations organized.
              </li>
              <li>
                Mention team members with <strong>@username</strong> only when necessary.
              </li>
              <li>Keep discussions relevant to the channel’s topic.</li>
            </ul>
          </div>
        </div>
      </motion.section>



      {/* Best Practices Cards */}
      <motion.section
        className="py-20 bg-black bg-fixed bg-center text-white"
        style={bgPosition(0.05)}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-8">Communication Best Practices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((bp, i) => (
              <motion.div
                key={i}
                className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <h3 className="text-xl font-bold mb-2">{bp.title}</h3>
                <p className="text-gray-300">{bp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
