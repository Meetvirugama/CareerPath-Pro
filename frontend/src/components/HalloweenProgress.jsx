import React, { useEffect, useState } from "react";
import "./HalloweenProgress.css";

const HalloweenProgress = ({ percentage = 50, duration = 2500 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = percentage / (duration / 16);

    const animate = () => {
      start += increment;
      if (start >= percentage) start = percentage;
      setProgress(Math.floor(start));
      if (start < percentage) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [percentage, duration]);

  const rotation = 45 + progress * 1.8;

  const getLevel = () => {
    if (progress < 40) return "low";
    if (progress < 75) return "moderate";
    return "high";
  };

  const level = getLevel();

  return (
    <div className={`progress ${level}`}>
      <div className="barOverflow">
        <div
          className="bar"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
      </div>

      <span className="bar-text">
        <strong>{progress}</strong>%
        <div className="status-text">{level.toUpperCase()}</div>
      </span>
    </div>
  );
};

export default HalloweenProgress;
