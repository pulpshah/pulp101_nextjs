"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen, Database, ChartLine, Globe } from 'lucide-react';
import FeatureCarousel from '@/components/feature-carousel';
import Pheaders from '@/components/paragraph-header';

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
      <section
        className="h-screen flex items-center justify-center bg-black bg-fixed bg-center bg-no-repeat"
        style={bgPosition(0.2)}
      >
        <div className="max-w-3xl space-y-8 text-center px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold text-purple-400">
            Research at Pulp
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            At Pulp, research isn’t just about sitting in a lab or studying theories in isolation—it’s about <strong>interconnecting</strong> with various areas of the company and <strong>learning by doing</strong>. As an apprentice or team member, you’ll have the opportunity to engage in meaningful research that spans across <strong>automation</strong>, <strong>natural language processing (NLP)</strong>, <strong>interaction design</strong>, and more.
          </p>
        </div>
      </section>

      {/* Why Research Section */}
      <section
        className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black bg-fixed bg-center bg-no-repeat"
        style={bgPosition(0.1)}
      >
        <div className="max-w-3xl space-y-6 px-6 text-center">
          <h2 className="text-4xl font-bold">
            Why Research is Vital at Pulp
          </h2>
          <p className="text-gray-300">
            Research at Pulp is foundational to everything we do. It's more than just a tool for gaining knowledge; it's a <strong>way of thinking</strong>, a <strong>way of questioning</strong>, and a <strong>way of evolving</strong> our processes and solutions. Whether you're exploring new algorithms for automation, looking into the latest trends in NLP, or investigating best practices in interaction design, the key to meaningful research at Pulp is <strong>collaboration and continuous learning</strong>.
          </p>
        </div>
      </section>

      {/* Opportunities to Learn and Develop */}
      <section
        className="h-screen flex items-center justify-center bg-black bg-fixed bg-center bg-no-repeat"
        style={bgPosition(0.05)}
      >
        <div className="max-w-4xl space-y-4 px-6 text-center">
          <h3 className="text-3xl font-semibold">
            Opportunities to Learn and Develop
          </h3>
          <ol className="list-decimal list-inside space-y-4 text-gray-200">
            <li><strong>Interest-Driven Exploration:</strong> Freedom to dive into areas you’re passionate about.</li>
            <li><strong>Interdisciplinary Connection:</strong> Connect coding skills with design, data analysis, and AI & rhetoric.</li>
            <li><strong>Collaboration with Experts:</strong> Access a network of seasoned professionals for real-world insights.</li>
          </ol>
        </div>
      </section>

      {/* Featured Research Projects Section */}
      <section
        className="h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black bg-fixed bg-center bg-no-repeat"
        style={bgPosition(0.1)}
      >
        <div className="max-w-7xl text-center px-6">
          <h2 className="text-4xl font-bold text-purple-400 mb-6">
            Featured Research Projects
          </h2>
          <FeatureCarousel features={researchItems} />
        </div>
      </section>

      {/* Publications & Case Studies Section */}
      <section
        className="h-screen flex items-center justify-center bg-white bg-fixed bg-center bg-no-repeat"
        style={bgPosition(0.05)}
      >
        <div className="max-w-4xl space-y-8 px-6 text-center text-black">
          <h2 className="text-3xl font-bold">
            Publications & Case Studies
          </h2>
          {[
            '2024: Automating Data Pipelines',
            '2023: Sentiment Analysis in Social Monitoring',
            '2022: UX Impact of Interactive Dashboards',
          ].map((title, i) => (
            <div key={i} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg">
              <Pheaders
                text={title}
                supporting="Read the full report to see methodology, results, and key takeaways."
                fontSize="18px"
                supportingFontSize="14px"
                fontColor="black"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="h-screen flex items-center justify-center text-center bg-black bg-fixed bg-center bg-no-repeat"
        style={bgPosition(0)}
      >
        <div className="max-w-3xl space-y-6 px-6">
          <h3 className="text-3xl font-bold">
            Want to Collaborate?
          </h3>
          <p className="text-gray-300">
            Reach out to our research team to propose new studies or partnerships.
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-500 text-white py-3 px-8 rounded-xl hover:bg-purple-400"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}

export default ResearchPage;
