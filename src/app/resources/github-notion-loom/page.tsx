"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Pheaders from '@/components/paragraph-header';

const toolSections = [
  {
    title: 'GitHub – Code & Collaboration',
    description:
      'GitHub is the backbone of our software development process, enabling smooth version control and teamwork.',
    items: [
      'Version Control & Code Management – All code contributions follow a structured workflow using branches, commits, and pull requests.',
      'Collaborative Development – Team members review, comment, and improve code together through pull requests and discussions.',
      'Issue Tracking & Project Management – We use GitHub Issues to assign tasks, track bugs, and ensure progress is well-documented.',
      'CI/CD Integration – Automated testing and deployment pipelines help maintain code quality and streamline releases.',
    ],
  },
  {
    title: 'Notion – Knowledge & Organization',
    description:
      'Notion acts as our digital knowledge hub, keeping all essential information structured and accessible.',
    items: [
      'Centralized Documentation – Every project has dedicated pages for guidelines, roadmaps, and best practices.',
      'Task & Project Management – We organize sprints, milestones, and daily tasks within Notion for clear team alignment.',
      'Searchable Knowledge Base – From API references to onboarding materials, everything is stored in a way that’s easy to find.',
      'Cross-Team Collaboration – Notion’s shared workspaces keep different teams connected and informed.',
    ],
  },
  {
    title: 'Loom – Communication & Feedback',
    description:
      'Loom helps us maintain clear communication without unnecessary meetings, serving as a crucial tool for asynchronous collaboration.',
    items: [
      'Video Documentation – Team members record walkthroughs to explain complex ideas, reducing the need for live calls.',
      'Code Reviews & Demos – Developers record quick videos to highlight changes instead of lengthy text explanations.',
      'Training & Onboarding – New apprentices and team members get up to speed faster with recorded tutorials and guides.',
      'Meeting Alternatives – Loom allows us to share updates and feedback efficiently, minimizing constant sync calls.',
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ToolsPage() {
  return (
    <main className="py-20 px-6 bg-gray-50 text-gray-800">
      {/* Header */}
      <motion.header
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="inline-block">
          <h1 className="text-4xl font-extrabold">Tools We Use</h1>
          <div className="w-auto h-1 bg-purple-500 rounded mt-2 mb-2 mx-auto" />
        </div>
        <p className="text-lg italic text-gray-600">
          How we integrate GitHub, Notion, and Loom into our daily workflow
        </p>
      </motion.header>

      {/* Cards Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {toolSections.map((section, idx) => {
          const [toolName, toolSub] = section.title.split('–').map((s) => s.trim());
          return (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-gray-800">{toolName}</h2>
                <h3 className="text-xl font-medium text-purple-500 mt-1 mb-3">{toolSub}</h3>
                <div className="w-auto h-1 bg-purple-400 rounded mx-auto mb-4" />
              </div>
              <p className="text-gray-600 mb-4 text-center">{section.description}</p>
              <hr className="border-t border-gray-200 my-4" />
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <ChevronRight className="mt-1 mr-2 text-purple-500" strokeWidth={4} size={24} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Card */}
      <motion.div
        className="max-w-7xl mx-auto mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div
          className="bg-gradient-to-r from-purple-100 to-purple-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 text-center">
              Wrapping It All Up
            </h3>
            <div className="w-1/2 mx-auto h-1 bg-purple-500 rounded mb-4" />
            <p className="text-gray-800 text-center">
              By integrating <strong>GitHub</strong>, <strong>Notion</strong>, and <strong>Loom</strong>, we create a seamless,
              collaborative, and efficient work environment that fosters growth, innovation, and teamwork at Pulp.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
