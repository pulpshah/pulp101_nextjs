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
  align = "left",
}: {
  text: string;
  supporting: string;
  fontSize?: string;
  supportingFontSize?: string;
  letterSpacing?: string; // Letter spacing for main header
  supportingLetterSpacing?: string; // Letter spacing for supporting text
  align?: "left" | "center";
}) => {
  return (
    <div className={`flex max-w-screen-xl px-0 py-8 flex-col items-${align === "center" ? "center" : "start"} gap-8 self-stretch`}>
      <div className={`flex flex-col items-${align === "center" ? "center" : "start"} gap-8 self-stretch`}>
        {/* Supporting text here - mini header/teaser */}
        <div className={`flex max-w-screen-96 flex-col items-${align === "center" ? "center" : "start"} gap-5 self-stretch`}>
        <div className={`flex flex-col items-${align === "center" ? "center" : "start"} gap-3 self-stretch`}> 
            <h1
              className="font-normal inter text-textColor"
              style={{
                fontSize: fontSize,
                fontWeight: 800,
                lineHeight: "44px",
                letterSpacing: letterSpacing, // Apply letter spacing
                textAlign: align,
              }}
            >
              {text}
            </h1>
          </div>
          <h2
            className="font-normal inter text-textColor"
            style={{
              fontSize: supportingFontSize,
              fontWeight: 400,
              lineHeight: "30px",
              letterSpacing: supportingLetterSpacing, // Apply letter spacing
              textAlign: align,
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
