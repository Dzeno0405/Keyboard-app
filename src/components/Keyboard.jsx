import React from "react";
import "../styles/Keyboard.css"; // Ensure path is correct

const Keyboard = ({ onKeyPress }) => {
  const keys = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "Z", "X", "C", "V", "B", "N", "M",
    "Backspace", "Enter"
  ];

  return (
    <div className="keyboard">
      {keys.map((key) => (
        <button
          key={key}
          className="key"
          onClick={() => {
            if (key === "Backspace") {
              onKeyPress("backspace"); // Special backspace handling
            } else if (key === "Enter") {
              onKeyPress("Enter"); // Handle enter (new line)
            } else {
              onKeyPress(key); // Regular key press
            }
          }}
        >
          {key === "Backspace" ? "⌫" : key === "Enter" ? "⏎" : key}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
