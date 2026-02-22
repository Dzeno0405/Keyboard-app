import { useState, useEffect, useCallback } from "react";
import TextDisplay from "./components/TextDisplay";
import Keyboard from "./components/Keyboard";
import TextBoxList from "./components/TextBoxList";
import Footer from "./components/Footer";
import "./styles/App.css";
import logo from "/logo.png";

const App = () => {
  const [text, setText] = useState("");
  const [textBoxes, setTextBoxes] = useState([]);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  // activeKey lets the Keyboard component light up the key that was just pressed
  const [activeKey, setActiveKey] = useState(null);

  // ── Orientation / device detection ──────────────────────────────
  useEffect(() => {
    const check = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobilePortrait(isTouchDevice && isSmallScreen && isPortrait);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Core key-press handler (virtual + physical) ──────────────────
  const handleKeyPress = useCallback((key) => {
    if (key === "Enter") {
      const trimmed = text.trim();
      if (trimmed) {
        setTextBoxes((boxes) => [...boxes, trimmed]);
        setText("");
      }
    } else if (key === "Backspace") {
      setText((prev) => prev.slice(0, -1));
    } else {
      setText((prev) => prev + key);
    }

    // Flash the matching key on the virtual keyboard
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 140);
  }, [text]);

  // ── Physical keyboard listener ───────────────────────────────────
  // Stable because handleKeyPress is memoised with useCallback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Enter") {
        e.preventDefault();
        handleKeyPress("Enter");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleKeyPress("Backspace");
      } else if (e.key === " ") {
        e.preventDefault();
        handleKeyPress(" ");
      } else if (e.key.length === 1) {
        // Any printable character — uppercase so it matches the virtual keys
        handleKeyPress(e.key.toUpperCase());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  // ── Actions ──────────────────────────────────────────────────────
  const handleClear = useCallback(() => setTextBoxes([]), []);

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <img src={logo} alt="KeyMate logo" className="header-logo" />
        <div>
          <p className="header-title">Dzenan's KeyMate</p>
          <p className="header-subtitle">Click or type — press Enter to save</p>
        </div>
      </header>

      {/* Main */}
      <main className="app-main">
        {isMobilePortrait ? (
          <div className="rotate-prompt">
            <div className="rotate-icon">↻</div>
            <p className="rotate-text">Rotate your device</p>
            <p className="rotate-hint">
              This app works best in landscape orientation
            </p>
          </div>
        ) : (
          <div className="app-layout">
            {/* Left — message history */}
            <aside className="history-panel">
              <TextBoxList textBoxes={textBoxes} onClear={handleClear} />
            </aside>

            {/* Right — text display + keyboard */}
            <section className="input-panel">
              <TextDisplay text={text} />
              <Keyboard onKeyPress={handleKeyPress} activeKey={activeKey} />
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
