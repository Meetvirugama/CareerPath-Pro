import React from "react";
import "./ScarySelector.css";

function ScarySelector({ value, onChange, placeholder, type = "text" }) {
  return (
    <div id="scary-container">
      <div className="left-bone-rounds">
        <div className="round"></div>
        <div className="round"></div>
      </div>

      <div className="bone">
        <input
          type={type}   // ✅ NOW type is defined properly
          min={type === "number" ? 0 : undefined}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>

      <div className="right-bone-rounds">
        <div className="round"></div>
        <div className="round"></div>
      </div>
    </div>
  );
}

export default ScarySelector;
