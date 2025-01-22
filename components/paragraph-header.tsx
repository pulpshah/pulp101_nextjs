// Created by Brian Cao 1/19/2025
// Header to make coding out paragraph or section headers easier
import React from "react";

const Pheaders = ({
  text,
  supporting,
  fontSize = "36px",
  supportingFontSize = "20px",
  letterSpacing = "0px", // Default letter spacing for h1
  supportingLetterSpacing = "0px", // Default letter spacing for h2
}: {
  text: string;
  supporting: string;
  fontSize?: string;
  supportingFontSize?: string;
  letterSpacing?: string; // Letter spacing for main header
  supportingLetterSpacing?: string; // Letter spacing for supporting text
}) => {
  return (
    <div className="flex max-w-screen-xl px-0 py-8 flex-col items-start gap-8 self-stretch">
      <div className="flex flex-col items-start gap-8 self-stretch">
        {/* Supporting text here - mini header/teaser */}
        <div className="flex max-w-screen-96 flex-col items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <h1
              className="font-normal inter"
              style={{
                fontSize: fontSize,
                fontWeight: 800,
                lineHeight: "44px",
                letterSpacing: letterSpacing, // Apply letter spacing
                color: "var(--colors-text-text-primary-900, #F5F5F6)",
              }}
            >
              {text}
            </h1>
          </div>
          <h2
            className="font-normal inter"
            style={{
              fontSize: supportingFontSize,
              fontWeight: 400,
              lineHeight: "30px",
              letterSpacing: supportingLetterSpacing, // Apply letter spacing
              color: "var(--colors-text-text-tertiary-600, #94969C)",
            }}
          >
            {supporting}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Pheaders;
