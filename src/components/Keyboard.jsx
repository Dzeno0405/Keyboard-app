import "../styles/Keyboard.css";

// Standard QWERTY rows (letters + digits).
// Backspace slots into the right of row 0, Enter into the right of row 2.
const ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Key = ({ label, display, extraClass = "", onKeyPress, isActive }) => (
  <button
    type="button"
    className={`key${extraClass ? " " + extraClass : ""}${isActive ? " key--active" : ""}`}
    onClick={() => onKeyPress(label)}
    aria-label={label === " " ? "Space" : label}
    // Prevent the button from stealing focus away from the page
    onMouseDown={(e) => e.preventDefault()}
  >
    {display}
  </button>
);

const Keyboard = ({ onKeyPress, activeKey }) => (
  <div className="keyboard" role="group" aria-label="Virtual keyboard">
    {ROWS.map((row, rowIdx) => (
      <div key={rowIdx} className="keyboard-row">
        {row.map((k) => (
          <Key
            key={k}
            label={k}
            display={k}
            onKeyPress={onKeyPress}
            isActive={activeKey === k}
          />
        ))}

        {/* Backspace at the end of the number row */}
        {rowIdx === 0 && (
          <Key
            label="Backspace"
            display="⌫"
            extraClass="key--wide key--danger"
            onKeyPress={onKeyPress}
            isActive={activeKey === "Backspace"}
          />
        )}

        {/* Enter at the end of the home row */}
        {rowIdx === 2 && (
          <Key
            label="Enter"
            display="↵ Enter"
            extraClass="key--wide key--success"
            onKeyPress={onKeyPress}
            isActive={activeKey === "Enter"}
          />
        )}
      </div>
    ))}

    {/* Space bar row */}
    <div className="keyboard-row">
      <Key
        label=" "
        display="SPACE"
        extraClass="key--space"
        onKeyPress={onKeyPress}
        isActive={activeKey === " "}
      />
    </div>
  </div>
);

export default Keyboard;
