"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
    return (
        
        <div> {/* Main Div */}
            <div className='flex flex-col items-center justify-center w-[99vw] h-screen bg-gradient-to-r from-purple-900 to-purple-400'>   {/* Div for What is an Apprenticeship */}
                <h1 className='text-4xl font-bold mb-4'>What is an Apprenticeship?</h1>
                <div>
                    <p className='text-xl mb-8 text-center p-20'>An apprenticeship at Pulp is not just about learning to code—it's about building your problem-solving abilities, honing your technical expertise, and integrating into a collaborative work culture. You’ll work alongside seasoned professionals, contributing to meaningful projects and gaining the kind of experience that sets you apart in today’s competitive tech industry.</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center bg-gray-200 p-10">
    
                <div className="md:w-1/2 text-gray-900 ml-20 p-20">
                    <h2 className=" text-2xl font-bold text-black mb-4">Key Features of the Pulp Apprenticeship</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="text-purple-700 font-bold text-xl mr-2">•</span> Full-time, paid apprenticeship
                        </li>
                        <li className="flex items-center">
                            <span className="text-purple-700 font-bold text-xl mr-2">•</span> Work on real projects
                        </li>
                        <li className="flex items-center">
                            <span className="text-purple-700 font-bold text-xl mr-2">•</span> Mentorship from experienced developers
                        </li>
                        <li className="flex items-center">
                            <span className="text-purple-700 font-bold text-xl mr-2">•</span> Collaborative work culture
                        </li>
                        <li className="flex items-center">
                            <span className="text-purple-700 font-bold text-xl mr-2">•</span> Opportunities for growth and advancement
                        </li>
                    </ul>
                </div>

   
                <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                    <img src="/images/smiling_programmer.jpg" alt="Pulp Apprenticeship" className="w-full max-w-md rounded-lg shadow-lg border-4 border-purple-300"></img>
                        
                </div>
            </div>

            <div className='p-20 bg-white text-black'>   {/* Div Wrapper */}
                <div className='flex flex-col bg-white'>   {/* What You'll Work On */}
                    <h1 className='text-3xl py-5 font-bold'>What You'll Work On</h1>
                    <div className='items-center flex flex-row justify-between'>
                        <FeatureCarousel features={apprenticeFeatures}/>
                        <div>
                            <img src="\images\purple_message_logo.png" alt="Purple Message Icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row items-center bg-gray-200 p-20'>
                <div className='flex flex-col mt-20 bg-gray-200 text-black px-10'>   {/* What We Look For */}
                        <div className='flex flex-row items-center'>
                            <img src='/images/pulp101-logo.svg' className='bg-black w-[80px] h-[80px] p-2 rounded-full'/>
                        </div>
                        <h1 className='text-3xl py-5 font-bold'>What We Look For...</h1>
                        <div>
                            <h3>We’re looking for individuals who are curious, motivated, and eager to learn. Whether you’re an aspiring software engineer, a tech enthusiast, or someone passionate about problem-solving, we want to hear from you. Here are some qualities we look for in an apprentice:
                            </h3>
                            <br/>
                            <div className='flex flex-row items-center justify-between p-10'>
                                <div className='flex flex-col items-center w-[15vw]'>
                                    <Pheaders text='A Strong Foundation' supporting='You don’t need to be an expert, but you should have a basic understanding of programming, problem-solving, and core technical concepts' fontSize='20px' supportingFontSize='15px' fontColor='black' />
                                </div>
                                <div className='w-[15vw]'>
                                    <Pheaders text='Curiosity and Drive' supporting='We love apprentices who want to learn and grow. If you’re someone who’s excited to take on new challenges, we’ll give you the resources and support to thrive.' fontSize='20px' supportingFontSize='15px' fontColor='black' />
                                </div>
                                <div className='w-[15vw]'>
                                    <Pheaders text='Collaboration Skills' supporting='Being a part of the Pulp team means working closely with others. We value apprentices who are comfortable collaborating, asking questions, and sharing ideas.' fontSize='20px' supportingFontSize='15px' fontColor='black' />
                                </div>
                                <div className='w-[15vw]'>
                                    <Pheaders text='Creativity and Initiative' supporting='At Pulp, we encourage innovation and creativity. We’re looking for individuals who are excited to bring fresh ideas to the table and take initiative in tackling challenges.' fontSize='20px' supportingFontSize='15px' fontColor='black' />
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </div>
                
            <section className="bg-white text-gray-800 py-12 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-purple-600">Our Approach to Mentorship</h2>
                    <p className="mt-4 text-lg">
                    Mentorship is a cornerstone of our apprenticeship program. From your first day at Pulp, you’ll be paired with a mentor who will support your growth and development.
                    </p>
                    <p className="mt-4">
                    At Pulp, we’re on a mission to <strong>push the boundaries of innovation</strong>. We believe that technology has the power to 
                    <strong>transform industries</strong>, <strong>create new opportunities</strong>, and <strong>improve lives</strong>. As an apprentice at Pulp, 
                    you’ll be at the forefront of that change, helping us create tools that make a real difference. 
                    </p>
                </div>

                <div className="max-w-3xl mx-auto text-center mt-8">
                    <h3 className="text-xl font-semibold text-purple-600">Hear from our Apprentices</h3>
                    <div className="mt-4">
                    <video className="w-full max-w-md mx-auto rounded-lg shadow-lg" controls>
                    
                    </video>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto text-center mt-12">
                    <h3 className="text-xl font-semibold text-purple-600">Join Our Team Today</h3>
                    <p className="mt-4">
                    Ready to take the next step in your tech career? Apply to be an apprentice at Pulp today and start building the skills 
                    you need to succeed in the fast-paced world of technology. We can’t wait to meet you!
                    </p>
                    <a href="#" className="mt-6 inline-block bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition">
                    Apply Now
                    </a>
                </div>
            </section>
            
            
        </div>
    )

}

export default apprenticeshipPage;