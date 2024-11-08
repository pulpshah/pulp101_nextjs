"use client";

import React, { useState, ReactNode, ReactElement } from "react";
import ChatPill from "./CommentBox/ChatPill";
import { Typography } from "./typography";

interface HoverableContentProps {
  content: ReactNode;
  slug: string;
  email: string | null;
}

export default function HoverableContent({ content, slug, email }: HoverableContentProps) {
  const [hoveredText, setHoveredText] = useState<string | null>(null);

  // Render content with hoverable-text applied to specific elements
  const renderWithHoverableText = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return node;
    }

    if (Array.isArray(node)) {
      return node.map((child, index) => renderWithHoverableText(child));
    }

    if (React.isValidElement(node)) {
      const element = node as ReactElement<{ className?: string; onMouseEnter?: () => void; children?: ReactNode }>;
      const tagName = element.type;

      // Apply onMouseEnter directly to the elements of interest
      if (tagName === "p" || tagName === "h1" || tagName === "h2" || tagName === "h3") {
        return React.cloneElement(element, {
          className: `${element.props.className || ""} hoverable-text`,
          onMouseEnter: () => setHoveredText(element.props.children?.toString() || null),
          key: element.key || Math.random().toString(36).substr(2, 9),
        });
      }
      return React.cloneElement(element, { key: element.key || Math.random().toString(36).substr(2, 9) });
    }

    return node;
  };

  return (
    <div>
      <div className="!w-full">
        <Typography>{renderWithHoverableText(content)}</Typography>
      </div>
      <ChatPill slug={slug} email={email} hoveredText={hoveredText} />
    </div>
  );
}
