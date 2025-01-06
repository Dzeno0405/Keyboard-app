import React, { useEffect, useState, useRef } from "react";
import "../styles/TextDisplay.css";

const TextDisplay = ({ text }) => {
  const [cursorPosition, setCursorPosition] = useState(0); // Track cursor position
  const textRef = useRef(null); // Reference for the text container
  const textContainerRef = useRef(null); // Container reference for width calculations

  // Update cursor position after text changes
  useEffect(() => {
    if (textContainerRef.current && textRef.current) {
      // Create a temporary span to measure text width
      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.whiteSpace = "pre"; // Preserve formatting like newlines
      span.textContent = text;
      textContainerRef.current.appendChild(span);

      // Set cursor position based on text width
      setCursorPosition(span.offsetWidth); // Get the width of the text
      textContainerRef.current.removeChild(span); // Clean up
    }
  }, [text]); // Trigger this effect every time text changes

  return (
    <div className="text-display" ref={textContainerRef}>
      <span ref={textRef}>{text}</span>
      <div
        className="cursor"
        style={{
          left: `${cursorPosition}px`, // Position the cursor after the last letter
        }}
      />
    </div>
  );
};

export default TextDisplay;
