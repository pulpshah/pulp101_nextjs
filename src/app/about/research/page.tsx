"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen, Database, ChartLine, Globe } from 'lucide-react';
import FeatureCarousel from '@/components/feature-carousel';
import Pheaders from '@/components/paragraph-header';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactModal from '@/components/ContactModal';
import VantaBackground from '@/components/VantaBackground';

const researchItems: { title: string; description: string; icon: React.ReactElement }[] = [
  { title: 'Data Analysis', description: 'Dive deep into datasets to uncover actionable insights for our clients and internal dashboards.', icon: <Database className="h-6 w-6 text-green-500" /> },
  { title: 'User Studies', description: 'Conduct interviews, surveys, and usability tests to inform product decisions.', icon: <Globe className="h-6 w-6 text-blue-500" /> },
  { title: 'Visualization', description: 'Build interactive charts and maps that make complex data easy to understand.', icon: <ChartLine className="h-6 w-6 text-purple-500" /> },
  { title: 'Publication', description: 'Collaborate on whitepapers, case studies, and blog posts to share Pulp’s latest findings.', icon: <BookOpen className="h-6 w-6 text-yellow-500" /> },
];

function ResearchPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Function to compute background position based on speed factor
  const bgPosition = (speed: number) => ({ backgroundPosition: `center ${-scrollY * speed}px` });

  return (
    <main className="text-white">
      {/* Hero & Intro Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-black">
        <VantaBackground effect="WAVES" />
        <div className="z-10 max-w-3xl space-y-8 px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold text-purple-400">
            Research at Pulp
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            At Pulp, research isn’t just about sitting in a lab or studying theories in isolation—it’s about <strong>interconnecting</strong> with various areas of the company and <strong>learning by doing</strong>.
          </p>
        </div>
      </section>

      {/* Why Research Section */}
      <section
        className="h-screen bg-gradient-to-b from-gray-900 to-black bg-fixed bg-center bg-no-repeat flex items-center justify-center"

      >
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white">
              Why Research is Vital at Pulp
            </h2>
            <p className="text-gray-300">
              Research at Pulp is foundational to everything we do. It's more than just a tool for gaining knowledge; it's a <strong>way of thinking</strong>, a <strong>way of questioning</strong>, and a <strong>way of evolving</strong> our processes and solutions.
            </p>
            <blockquote className="text-purple-300 italic border-l-4 pl-4 border-purple-500">
              “The best ideas at Pulp come from digging deep, failing fast, and learning forward.”
            </blockquote>
          </div>

          {/* Animated SVG or Lottie Graphic */}
          <div className="flex justify-center">
            <Image
              src="/assets/research-animation.gif" // swap for lottie, SVG, or image
              alt="Research Graphic"
              width={400}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Opportunities to Learn and Develop */}
      <section
        className="h-screen bg-black bg-fixed flex items-center justify-center"
        style={bgPosition(0.05)}
      >
        <div className="max-w-6xl px-6 text-center space-y-6">
          <h3 className="text-3xl font-semibold text-white">Opportunities to Learn and Develop</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: '💡',
                title: 'Interest-Driven Exploration',
                desc: 'Freedom to dive into areas you’re passionate about.'
              },
              {
                icon: '🧩',
                title: 'Interdisciplinary Connection',
                desc: 'Connect coding skills with design, data analysis, and AI.'
              },
              {
                icon: '🤝',
                title: 'Collaboration with Experts',
                desc: 'Access a network of seasoned professionals for real-world insights.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Research Projects Section */}
      <section
        className="h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black bg-fixed bg-center"
        style={bgPosition(0.1)}
      >
        <motion.div
          className="max-w-7xl text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-purple-400 mb-6">
            Featured Research Projects
          </h2>
          <FeatureCarousel features={researchItems} />
        </motion.div>
      </section>

      {/* Publications & Case Studies Section */}
      <section
        className="h-screen flex items-center justify-center bg-white bg-fixed bg-center"
        style={bgPosition(0.05)}
      >
        <div className="max-w-4xl space-y-8 px-6 text-center text-black">
          <h2 className="text-3xl font-bold">Publications & Case Studies</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '2024: Automating Data Pipelines', tag: 'AI + Ops' },
              { title: '2023: Sentiment Analysis in Social Monitoring', tag: 'NLP' },
              { title: '2022: UX Impact of Interactive Dashboards', tag: 'Design Research' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition"
              >
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                  {item.tag}
                </span>
                <Pheaders
                  text={item.title}
                  supporting="Read the full report to see methodology, results, and key takeaways."
                  fontSize="18px"
                  supportingFontSize="14px"
                  fontColor="black"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-black">
        <VantaBackground effect="DOTS" />
        <div className="z-10 max-w-3xl space-y-6 px-6">
          <h3 className="text-3xl font-bold">
            Want to Collaborate?
          </h3>
          <p className="text-gray-300">
            Reach out to our research team to propose new studies or partnerships.
          </p>
          <ContactModal />
        </div>
      </section>

    </main>
  );
}

export default ResearchPage;
