import React, { useState, useEffect, useRef } from "react";
import TextDisplay from "./components/TextDisplay";
import Keyboard from "./components/Keyboard";
import TextBoxList from "./components/TextBoxList";
import Footer from "./components/Footer"; 
import logo from "/logo.png";

const App = () => {
  const [text, setText] = useState(""); // Current text input
  const [textBoxes, setTextBoxes] = useState([]); // List of text boxes
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Track keyboard visibility
  const [isPortrait, setIsPortrait] = useState(true); // Track screen orientation
  const textRef = useRef(null); // Reference to the content-editable div
  const cursorRef = useRef(0); // Track cursor position

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus(); // Auto-focus on text area
    }

    const handleOrientationChange = () => {
      if (window.innerHeight < window.innerWidth) {
        setIsPortrait(false);
        setKeyboardVisible(true);
      } else {
        setIsPortrait(true);
        setKeyboardVisible(false);
      }
    };

    handleOrientationChange(); // Initial check
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  // Prevent the default keyboard from opening on focus
  const handleFocus = (event) => {
    event.preventDefault();
    textRef.current.blur(); // Ensure the mobile keyboard is not triggered
  };

  const handleVirtualKeyPress = (key) => {
    processKeyPress(key);
  };

  const handlePhysicalKeyPress = (event) => {
    const { key, metaKey, ctrlKey, altKey } = event;

    if (metaKey || ctrlKey || altKey) {
      return; // Ignore modifier keys
    }

    if (key === "Enter" || key === "Backspace" || key === "Delete" || /^[a-zA-Z0-9\s]$/.test(key)) {
      event.preventDefault();
      processKeyPress(key);
    }
  };

  // Process key press (used for both physical and virtual keyboard)
  const processKeyPress = (key) => {
    const currentCursor = cursorRef.current; // Get current cursor position
    const selection = window.getSelection(); // Get selection (highlighted text)
    const selectedText = selection ? selection.toString() : ''; // Get selected text

    if (key === "Backspace" || key === "Delete") {
      if (selectedText.length > 0) {
        // If there's selected text, delete it
        setText((prevText) => prevText.replace(selectedText, ''));
      } else {
        // Remove the character at the current cursor position
        if (key === "Backspace" && currentCursor > 0) {
          setText((prevText) => {
            const updatedText = prevText.slice(0, currentCursor - 1) + prevText.slice(currentCursor);
            cursorRef.current = currentCursor - 1; // Update cursor position after deletion
            return updatedText;
          });
        }
      }
    } else if (key === "Enter") {
      if (text.trim()) {
        setTextBoxes((prev) => [...prev, text.trim()]);
        setText(""); // Clear text on enter
      }
    } else {
      // Insert character at the current cursor position
      setText((prevText) => {
        const updatedText = prevText.slice(0, currentCursor) + key + prevText.slice(currentCursor);
        cursorRef.current = currentCursor + 1; // Update cursor position after the insertion
        return updatedText;
      });
    }
  };

  // Handle click to insert text at cursor position
  const handleTextClick = (event) => {
    const selection = window.getSelection();
    const cursorPosition = selection ? selection.anchorOffset : text.length; // Get clicked position (anchorOffset)

    cursorRef.current = cursorPosition; // Track the cursor position
    
    textRef.current.focus(); // Ensure the field remains focused
  };

  useEffect(() => {
    document.addEventListener("keydown", handlePhysicalKeyPress);
    return () => {
      document.removeEventListener("keydown", handlePhysicalKeyPress);
    };
  }, [text]);

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "150px",
            height: "auto",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        />
        <TextBoxList textBoxes={textBoxes} />
        <div
          style={{ flex: 1 }}
          onClick={handleTextClick} // Handle click event
        >
          <TextDisplay
            text={text}
            setText={setText}
            textRef={textRef}
            onFocus={handleFocus} // Prevent mobile keyboard
          />
          {keyboardVisible && <Keyboard onKeyPress={handleVirtualKeyPress} />}
        </div>
      </div>
      {isPortrait && (
        <div
          style={{
            backgroundColor: "#1b2735",
            color: "#ffffff",
            fontSize: "18px",
            marginTop: "20px",
            padding: "15px 20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            fontWeight: "bold",
            maxWidth: "90%",
            margin: "20px auto",
            lineHeight: "1.5",
          }}
        >
          <p>Please rotate your phone to use the keyboard</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
