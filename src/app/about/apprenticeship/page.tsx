"use client";

import React, { useState, useEffect, useRef } from 'react';
import FeatureCarousel from '@/components/feature-carousel';
import {
  Settings,
  Code,
  MessageCircle,
  Layout,
  ChevronDown
} from 'lucide-react';
import Pheaders from '@/components/paragraph-header';

const apprenticeFeatures = [
  {
    title: 'Automation',
    description: 'Build tools that automate everyday tasks and improve efficiency for internal teams and clients',
    icon: <Settings className="h-6 w-6 text-gray-500" />
  },
  {
    title: 'Natural Language Processing',
    description: 'Process and analyze language data with PulPy, advancing Pulp’s NLP module',
    icon: <Code className="h-6 w-6 text-green-500" />
  },
  {
    title: 'Software Development',
    description: 'Write scalable software and design systems powering Pulp’s solutions',
    icon: <MessageCircle className="h-6 w-6 text-blue-500" />
  },
  {
    title: 'Interaction Design',
    description: 'Develop user-centered design solutions for Pulp’s technology',
    icon: <Layout className="h-6 w-6 text-yellow-500" />
  }
];

const keyFeatures = [
  {
    title: 'Full-time, paid apprenticeship',
    content: 'Enjoy a structured, paid program that balances mentorship with hands-on project work. Expand your skill set while earning.'
  },
  {
    title: 'Work on real projects',
    content: 'Contribute to live codebases and active client engagements, gaining practical experience and portfolio-ready accomplishments.'
  },
  {
    title: 'Mentorship from experienced developers',
    content: 'Pair with senior engineers for code reviews, pair programming sessions, and career guidance throughout your journey.'
  },
  {
    title: 'Collaborative work culture',
    content: 'Join cross-functional teams, participate in design critiques, and learn agile workflows in a supportive environment.'
  },
  {
    title: 'Opportunities for growth and advancement',
    content: 'Demonstrate your impact and earn consideration for a full-time role or specialized tracks within Pulp.'
  }
];

const testimonials = [
  {
    name: 'Brian Cao',
    quote: 'This apprenticeship sharpened my skills and gave me the confidence to deliver real features in production.',
    image: '/images/testimonials/andrew.png'
  },
  {
    name: 'Andrew Shi',
    quote: 'The mentorship here is top-notch! The collaborative programming sessions taught me more than a semester of classes.',
    image: '/images/testimonials/andrew.png'
  },
  {
    name: 'Mohammed Ihtisham',
    quote: 'Contributing to live projects made me feel like a valued team member and prepared me for a career in tech.',
    image: '/images/testimonials/andrew.png'
  }
];

