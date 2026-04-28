"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SUN from "../../../Images/sections/sun.png";
import "../../../styles/sun/sun.css";

const stats = [
  { label: "MASS", value: "(1.989 × 10³⁰) 10³⁰ KG" },
  { label: "AGE", value: "4.6 BILLION YEARS" },
  { label: "DENSITY", value: "1.408 G/CM³" },
  { label: "DISTANCE FROM EARTH", value: "149.6 MILLION KM" },
];

const descriptionLines = [
  { text: "At the center of everything lies the Sun — a powerful star", accent: false },
  { text: "that has been shining for billions of years.", accent: false },
  { text: "It fuels life, drives our climate,", accent: true },
  { text: "and shapes the rhythm of our days.", accent: false },
  { text: "Every second, unimaginable amounts of energy", accent: false },
  { text: "are released from its core.", accent: false },
  { text: "It is not just a star,", accent: false },
  { text: "but the foundation of our cosmic neighborhood.", accent: true },
];

const SUN_RADIUS_KM = 695700;

const formatRadius = (radius: number) =>
  Math.round(radius).toLocaleString("en-US", {
    minimumIntegerDigits: 6,
    maximumFractionDigits: 0,
  });

export default function SunSection() {
  const progressRef  = useRef(0);
  const animatingRef = useRef(false);
  const sectionRef   = useRef<HTMLElement>(null);
  const [prog, setProg]         = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) {
      animatingRef.current = false;
      progressRef.current  = 1;
      const mobileRafId = requestAnimationFrame(() => setProg(1));
      return () => cancelAnimationFrame(mobileRafId);
    }

    const DURATION = 2200;
    let startTime: number | null = null;
    let startProg = 0;
    let targetProg = 0;
    let rafId: number | null = null;

    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const t   = Math.min((ts - startTime) / DURATION, 1);
      const val = startProg + (targetProg - startProg) * ease(t);
      progressRef.current = val;
      setProg(val);
      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        animatingRef.current = false;
      }
    };

    const trigger = (to: number) => {
      if (animatingRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      startProg  = progressRef.current;
      targetProg = to;
      startTime  = null;
      animatingRef.current = true;
      rafId = requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      if (Math.abs(section.getBoundingClientRect().top) > 50) return;
      if (e.deltaY > 0 && progressRef.current < 1) { e.preventDefault(); trigger(1); return; }
      if (e.deltaY < 0 && progressRef.current > 0) { e.preventDefault(); trigger(0); return; }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      if (Math.abs(section.getBoundingClientRect().top) > 50) return;
      const isDown = e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      const isUp   = e.key === "ArrowUp"   || e.key === "PageUp";
      if (!isDown && !isUp) return;
      if (isDown && progressRef.current < 1) { e.preventDefault(); trigger(1); }
      else if (isUp && progressRef.current > 0) { e.preventDefault(); trigger(0); }
    };

    const resetIfLeft = () => {
      if (progressRef.current <= 0.01) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < vh * 0.1 || rect.top > vh * 0.9) {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        animatingRef.current = false;
        progressRef.current  = 0;
        setProg(0);
      }
    };

    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(resetIfLeft, 200);
    };

    window.addEventListener("wheel",     handleWheel,  { passive: false });
    window.addEventListener("keydown",   handleKeyDown);
    window.addEventListener("scrollend", resetIfLeft,  { passive: true });
    window.addEventListener("scroll",    onScroll,     { passive: true });
    return () => {
      window.removeEventListener("wheel",     handleWheel);
      window.removeEventListener("keydown",   handleKeyDown);
      window.removeEventListener("scrollend", resetIfLeft);
      window.removeEventListener("scroll",    onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
  }, [isMobile]);

  const scale        = 0.75 + prog * 1.35;
  const titleOpacity = Math.max(0, 1 - prog / 0.3);
  const factsOpacity = Math.max(0, (prog - 0.75) / 0.25);
  const radiusValue  = formatRadius(SUN_RADIUS_KM * (isMobile ? 1 : prog));
  const radiusOpacity = isMobile ? 1 : Math.min(1, prog / 0.35);

  return (
    <section ref={sectionRef} id="section-sun" className="sun-section">
      <div className="sun-atmosphere" />

      <p className="sun-label" style={{ opacity: isMobile ? 0 : titleOpacity }}>
        SUN
      </p>

      <div
        className="sun-zoom-wrapper"
        style={isMobile ? undefined : { transform: `scale(${scale})` }}
      >
        <div className="sun-rotate-wrapper">
          <Image src={SUN} alt="The Sun" quality={90} fill className="sun-img" />
        </div>
      </div>

      <div
        className="sun-overlay"
        style={{
          pointerEvents: (isMobile || factsOpacity > 0.05) ? "all" : "none",
        }}
      >
        <div className="sun-overlay__header" style={{ opacity: radiusOpacity }}>
          <h2 className="sun-overlay__radius">RADIUS</h2>
          <span className="sun-overlay__radius-value">{radiusValue} KM</span>
          <div
            className="sun-radius-line"
            aria-hidden="true"
            style={{
              opacity: isMobile ? 0 : 1,
              transform: `scaleX(${isMobile ? 1 : prog})`,
            }}
          />
        </div>

        <div className="sun-content" style={{ opacity: isMobile ? 1 : factsOpacity }}>
          <div className="sun-stats">
            {stats.map((s) => (
              <div key={s.label} className="sun-stat">
                <span className="sun-stat__label">{s.label}</span>
                <span className="sun-stat__value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="sun-divider" />

          <div className="sun-description">
            {descriptionLines.map((line, i) => (
              <p
                key={i}
                className={`sun-description__line${line.accent ? " sun-description__line--accent" : ""}`}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
