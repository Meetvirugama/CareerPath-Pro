import React from "react";
import "./ScarySelector.css";

function ScarySelector({ value, onChange, placeholder, type = "text", options = null }) {
  return (
    <div id="scary-container">
      <div className="left-bone-rounds">
        <div className="round"></div>
        <div className="round"></div>
      </div>

      <div className="bone">
        {options ? (
          <select value={value} onChange={onChange}>
            <option value="" disabled>{placeholder}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
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
