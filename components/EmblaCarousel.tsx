"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from '@/components/EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '@/components/EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import '@/components/css/embla.css'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author, BlogMdxFrontmatter, getAllBlogs } from "@/lib/markdown";
import { formatDate2, stringToDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


type relResearch = 
{
  slug: string;
  content: React.ReactElement;
  frontmatter: BlogMdxFrontmatter;
}

type PropType = {
  slides: relResearch[]
  options?: EmblaOptionsType
}

function EmblaCarousel({ slides, options }: PropType)
{

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index.slug}>
              <div className="embla__slide__number"><BlogCard {...index.frontmatter} slug={index.slug} key={index.slug} /></div>
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

function BlogCard({
  date,
  title,
  description,
  slug,
  cover,
  authors,
}: BlogMdxFrontmatter & { slug: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="flex flex-col gap-3 items-start rounded-md py-5 px-3 min-h-[400px] no-underline"
    >
      <h3 className="text-base font-semibold pr-7 text-white mt-1">{title}</h3>
      <div className="w-full -mt-32">
        <Image
          src={cover}
          alt={title}
          width={400}
          height={150}
          quality={80}
          className="w-full rounded-md object-cover h-[200px] "
        />
      </div>
      <p className="text-xs text-muted-foreground -mt-32">{description}</p>
      <div className="flex items-center justify-between w-full -mt-8">
        <p className="text-[13px] text-muted-foreground">
          Published on {formatDate2(date)}
        </p>
        <AvatarGroup users={authors}/>
      </div>
    </Link>
  );
}

function AvatarGroup({ users, max = 4 }: { users: Author[]; max?: number }) {
  const displayUsers = users.slice(0, max);
  const remainingUsers = Math.max(users.length - max, 0);

  return (
    <div className="flex items-center -mt-4">
      {displayUsers.map((user, index) => (
        <Avatar
          key={user.username}
          className={`inline-block border-2 w-9 h-9 border ${
            index !== 0 ? "-ml-3" : ""
          } `}
        >
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingUsers > 0 && (
        <Avatar className="-ml-3 inline-block border-2 border-background hover:translate-y-1 transition-transform">
          <AvatarFallback>+{remainingUsers}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default EmblaCarousel
