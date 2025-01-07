import React from "react";
import "../styles/TextBoxList.css"; 

const TextBoxList = ({ textBoxes }) => {
  return (
    <div className="text-box-list">
      {/* Show a placeholder text if textBoxes is empty */}
      {textBoxes.length === 0 ? (
        <div className="placeholder-text">No text added yet</div> // Placeholder text
      ) : (
        textBoxes.map((text, index) => (
          <div key={index} className="text-box">
            {text}
          </div>
        ))
      )}
    </div>
  );
};

export default TextBoxList;
