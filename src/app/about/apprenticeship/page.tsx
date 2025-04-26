"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import FeatureCarousel from '@/components/feature-carousel';
import { Settings, Code, MessageCircle, Layout } from 'lucide-react';
import Pheaders from '@/components/paragraph-header';
import AboutIntro from '@/components/AboutIntro';

const apprenticeFeatures = [{
    title: 'Automation',
    description: 'Build tools that automate everyday tasks and improve efficiency for internal teams and clients',
    icon:  <Settings className="h-6 w-6 text-gray-500" />,
  },
  {
    title: 'Natural Language Processing',
    description: 'Work with cutting-edge techniques to process and analyze language data, advancing the capabilities of PulPy, Pulp’s NLP module',
    icon:  <Code className="h-6 w-6 text-green-500" />,
  },
  {
    title: 'Software Development',
    description: 'Write high-quality code, design systems, and build scalable software that powers Pulp’s innovative solutions',
    icon:  <MessageCircle className="h-6 w-6 text-blue-500" />,
  },
  {
    title: 'Interaction Design',
    description: 'Develop user-centered design solutions that enhance how people interact with Pulp’s technology',
    icon:  <Layout className="h-6 w-6 text-yellow-500" />,
  },
];


const apprenticeshipPage = () => {
    const [showSpline, setShowSpline] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY < window.innerHeight * 0.8) {
        setShowSpline(true);
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once immediately
    return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        
        <div> {/* Main Div */}
            <div className="relative w-full min-h-[120vh] overflow-hidden bg-black">
  
            {/* Spline iframe dynamically loaded */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                {showSpline && (
                <div className="scale-90 w-full h-full">
                    <iframe
                    src="https://my.spline.design/abstractnirvana-Yv6xTYbUh5fJ9TWIPS7t6HeA/"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    className="pointer-events-none"
                    ></iframe>
                </div>
                )}
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

            {/* Main Text */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-[120vh] text-center px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in">
                What is an Apprenticeship?
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 max-w-3xl animate-fade-in-slow">
                An apprenticeship at Pulp is more than just learning to code — it's about sharpening your problem-solving skills, mastering technical craftsmanship, and becoming part of a vibrant, collaborative community building the future of tech.
                </p>
            </div>

            </div>


           

            <section className="bg-black py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                
                {/* Text Column */}
                <div className="md:w-1/2 flex flex-col gap-6">
                <h2 className="text-4xl font-bold text-white mb-6">Key Features of the Pulp Apprenticeship</h2>
                <div className="flex flex-col gap-6">
                    {[
                    "Full-time, paid apprenticeship",
                    "Work on real projects",
                    "Mentorship from experienced developers",
                    "Collaborative work culture",
                    "Opportunities for growth and advancement",
                    ].map((feature, index) => (
                    <div
                        key={index}
                        className="group flex items-center gap-4 p-6 bg-gray-900 rounded-xl shadow-md border border-gray-700 hover:border-purple-500 hover:shadow-purple-500/50 transition-all duration-300 ease-in-out"
                    >
                        <span className="text-purple-400 text-2xl font-bold group-hover:text-purple-300 transition">
                        •
                        </span>
                        <p className="text-white text-lg group-hover:text-purple-300 transition">
                        {feature}
                        </p>
                    </div>
                    ))}
                </div>
                </div>

                {/* Image Column */}
                <div className="md:w-1/2 flex justify-center">
                <img
                    src="/images/smiling_programmer.jpg"
                    alt="Pulp Apprenticeship"
                    className="w-[500px] md:w-[600px] lg:w-[700px] rounded-2xl shadow-xl border-4 border-purple-500 hover:scale-105 transition-transform duration-300 ease-in-out object-cover"
                    loading="lazy"
                />
                </div>

            </div>
            </section>







            <section className="bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6 text-white">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Section Heading */}
                <div className="text-center">
                <h2 className="text-5xl font-extrabold text-purple-400 mb-4 animate-fade-in">What You'll Work On</h2>
                <p className="text-lg text-gray-300 animate-fade-in-slow">
                    Dive into impactful real-world projects across automation, NLP, software engineering, and UX design.
                </p>
                </div>

                {/* Feature Carousel + Logo */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-10">
                
                {/* Feature Carousel */}
                <div className="w-full lg:w-3/4 animate-slide-up">
                    <FeatureCarousel features={apprenticeFeatures} />
                </div>

               
                {/* Decorative Logo with Pulse Animation */}
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



            <section className="bg-white py-20 px-6 text-black">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Heading Area */}
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
                    We’re looking for individuals who are curious, motivated, and eager to learn. Whether you’re an aspiring engineer, tech enthusiast, or passionate problem-solver, we want to hear from you.
                </p>
                </div>

                {/* Traits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">

                {/* Card 1 */}
                <div className="p-6 rounded-2xl bg-black border border-purple-500 shadow-lg hover:shadow-[0_0_25px_8px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300 ease-in-out animate-slide-up text-center">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-500">
                    <span className="text-4xl">🧠</span>
                    </div>
                    <Pheaders
                    text="A Strong Foundation"
                    supporting="You should have a strong base in programming, problem-solving, and core tech concepts."
                    fontSize="20px"
                    supportingFontSize="15px"
                    fontColor="white"
                    />
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-2xl bg-black border border-green-500 shadow-lg hover:shadow-[0_0_25px_8px_rgba(34,197,94,0.8)] hover:scale-105 transition-all duration-300 ease-in-out animate-slide-up delay-100 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-500">
                    <span className="text-4xl">🚀</span>
                    </div>
                    <Pheaders
                    text="Curiosity and Drive"
                    supporting="We value apprentices excited to explore challenges, learn, and drive their own growth."
                    fontSize="20px"
                    supportingFontSize="15px"
                    fontColor="white"
                    />
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-2xl bg-black border border-blue-500 shadow-lg hover:shadow-[0_0_25px_8px_rgba(59,130,246,0.8)] hover:scale-105 transition-all duration-300 ease-in-out animate-slide-up delay-200 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-500">
                    <span className="text-4xl">🤝</span>
                    </div>
                    <Pheaders
                    text="Collaboration Skills"
                    supporting="We thrive when we collaborate, share ideas, and support each other as a team."
                    fontSize="20px"
                    supportingFontSize="15px"
                    fontColor="white"
                    />
                </div>

                {/* Card 4 */}
                <div className="p-6 rounded-2xl bg-black border border-yellow-400 shadow-lg hover:shadow-[0_0_25px_8px_rgba(250,204,21,0.8)] hover:scale-105 transition-all duration-300 ease-in-out animate-slide-up delay-300 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-yellow-400">
                    <span className="text-4xl">💡</span>
                    </div>
                    <Pheaders
                    text="Creativity and Initiative"
                    supporting="We encourage innovation. Bring fresh ideas, and take initiative to tackle challenges."
                    fontSize="20px"
                    supportingFontSize="15px"
                    fontColor="white"
                    />
                </div>

                </div>

            </div>
            </section>




                
            <section className="bg-black py-20 px-6 text-white">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-16">

                {/* Mentorship Section */}
                <div className="flex flex-col gap-6 animate-fade-in">
                <h2 className="text-5xl font-extrabold text-purple-400">Our Approach to Mentorship</h2>
                <p className="text-lg text-gray-300 max-w-3xl">
                    Mentorship is the foundation of our apprenticeship program. From your first day, you'll be paired with a mentor who supports your growth and helps you unlock your potential.
                </p>
                <p className="text-lg text-gray-400 max-w-3xl">
                    At Pulp, we're on a mission to <span className="text-purple-400 font-semibold">push the boundaries of innovation</span>. 
                    As an apprentice, you'll be building real tools that transform industries and empower people.
                </p>
                </div>

                {/* Apprentice Video Section */}
                <div className="flex flex-col gap-8 animate-slide-up delay-100 w-full">
                <h3 className="text-4xl font-bold text-white">Hear from Our Apprentices</h3>
                <div className="w-full flex justify-center">
                    <video 
                    className="w-full max-w-5xl rounded-2xl shadow-xl border-4 border-white hover:shadow-white/70 transition-all duration-300 ease-in-out"
                    controls
                    >
                    </video>
                </div>
                </div>


                {/* Join Our Team Section */}
                <div className="flex flex-col gap-6 animate-slide-up delay-200">
                <h3 className="text-4xl font-bold text-yellow-400">Join Our Team Today</h3>
                <p className="text-lg text-gray-300 max-w-3xl">
                    Ready to launch your career? Apply to become a Pulp apprentice and start building skills that will set you apart. We can't wait to meet you!
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
    )

}

export default apprenticeshipPage;