'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutIntro: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-green-800 opacity-80 -z-10" />

      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          What is Pulp101?
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-10"
        >
          Pulp101 is a cutting-edge, interactive documentation platform designed to empower developers and onboard students/interns. Explore intuitive guides, real-world code examples, and discover how our innovative tools redefine the way you work and learn.
        </motion.p>

        {/* Hero Image with animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full max-w-4xl"
        >
          <Image
            src="/images/about-hero.png"
            alt="Pulp101 Overview"
            width={1200}
            height={600}
            className="rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntro;
