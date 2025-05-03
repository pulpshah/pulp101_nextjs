"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Pheaders from '@/components/paragraph-header';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const sections = [
  {
    icon: <MessageCircle className="h-12 w-12 text-blue-400" />,
    title: 'Discord – Real-Time Team Interaction',
    points: [
      'Instant Messaging – Team members can quickly ask questions, share ideas, and troubleshoot issues.',
      'Voice Channels – For real-time conversations, stand-ups, and brainstorming sessions.',
      'Dedicated Channels – Organized by project, topic, or team role to keep discussions relevant and focused.',
      'Community & Networking – A space for apprentices and mentors to interact, share insights, and support each other.',
    ],
    bg: 'bg-indigo-900 text-white',
    subtitleColor: 'text-indigo-200',
    liColor: 'text-indigo-100'
  },
  {
    icon: <Phone className="h-12 w-12 text-green-400" />,
    title: 'Phone – Quick & Direct Contact',
    points: [
      'Mentorship & Support – Apprentices can reach out to mentors for quick guidance when needed.',
      'Team Coordination – Used for fast decision-making when text communication isn’t sufficient.',
      'Client & External Communication – When working with external partners, phone calls help streamline discussions.',
    ],
    bg: 'bg-gray-800 text-white',
    subtitleColor: 'text-green-200',
    liColor: 'text-gray-300'
  },
  {
    icon: <Mail className="h-12 w-12 text-purple-400" />,
    title: 'Email – Formal & Asynchronous Communication',
    points: [
      'Official Announcements – Updates, newsletters, and important company-wide messages.',
      'Project Documentation & Reports – Formal submissions, feedback, and long-form discussions.',
      'External Communications – Contacting clients, partners, or external stakeholders.',
    ],
    bg: 'bg-white text-black',
    subtitleColor: 'text-purple-500',
    liColor: 'text-gray-700'
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CommunicationAtPulpPage() {
  return (
    <main className="py-20 px-6 bg-gray-50">
      {/* Hero */}
      <motion.section
        className="max-w-3xl mx-auto text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Communication at Pulp
        </h1>
        <Pheaders
          text="Staying connected and collaborating effectively"
          supporting="At Pulp, clear and efficient communication is essential for teamwork, mentorship, and project success. We utilize multiple channels to ensure that team members can stay connected, ask questions, and share updates effortlessly."
          fontSize="18px"
          supportingFontSize="16px"
          fontColor="#4A5568"
        />
      </motion.section>

      {/* Cards Grid */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
      >
        {sections.map((sec, i) => {
          const [toolName, toolSub] = sec.title.split('–').map((s) => s.trim());
          return (
            <motion.div
              key={i}
              className={`${sec.bg} rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="flex items-center justify-center mb-4">
                {sec.icon}
              </div>
              <h2 className="text-2xl font-bold text-center mb-1">
                {toolName}
              </h2>
              <h3 className={`text-xl font-medium text-center mb-4 ${sec.subtitleColor}`}>
                {toolSub}
              </h3>
              <ul className={`list-disc list-inside space-y-2 text-base leading-relaxed ${sec.liColor}`}>
                {sec.points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Conclusion Card */}
      <motion.section
        className="max-w-3xl mx-auto mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
      >
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Pheaders
            text="By using Discord for daily interactions, phone calls for quick discussions, and email for structured communication, Pulp ensures a balanced, efficient, and responsive work environment."
            supporting=""
            fontSize="18px"
            supportingFontSize="16px"
            fontColor="#2D3748"
          />
        </motion.div>
      </motion.section>
    </main>
  );
}
