import { useEffect, useRef } from "react";
import "../styles/TextBoxList.css";

const TextBoxList = ({ textBoxes, onClear }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [textBoxes]);

  return (
    <div className="message-list">
      {/* Header */}
      <div className="message-list-header">
        <span className="message-list-title">
          Messages
          {textBoxes.length > 0 && (
            <span className="message-count">{textBoxes.length}</span>
          )}
        </span>
        {textBoxes.length > 0 && (
          <button
            className="clear-btn"
            onClick={onClear}
            title="Clear all messages"
            type="button"
          >
            Clear
          </button>
        )}
      </div>

      {/* Body */}
      <div className="message-list-body">
        {textBoxes.length === 0 ? (
          <div className="message-empty">
            <span className="message-empty-icon" aria-hidden="true">⌨️</span>
            <p className="message-empty-primary">No messages yet</p>
            <p className="message-empty-hint">
              Type something and press Enter
            </p>
          </div>
        ) : (
          <>
            {textBoxes.map((msg, i) => (
              <div key={i} className="message-bubble">
                <span className="message-index" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="message-text">{msg}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default TextBoxList;
