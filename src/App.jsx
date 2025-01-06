import React, { useState, useEffect, useRef } from "react";
import Keyboard from "./components/Keyboard";
import TextDisplay from "./components/TextDisplay";

const App = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);  // Track whether typing with keyboard or clicking
  const textRef = useRef(null);  // Reference for text container

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isTyping) {
        if (/^[a-zA-Z0-9]$/.test(e.key)) {
          setText((prev) => prev + e.key);  // Add typed character to the text
        } else if (e.key === "Backspace") {
          const selectedText = window.getSelection().toString();
          if (selectedText) {
            setText("");  // If text is selected, clear all
          } else {
            setText((prev) => prev.slice(0, -1));  // Handle backspace normally
          }
        } else if (e.key === "Enter") {
          setText((prev) => prev + "\n");  // Handle Enter key
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isTyping]);

  // Update typing mode when user interacts with virtual keyboard
  const handleKeyClick = (key) => {
    if (key === "backspace") {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        setText("");  // Clear all text if anything is selected
      } else {
        setText((prev) => prev.slice(0, -1));  // Remove the last character
      }
    } else if (key === "Enter") {
      setText((prev) => prev + "\n");  // Add new line on Enter
    } else {
      setText((prev) => prev + key);  // Add regular key
    }
    setIsTyping(true); // Switch to typing mode after a click
  };

  return (
    <div className="app">
      <TextDisplay text={text} />
      <Keyboard onKeyPress={handleKeyClick} />
    </div>
  );
};

export default App;
