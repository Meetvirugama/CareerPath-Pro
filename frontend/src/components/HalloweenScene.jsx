import React from "react";
import "./HalloweenScene.css";

export default function HalloweenScene() {
  return (
    <div className="container">
      {/* Background */}
      <div className="moon"></div>

      <div className="clouds cloud1"><div></div><div></div></div>
      <div className="clouds cloud2"><div></div><div></div></div>
      <div className="clouds cloud3"><div></div><div></div></div>
      <div className="clouds cloud4"><div></div><div></div></div>
      <div className="clouds cloud5"><div></div><div></div></div>

      <div className="smoke"><div></div></div>

      <div className="tree tree1"></div>
      <div className="tree tree2"></div>
      <div className="tree tree3"></div>
      <div className="tree tree4"></div>
      <div className="tree tree5"></div>

      {/* Lantern Garland */}
      <div className="dancing-line">
        {[...Array(8)].map((_, index) => (
          <div className="pumpkin" key={index}>
            <div className="stem"></div>
            <div className="heart"></div>

            {/* Different Faces */}
            {index % 3 === 0 && (
              <>
                <div className="rounded-eyes"></div>
                <div className="rounded-eyes"></div>
                <div className="mean-mouth"></div>
              </>
            )}

            {index % 3 === 1 && (
              <>
                <div className="eye"></div>
                <div className="eye eye-right"></div>
                <div className="bb-mouth"></div>
              </>
            )}

            {index % 3 === 2 && (
              <>
                <div className="rounded-eyes baby-eyes"></div>
                <div className="rounded-eyes baby-eyes"></div>
                <div className="mean-mouth"></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
