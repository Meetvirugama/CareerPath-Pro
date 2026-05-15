import React from "react";
import "./HalloweenErrorModal.css";

export default function HalloweenErrorModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-modal-overlay">
      <div className="error-modal-content">
        <h2 className="error-title">💀 Error! 💀</h2>
        <p className="error-message">{message}</p>
        <button className="error-close-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