export default function ApprenticeshipPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showSpline, setShowSpline] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Lazy-load the Spline iframe when hero enters view
  useEffect(() => {
    if (!heroRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSpline(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -20% 0px' }
    );
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full min-h-[120vh] overflow-hidden bg-black"
      >
        {showSpline && (
          <div className="absolute inset-0 flex items-center justify-center z-0 scale-90">
            <iframe
              src=""
              frameBorder="0"
              className="w-full h-full pointer-events-none"
              loading="lazy"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center min-h-[120vh] text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in">
            What is an Apprenticeship?
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl animate-fade-in-slow">
            An apprenticeship at Pulp is more than just learning to code, it is about problem-solving, technical craftsmanship, and joining a collaborative community building the future of tech.
          </p>
        </div>
      </div>

      {/* Key Features & Testimonials Marquee */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 min-h-[60vh]">
          {/* Accordion Column */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-white mb-6">
              Key Features of the Pulp Apprenticeship
            </h2>
            <div className="flex flex-col gap-4">
              {keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="border border-purple-500 rounded-xl glow-border overflow-hidden transition-shadow hover:shadow-[0_0_25px_8px_rgba(168,85,247,0.6)]"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === idx ? null : idx)
                    }
                    className="w-full flex justify-between items-center p-6 bg-gray-900 text-white hover:bg-gray-800 transition"
                  >
                    <span className="text-lg font-medium">
                      {feature.title}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        openIndex === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openIndex === idx && (
                    <div className="p-6 bg-gray-800 text-gray-200">
                      <hr className="border-t-2 border-white w-full mb-4" />
                      <p>{feature.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Marquee */}
          <div className="md:w-1/2 flex items-center overflow-hidden">
            <div className="flex items-center animate-marquee">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-80 h-96 p-6 m-4 bg-gray-900 rounded-xl text-white shadow-lg flex flex-col items-center justify-center"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-40 h-40 rounded-full mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-xl text-center">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-center text-sm text-gray-300">
                    {t.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </section>

      {/* What You’ll Work On Section */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6 text-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-purple-400 mb-4 animate-fade-in">
              What You&apos;ll Work On
            </h2>
            <p className="text-lg text-gray-300 animate-fade-in-slow">
              Dive into impactful real-world projects across automation, NLP, software engineering, and UX design.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-10">
            <div className="w-full lg:w-3/4 animate-slide-up">
              <FeatureCarousel features={apprenticeFeatures} />
            </div>
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="w-96 h-96 bg-purple-900 rounded-full flex items-center justify-center animate-pulse-glow">
                <img
                  src="/images/purple_message_logo.png"
                  alt="Pulp Purple Message Icon"
                  className="w-72 h-72 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Look For Section */}
      <section className="bg-white py-20 px-6 text-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Heading */}
          <div className="flex flex-col items-center text-center gap-6">
            <img
              src="/images/pulp101-logo.svg"
              alt="Pulp 101 Logo"
              className="w-28 h-28 p-2 rounded-full bg-black shadow-xl animate-fade-in"
              loading="lazy"
            />
            <h2 className="text-5xl font-extrabold text-purple-700 animate-fade-in">
              What We Look For...
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl animate-fade-in-slow">
              We’re looking for curious, motivated problem-solvers eager to learn and grow.
            </p>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            {[
              {
                emoji: '🧠',
                border: 'border-purple-500',
                title: 'A Strong Foundation',
                desc: 'You should have a strong base in programming, problem-solving, and core tech concepts.'
              },
              {
                emoji: '🚀',
                border: 'border-green-500',
                title: 'Curiosity & Drive',
                desc: 'Be excited to explore challenges, learn, and drive your own growth.'
              },
              {
                emoji: '🤝',
                border: 'border-blue-500',
                title: 'Collaboration Skills',
                desc: 'Thrive when working with others—share ideas and support your team.'
              },
              {
                emoji: '💡',
                border: 'border-yellow-400',
                title: 'Creativity & Initiative',
                desc: 'Bring fresh ideas and take initiative to tackle challenges.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-black ${item.border} shadow-lg hover:shadow-[0_0_25px_8px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300 ease-in-out animate-slide-up text-center`}
              >
                <div className={`w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-${item.border.split('-')[1]}-500`}>
                  <span className="text-4xl">{item.emoji}</span>
                </div>
                <Pheaders
                  text={item.title}
                  supporting={item.desc}
                  fontSize="20px"
                  supportingFontSize="15px"
                  fontColor="white"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship, Video & CTA */}
      <section className="bg-black py-20 px-6 text-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-16">
          {/* Mentorship Text */}
          <div className="flex flex-col gap-6 animate-fade-in">
            <h2 className="text-5xl font-extrabold text-purple-400">Our Approach to Mentorship</h2>
            <p className="text-lg text-gray-300 max-w-3xl">
              Mentorship is the foundation of our apprenticeship program. You’ll be paired with a mentor who supports your growth from day one.
            </p>
            <p className="text-lg text-gray-400 max-w-3xl">
              At Pulp, we’re on a mission to <span className="text-purple-400 font-semibold">push the boundaries of innovation</span> through real tools that transform industries.
            </p>
          </div>
          {/* Video */}
          <div className="flex flex-col gap-8 animate-slide-up delay-100 w-full">
            <h3 className="text-4xl font-bold text-white">Hear from Our Apprentices</h3>
            <div className="w-full flex justify-center">
              <video
                className="w-full max-w-5xl rounded-2xl shadow-xl border-4 border-white hover:shadow-white/70 transition-all duration-300 ease-in-out"
                controls
              />
            </div>
          </div>
          {/* CTA */}
          <div className="flex flex-col gap-6 animate-slide-up delay-200">
            <h3 className="text-4xl font-bold text-yellow-400">Join Our Team Today</h3>
            <p className="text-lg text-gray-300 max-w-3xl">
              Ready to launch your career? Apply to become a Pulp apprentice and start building skills that will set you apart.
            </p>
            <a
              href="#"
              className="mt-6 inline-block bg-yellow-400 text-black font-bold py-3 px-10 rounded-xl shadow-lg hover:bg-yellow-300 transition duration-300 ease-in-out"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
