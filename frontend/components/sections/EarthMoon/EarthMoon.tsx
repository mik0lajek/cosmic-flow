"use client";

import Image from "next/image";
import { PointerEvent, useRef } from "react";
import EARTH from "../../../Images/sections/earth.png";
import MOON from "../../../Images/sections/moon.png";
import "../../../styles/earth-moon/earth-moon.css";

export default function EarthMoonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  const applyParallax = () => {
    const section = sectionRef.current;
    if (!section) return;

    section.style.setProperty("--earth-x", `${targetRef.current.x * -18}px`);
    section.style.setProperty("--earth-y", `${targetRef.current.y * -10}px`);
    section.style.setProperty("--moon-x", `${targetRef.current.x * 32}px`);
    section.style.setProperty("--moon-y", `${targetRef.current.y * 22}px`);
    section.style.setProperty("--field-x", `${targetRef.current.x * 10}px`);
    section.style.setProperty("--field-y", `${targetRef.current.y * 8}px`);
    rafRef.current = null;
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    };

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyParallax);
    }
  };

  const resetParallax = () => {
    targetRef.current = { x: 0, y: 0 };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyParallax);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="earth-moon-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="earth-moon-starfield" />
      <div className="earth-moon-orbit earth-moon-orbit--outer" />
      <div className="earth-moon-orbit earth-moon-orbit--inner" />

      <p className="earth-moon-kicker">EARTH</p>

      <div className="earth-moon-earth" aria-hidden="true">
        <Image
          src={EARTH}
          alt=""
          fill
          priority={false}
          quality={90}
          sizes="(max-width: 768px) 92vw, 64vw"
          className="earth-moon-earth__img"
        />
      </div>

      <div className="earth-moon-moon" aria-hidden="true">
        <div className="earth-moon-moon__halo" />
        <Image
          src={MOON}
          alt=""
          fill
          quality={90}
          sizes="(max-width: 768px) 32vw, 18vw"
          className="earth-moon-moon__img"
        />
      </div>
    </section>
  );
}
