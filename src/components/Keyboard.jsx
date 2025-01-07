import React from "react";
import "../styles/Keyboard.css"; 

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
          onClick={() => onKeyPress(key)}
        >
          {key === "Backspace" ? "⌫" : key === "Enter" ? "⏎" : key}
        </button>
      ))}
    </div>
  );
};



export default Keyboard;
