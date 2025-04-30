// ============================================
// File Purpose: Utility functions for styling, routing, date formatting, and debounce
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/30/2025
// ============================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EachRoute, RESEARCH_ROUTE, ROUTES } from "./routes-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function helperSearch(
  query: string,
  node: EachRoute,
  prefix: string,
  currenLevel: number,
  maxLevel?: number
) {
  const res: EachRoute[] = [];
  let parentHas = false;

  const nextLink = `${prefix}${node.href}`;
  if (!node.noLink && node.title.toLowerCase().includes(query.toLowerCase())) {
    res.push({ ...node, items: undefined, href: nextLink });
    parentHas = true;
  }
  const goNext = maxLevel ? currenLevel < maxLevel : true;
  if (goNext)
    node.items?.forEach((item) => {
      const innerRes = helperSearch(
        query,
        item,
        nextLink,
        currenLevel + 1,
        maxLevel
      );
      if (!!innerRes.length && !parentHas && !node.noLink) {
        res.push({ ...node, items: undefined, href: nextLink });
        parentHas = true;
      }
      res.push(...innerRes);
    });
  return res;
}

export function advanceSearch(query: string) {
  return ROUTES.map((node) =>
    helperSearch(query, node, "", 1, query.length === 0 ? 2 : undefined)
  ).flat();
}

export function advanceSearchResearch(query: string) {
  return RESEARCH_ROUTE.map((node) =>
    helperSearch(query, node, "", 1, query.length === 0 ? 2 : undefined)
  ).flat();
}

// Thursday, May 23, 2024
export function formatDate(dateStr: string | undefined): string {
  const date = stringToDate(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// May 23, 2024
export function formatDate2(dateStr: string | undefined): string {
  const date = stringToDate(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function stringToDate(dateStr: string | undefined): Date {
  if (!dateStr || typeof dateStr !== "string") {
    return new Date(0); // fallback date
  }

  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => isNaN(n))) {
    return new Date(0);
  }

  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

export function debounce(func: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
