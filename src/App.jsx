import React, { useRef, useState, useEffect } from "react";
import TextDisplay from "./components/TextDisplay";
import Keyboard from "./components/Keyboard";
import logo from './assets/logo.svg';  // Import the SVG image

const App = () => {
  const [text, setText] = useState("");
  const textRef = useRef(null);

  // Automatically focus on the contentEditable when the component mounts
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  const setCursorPositionToEnd = () => {
    const selection = window.getSelection();
    const range = document.createRange();

    if (textRef.current.firstChild) {
      range.selectNodeContents(textRef.current);
      range.collapse(false); // Place the cursor at the end
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleVirtualKeyPress = (key) => {
    if (key === "Backspace") {
      setText((prev) => prev.slice(0, -1)); // Handle Backspace
    } else if (key === "Enter") {
      setText((prev) => {
        // Prevent adding a second newline if there's already one at the end
        if (prev.endsWith("\n")) {
          return prev; // Don't append another newline
        }
        return prev + "\n"; // Add newline
      });
    } else {
      setText((prev) => prev + key); // Regular character input
    }
  
    // Re-focus and set cursor position after state updates
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.focus(); // Ensure caret blinks
        setCursorPositionToEnd(); // Keep cursor at the end
      }
    }, 0);
  };

  return (
    <div className="app">
      <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto', position: 'absolute', top: '20px', left: '20px' }} />
      {/* Display the logo */}
      <TextDisplay text={text} setText={setText} textRef={textRef} />
      <Keyboard onKeyPress={handleVirtualKeyPress} />
    </div>
  );
};

export default App;
