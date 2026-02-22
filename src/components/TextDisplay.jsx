import "../styles/TextDisplay.css";

// Pure display component — no contentEditable complexity.
// All input is routed through App's handleKeyPress; this just renders state.
const TextDisplay = ({ text }) => (
  <div className="text-display-wrapper">
    <label className="text-display-label">Current input</label>

    <div className={`text-display${text ? " text-display--has-text" : ""}`}>
      {text ? (
        <>
          <span className="text-content">{text}</span>
          <span className="cursor" aria-hidden="true" />
        </>
      ) : (
        <span className="text-placeholder">Start typing…</span>
      )}
    </div>

    <div className="text-display-hint">
      Press <kbd>Enter</kbd> to add to the list &nbsp;·&nbsp; <kbd>⌫</kbd> to delete
    </div>
  </div>
);

export default TextDisplay;
