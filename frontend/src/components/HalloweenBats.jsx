import React, { useEffect, useRef } from "react";
import "./HalloweenBats.css";

const HalloweenBats = ({
  amount = 12,
  width = 40,
  height = 25,
  frames = 4,
  speed = 15,
  flickering = 25,
  image = "https://raw.githubusercontent.com/Artimon/jquery-halloween-bats/master/bats.png",
  zIndex = 0,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    class Bat {
      constructor() {
        this.x = this.randomPosition("horizontal");
        this.y = this.randomPosition("vertical");
        this.tx = this.randomPosition("horizontal");
        this.ty = this.randomPosition("vertical");
        this.dx = -5 + Math.random() * 10;
        this.dy = -5 + Math.random() * 10;
        this.frame = Math.round(Math.random() * frames);

        this.el = document.createElement("div");
        this.el.className = "halloweenBat";
        this.el.style.width = `${width}px`;
        this.el.style.height = `${height}px`;
        this.el.style.zIndex = zIndex;
        this.el.style.backgroundImage = `url(${image})`;
        this.el.style.backgroundRepeat = "no-repeat";
        this.el.style.position = "absolute";

        container.appendChild(this.el);

        this.moveInterval = setInterval(() => this.move(), 40);
        this.animateInterval = setInterval(() => this.animate(), 200);
      }

      randomPosition(direction) {
        const screenLength =
          direction === "horizontal" ? innerWidth : innerHeight;
        const imageLength = direction === "horizontal" ? width : height;
        return Math.random() * (screenLength - imageLength);
      }

      applyPosition() {
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
      }

      move() {
        let left = this.tx - this.x;
        let top = this.ty - this.y;

        let length = Math.sqrt(left * left + top * top);
        length = Math.max(1, length);

        const dLeft = speed * (left / length);
        const dTop = speed * (top / length);

        const ddLeft = (dLeft - this.dx) / flickering;
        const ddTop = (dTop - this.dy) / flickering;

        this.dx += ddLeft;
        this.dy += ddTop;

        this.x += this.dx;
        this.y += this.dy;

        this.x = Math.max(0, Math.min(this.x, innerWidth - width));
        this.y = Math.max(0, Math.min(this.y, innerHeight - height));

        this.applyPosition();

        if (Math.random() > 0.95) {
          this.tx = this.randomPosition("horizontal");
          this.ty = this.randomPosition("vertical");
        }
      }

      animate() {
        this.frame += 1;
        if (this.frame >= frames) this.frame = 0;
        this.el.style.backgroundPosition = `0 ${this.frame * -height}px`;
      }

      destroy() {
        clearInterval(this.moveInterval);
        clearInterval(this.animateInterval);
        this.el.remove();
      }
    }

    const bats = [];
    for (let i = 0; i < amount; i++) {
      bats.push(new Bat());
    }

    const handleResize = () => {
      innerWidth = window.innerWidth;
      innerHeight = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      bats.forEach((bat) => bat.destroy());
      window.removeEventListener("resize", handleResize);
    };
  }, [amount, width, height, frames, speed, flickering, image, zIndex]);

  return <div ref={containerRef} className="halloweenContainer" />;
};

export default HalloweenBats;
