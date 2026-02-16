import React, { useRef } from "react";
import gsap from "gsap";
import "./TrickOrTreatButton.css";

export default function TrickOrTreatButton({
  textLines = ["Predict Your Future!"],
  onClick,
  loading = false,
}) {
  const btnRef = useRef(null);
  const emitterRef = useRef(null);

  const createParticles = (parent, quantity) => {
    const colors = ["#39ff14", "#8b0000", "#920783", "#FFF33F"];

    for (let i = 0; i < quantity; i++) {
      const dot = document.createElement("div");

      dot.style.setProperty(
        "--b",
        colors[Math.floor(Math.random() * colors.length)]
      );

      parent.appendChild(dot);

      const angle = gsap.utils.random(-120, -60);
      const velocity = gsap.utils.random(80, 200);

      const x = Math.cos((angle * Math.PI) / 180) * velocity;
      const y = Math.sin((angle * Math.PI) / 180) * velocity;

      gsap.set(dot, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: gsap.utils.random(0.3, 0.6),
      });

      gsap.to(dot, {
        x: x,
        y: y,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => dot.remove(),
      });
    }
  };

  const handleClick = () => {
    if (loading) return;
    if (onClick) onClick();

    const btn = btnRef.current;
    const emitter = emitterRef.current;
    if (!btn || !emitter) return;

    const tl = gsap.timeline();

    tl.to(btn, { scale: 0.95, duration: 0.15 });

    tl.to(
      btn.querySelector("#pumpkin"),
      { scaleY: 0.9, transformOrigin: "bottom", duration: 0.15 },
      "<"
    );

    tl.to(
      btn.querySelectorAll(".text div"),
      { y: -25, duration: 0.3, stagger: 0.05 },
      "<"
    );

    tl.to(
      btn.querySelector("#p-top"),
      { rotate: -20, transformOrigin: "bottom", duration: 0.25 },
      "<"
    );

    tl.add(() => {
      createParticles(emitter, 70);
    });

    tl.to(btn, { scale: 1, duration: 0.2, ease: "elastic.out(1,0.4)" }, "+=0.1");

    tl.to(btn.querySelector("#pumpkin"), { scaleY: 1, duration: 0.2 }, "<");

    tl.to(btn.querySelector("#p-top"), { rotate: 0, duration: 0.25 }, "<");

    tl.to(
      btn.querySelectorAll(".text div"),
      { y: 0, duration: 0.3, stagger: 0.05 },
      "<"
    );
  };

  return (
    <div
      className={`btn ${loading ? "disabled" : ""}`}
      ref={btnRef}
      onClick={handleClick}
    >
      <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 32">
          <g id="pumpkin">
            <g id="p-face">
              <path
                d="M27 7L17 8 7 7c-4 2-7 6-7 11 0 10 8 14 17 14s17-4 17-14c0-5-3-9-7-11z"
                fill="#ff931e"
              />
              <circle cx="11.1" cy="15" r="2.9" fill="#3e1c11" />
              <circle cx="22.9" cy="15" r="2.9" fill="#3e1c11" />
              <path fill="#3e1c11" d="M17 15l-3 5h6l-3-5z" />
            </g>
            <g id="p-top">
              <path
                d="M17 7V3c0-2 2-3 2-3h1a12 12 0 00-2 7z"
                fill="#006837"
              />
            </g>
          </g>
        </svg>

        <div className="emitter" ref={emitterRef}></div>
      </div>

      <div className="text">
        {loading
          ? ["Summoning..."]
          : textLines.map((line, i) => <div key={i}>{line}</div>)}
      </div>
    </div>
  );
}
