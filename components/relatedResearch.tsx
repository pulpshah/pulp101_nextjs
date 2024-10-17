import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import EmblaCarousel from "@/components/EmblaCarousel";
import { getAllBlogs } from "@/lib/markdown";

interface RelatedResearchProps {
  research: string[];
}

export default async function RelatedResearch({research}: RelatedResearchProps) 
{

  const allResearch = (await getAllBlogs()); 
  const relResearch = allResearch.filter((obj) => research.includes(obj.slug));

  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }

  if(relResearch.length==0) return<></>;

  return (
    <div>
      <EmblaCarousel slides={relResearch} options={OPTIONS}/>
    </div>
  );
};