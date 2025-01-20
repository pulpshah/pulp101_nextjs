'use client'

import React, {FC} from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '@/components/css/embla.css'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author, BlogMdxFrontmatter, getAllBlogs } from "@/lib/markdown";
import { formatDate2, stringToDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


type PropType = {
    slides: { logo: string, title: string, status: string, description: string, productType: string, version: string }[];
    options?: EmblaOptionsType;
};

const InfoCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide flex-none w-1/3 p-4 relative" key={index}> 
                <div className="logo-container absolute top-0 left-0 p-2"> 
                    <Image src="/path/to/logo.png" alt="Logo" width={40} height={40} />
                </div>
              <h3 className="self-stretch" style={{fontSize: "30px", fontFamily: "inter", lineHeight: "38px"}}> {slide.title}</h3>
                <p className="self-stretch" style={{fontFamily: "inter", fontSize: "20px", lineHeight:"30px"}}>{slide.status}</p>
                <p className="text-base mt-2">{slide.description}</p>
                <div className="productType-container absolute bottom-0 left-0">
                    <p className="text-sm color-gray">{slide.productType}</p>
                </div>
                
                <p className="text-sm mt-2">Version: {slide.version}</p>
                <Link href="/learn-more" className="text-blue-500 mt-4 inline-block">
                    Learn more
                </Link>
                
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoCarousel
