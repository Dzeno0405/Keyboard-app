import React, { useRef, useEffect } from "react";
import "../styles/TextDisplay.css";

const TextDisplay = ({ text, setText }) => {
  const textRef = useRef(null);

  // Focus the contentEditable div when component mounts or text changes
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, [text]);

  // Synchronize text state with contentEditable div
  useEffect(() => {
    if (textRef.current.innerText !== text) {
      textRef.current.innerText = text;
      // Keep cursor at the end after text update
      setCursorPositionToEnd();
    }
  }, [text]);

  const setCursorPositionToEnd = () => {
    const range = document.createRange();
    const selection = window.getSelection();

    // Move the cursor to the end of the text content
    range.selectNodeContents(textRef.current);
    range.collapse(false); // Collapse to the end of the content

    selection.removeAllRanges();
    selection.addRange(range);
  };

  // Handle user input in contentEditable div
  const handleInput = () => {
    setText(textRef.current.innerText);
  };

  return (
    <div className="text-display-container">
      <div
        className="text-display"
        contentEditable
        ref={textRef}
        suppressContentEditableWarning={true}
        onInput={handleInput} // Update text state when user types
      ></div>
    </div>
  );
};

export default TextDisplay;
