'use client';

import React, { useRef, useEffect, useState } from "react";
import { Book, Rocket, Code } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      className="border border-solid text-gray shadow-lg p-10 h-[250px] w-[350px] rounded-lg"
    >
      <div className="flex items-center space-x-3">
        {feature.icon}
        <h3 className="text-lg font-semibold">{feature.title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
    </motion.div>
  );
};

interface FeatureCarouselProps {
  features: Feature[];
}

const FeatureCarousel: React.FC<FeatureCarouselProps> = ({ features }) => {
  return (
    <div className="flex p-4 flex-wrap max-w-[1000px] gap-10">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
};

export default FeatureCarousel;
