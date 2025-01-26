"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "@/components/css/embla.css";
import Image from "next/image";
import Link from "next/link";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; 

let darkened = "#FFF";

const randomColors = () => {
  const colors = ["#00A676", "#007BFF", "#6F42C1"];
  let color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

const darkenColor = (color: string): string => {
  if (color.charAt(0) === '#') {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const factor = 0.9; // Darken by reducing brightness
    const darkenedR = Math.floor(r * factor);
    const darkenedG = Math.floor(g * factor);
    const darkenedB = Math.floor(b * factor);
    return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
  }
  return color;
};


const carouselVariant = cva(
  "flex flex-col justify-end items-start p-6 gap-6 relative w-96 h-[504px] shadow-[inset_0px_0px_24px_rgba(255,255,255,0.4),-4.96575px_4.96575px_24.8287px_#282828] backdrop-blur-[14.8972px] rounded-[14px]",
  {
    variants: {
      color: {
        default: "bg-[#0D090A] rounded-[14px]",
        randomColor: "bg[#00A676]",
      },
      description: {
        default_desc: "text-gray-400 mt-4",
        randomColor_desc: "", 
      },
    defaultVariants: {
      color: "default",
    },
  }
  }
); 

type PropType = {
  slides: {
    logo: string;
    title: string;
    status: string;
    description: string;
    productType: string;
    version: string;
  }[];
  options?: EmblaOptionsType;
  color?: "default" | "randomColor";
};

const InfoCarousel: React.FC<PropType> = ({ slides, options, color }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container pl-8 flex gap-8">
          {slides.map((slide, index) => {
            const backgroundColor = randomColors();
            const descriptionColor = darkenColor(backgroundColor);
            return (
          
            <div 
            key={index}
            className={cn(carouselVariant({ color }))}
            style={color === "randomColor" ? {
              backgroundColor: backgroundColor,
              borderRadius: "0px",
             } : {}}>
              {/* Logo */}
              <div className="absolute top-4 left-4">
                <Image
                  src={slide.logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded"
                />
              </div>
              {/* Status */}
              <div className="absolute top-4 right-4">
                <span className="text-xs text-white bg-gray-800 px-2 py-1 rounded">
                  {slide.status}
                </span>
              </div>
              <div className="w-5/5 h-2/7" style={ color === "randomColor" ? {backgroundColor: descriptionColor, } : {}}>
                {/* Title */}
                <h3 className="text-white text-2xl font-semibold px-4 py-2">
                  {slide.title}
                </h3>
                {/* Description */}
                <p className="text-white-400 mt-4 px-4 py-10">
                  {slide.description}
                </p>
                {/* Learn More */}
                <Link
                  href="/learn-more"
                  className="text-white-400 hover:text-gray-500 mt-4 block px-4 py-2"
                >
                  Learn more →
                </Link>
              </div>
              
              
              {/* Footer */}
              <div className="flex justify-between items-center mt-8 w-full">
                {/* Product Type */}
                <span className="text-white-500 text-sm">
                  {slide.productType}
                </span>
                
                {/* Version Number */}
                <span className="text-white-500 text-sm">
                  v{slide.version}
                </span>
              </div>
            </div>
          );
          })}
        </div>
      </div>

      <div className="embla__controls mt-4">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCarousel;
