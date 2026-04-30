"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import VENUS from "../../../Images/sections/venus.webp";
import "../../../styles/venus/venus.css";

const stats = [
  { label: "MASS", value: "4.867 x 10^24 kg" },
  { label: "DAY LENGTH", value: "243 EARTH DAYS" },
  { label: "DENSITY", value: "5.243 g/cm3" },
  { label: "SURFACE TEMP", value: "465 C" },
];

const descriptions = [
  "Wrapped in dense sulfur clouds, Venus hides its surface from view. Bright and familiar from Earth, it is anything but gentle.",
  "Runaway greenhouse heat traps the planet beneath crushing air, turning its plains and volcanoes into a sealed furnace. Often called Earth's twin, Venus shows how fragile a habitable world can become when its atmosphere changes.",
];

export default function VenusSection() {
  const progressRef = useRef(0);
  const animatingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [prog, setProg] = useState(0);
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
      progressRef.current = 1;
      const mobileRafId = requestAnimationFrame(() => setProg(1));
      return () => cancelAnimationFrame(mobileRafId);
    }

    const DURATION = 1200;
    let startTime: number | null = null;
    let startProg = 0;
    let targetProg = 0;
    let rafId: number | null = null;

    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / DURATION, 1);
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
      startProg = progressRef.current;
      targetProg = to;
      startTime = null;
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
      const isUp = e.key === "ArrowUp" || e.key === "PageUp";
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
        progressRef.current = 0;
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

  const entranceP = Math.min(prog / 0.65, 1);
  const detailOpacity = Math.max(0, (prog - 0.55) / 0.45);
  const planetX = (1 - entranceP) * -36;
  const planetY = (1 - entranceP) * 18;
  const planetScale = 0.96 + entranceP * 0.13;
  const titleY = (1 - entranceP) * 18;
  const orbitTilt = -12 + prog * 8;
  const heatShift = -6 + prog * 12;
  const planetTransform = isMobile ? undefined : {
    transform: `translate(${planetX}vw, ${planetY}vh) scale(${planetScale})`,
  };

  return (
    <section ref={sectionRef} id="section-venus" className="venus-section">
      <div className="venus-starfield" />
      <div className="venus-orbit venus-orbit--wide" style={isMobile ? undefined : { transform: `rotate(${orbitTilt}deg)` }} />
      <div className="venus-orbit venus-orbit--tight" style={isMobile ? undefined : { transform: `rotate(${orbitTilt + 19}deg)` }} />
      <div className="venus-heat-line venus-heat-line--top" style={isMobile ? undefined : { transform: `translateX(${heatShift}vw)` }} />
      <div className="venus-heat-line venus-heat-line--bottom" style={isMobile ? undefined : { transform: `translateX(${-heatShift}vw)` }} />

      <p className="venus-title" style={isMobile ? undefined : { transform: `translateY(${titleY}vh)` }}>
        VENUS
      </p>

      <div className="venus-planet-shell" style={planetTransform}>
        <div className="venus-planet">
          <Image src={VENUS} alt="Venus" quality={90} fill sizes="(max-width: 768px) 62vw, 72vw" className="venus-img" />
        </div>
      </div>

      <div
        className="venus-panel"
        style={{
          opacity: isMobile ? 1 : detailOpacity,
          pointerEvents: (isMobile || detailOpacity > 0.05) ? "all" : "none",
        }}
      >
        <span className="venus-stats__kicker">Second Planet · Solar System</span>
        <div className="venus-radius">
          <span className="venus-radius__label">RADIUS</span>
          <span className="venus-radius__value">6,051.8 km</span>
        </div>

        {stats.map((s) => (
          <div key={s.label} className="venus-stat">
            <span className="venus-stat__label">{s.label}</span>
            <span className="venus-stat__value">{s.value}</span>
          </div>
        ))}
      </div>

      <div
        className="venus-description"
        style={{
          opacity: isMobile ? 1 : detailOpacity,
          pointerEvents: (isMobile || detailOpacity > 0.05) ? "all" : "none",
        }}
      >
        {descriptions.map((p, i) => (
          <p key={i} className="venus-description__line">{p}</p>
        ))}
      </div>
    </section>
  );
}
