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
};

const InfoCarousel: React.FC<PropType> = ({ slides, options }) => {
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
          {slides.map((slide, index) => (
            <div className="flex flex-col justify-end items-start p-6 gap-6 relative w-96 h-[504px] bg-[#0D090A]  shadow-[inset_0px_0px_24px_rgba(255,255,255,0.4),-4.96575px_4.96575px_24.8287px_#282828] backdrop-blur-[14.8972px] rounded-[14px]">
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
              {/* Title */}
              <h3 className="text-white text-2xl font-semibold mt-8">
                {slide.title}
              </h3>
              {/* Description */}
              <p className="text-gray-400 mt-4">{slide.description}</p>
              {/* Footer */}
              <div className="flex justify-between items-center mt-8">
                <span className="text-gray-500 text-sm">
                  {slide.productType}
                </span>
                <span className="text-gray-500 text-sm">v{slide.version}</span>
              </div>
              {/* Learn More */}
              <Link
                href="/learn-more"
                className="text-gray-400 hover:text-gray-500 mt-4 block"
              >
                Learn more →
              </Link>
            </div>
          ))}
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
