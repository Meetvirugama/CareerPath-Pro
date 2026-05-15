import React, { useState, useRef, useEffect } from "react";
import "./ScarySelector.css";

function ScarySelector({ value, onChange, placeholder, type = "text", options = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div id="scary-container" ref={containerRef}>
      <div className="left-bone-rounds">
        <div className="round"></div>
        <div className="round"></div>
      </div>

      <div className="bone">
        {options ? (
          <div className="custom-select-container">
            <div 
              className={`custom-select-value ${!value ? "placeholder" : ""}`} 
              onClick={() => setIsOpen(!isOpen)}
            >
              {value || placeholder}
            </div>
            {isOpen && (
              <ul className="custom-select-options">
                {options.map((opt) => (
                  <li 
                    key={opt} 
                    onClick={() => {
                      onChange({ target: { value: opt } });
                      setIsOpen(false);
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <input
            type={type}
            min={type === "number" ? 0 : undefined}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </div>

      <div className="right-bone-rounds">
        <div className="round"></div>
        <div className="round"></div>
      </div>
    </div>
  );
}

export default ScarySelector;
