
"use client"

import {useRef, useState, useEffect, ReactNode } from "react" 

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string
}

const useScrollAnimation = (): [React.RefObject<HTMLDivElement>, boolean] => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Adjust visibility threshold
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "" }) => {
    const [ref, isVisible] = useScrollAnimation();
  
    return (
      <div
        ref={ref}
        className={`opacity-0 transform translate-y-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : ""
        } ${className}`} // Preserve parent styles
      >
        {children}
      </div>
    );
  };
  
  export default AnimatedSection;