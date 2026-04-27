"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MERCURY from "../../../Images/sections/mercury.png";
import "../../../styles/mercury/mercury.css";

const stats = [
  { label: "MASS",               value: "(1.988475±0.000092)×10³⁰ kg" },
  { label: "AGE",                value: "4.6 BILLION YEARS"            },
  { label: "DENSITY",            value: "1.408 g/cm³"                  },
  { label: "DISTANCE FROM EARTH", value: "149.6 million km"            },
];

const descriptionLines = [
  { text: "Closest to the Sun lies Mercury — a small rocky,",          accent: false },
  { text: "world shaped by extremes. Scorched by intense",             accent: false },
  { text: "heat during the day and frozen in darkness at night,",      accent: true  },
  { text: "it experiences some of the harshest conditions in the",     accent: false },
  { text: "Solar System. Its surface is marked by countless craters,", accent: false },
  { text: "bearing witness to billions of years of cosmic impacts.",   accent: false },
  { text: "Though small and often overlooked, Mercury reveals",        accent: false },
  { text: "the raw, unforgiving nature of space.",                     accent: true  },
];

export default function MercurySection() {
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

    const DURATION = 1200;
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
        progressRef.current = targetProg;
        setProg(targetProg);
        animatingRef.current = false;
      }
    };

    const trigger = (to: number) => {
      if (animatingRef.current) return;
      if (Math.abs(progressRef.current - to) < 0.01) return;
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
        progressRef.current = 0;
        setProg(0);
      }
    };

    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(resetIfLeft, 200);
    };

    window.addEventListener("wheel",    handleWheel,  { passive: false });
    window.addEventListener("keydown",  handleKeyDown);
    window.addEventListener("scrollend", resetIfLeft, { passive: true });
    window.addEventListener("scroll",   onScroll,     { passive: true });
    return () => {
      window.removeEventListener("wheel",    handleWheel);
      window.removeEventListener("keydown",  handleKeyDown);
      window.removeEventListener("scrollend", resetIfLeft);
      window.removeEventListener("scroll",   onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
  }, [isMobile]);

  const entranceP = Math.min(prog / 0.6, 1);
  const planetY   = (1 - entranceP) * 110;
  const planetX   = (1 - entranceP) * 14;
  const planetScale = 0.88 + entranceP * 0.12;
  const merX      = (1 - entranceP) * -70;
  const curY      = (1 - entranceP) * -60;
  const yX        = (1 - entranceP) * 70;

  const sideOpacity    = Math.max(0, (prog - 0.6) / 0.4);
  const planetTransform = isMobile ? undefined : {
    transform: `translate3d(${planetX}vw, ${planetY}vh, 0) scale(${planetScale})`,
  };

  return (
    <section ref={sectionRef} className="mercury-section">

      <div className="mercury-title mercury-title--back">
        <span className="mercury-title__chunk mercury-title__chunk--hidden" style={{ transform: `translateX(${merX}vw)` }}>MER</span>
        <span className="mercury-title__chunk"                              style={{ transform: `translateY(${curY}vh)` }}>CUR</span>
        <span className="mercury-title__chunk mercury-title__chunk--hidden" style={{ transform: `translateX(${yX}vw)` }}>Y</span>
      </div>

      <div className="mercury-title mercury-title--front">
        <span className="mercury-title__chunk"                              style={{ transform: `translateX(${merX}vw)` }}>MER</span>
        <span className="mercury-title__chunk mercury-title__chunk--hidden" style={{ transform: `translateY(${curY}vh)` }}>CUR</span>
        <span className="mercury-title__chunk"                              style={{ transform: `translateX(${yX}vw)` }}>Y</span>
      </div>

      <div className="mercury-planet-wrapper" style={planetTransform}>
        <div className="mercury-planet">
          <Image src={MERCURY} alt="Mercury" quality={90} fill className="mercury-img" />
        </div>

        <div
          className="mercury-planet-stats"
          style={{
            opacity: isMobile ? 1 : sideOpacity,
            pointerEvents: (isMobile || sideOpacity > 0.05) ? "all" : "none",
          }}
        >
          <div className="mercury-radius">
            <span className="mercury-radius__label">RADIUS</span>
            <span className="mercury-radius__value">2,440 km</span>
          </div>
          <div className="mercury-stat-divider" />
          {stats.map((s) => (
            <div key={s.label} className="mercury-stat">
              <span className="mercury-stat__label">{s.label}</span>
              <span className="mercury-stat__value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mercury-description"
        style={{
          opacity: isMobile ? 1 : sideOpacity,
          pointerEvents: (isMobile || sideOpacity > 0.05) ? "all" : "none",
        }}
      >
        {descriptionLines.map((line, i) => (
          <p
            key={i}
            className={`mercury-description__line${line.accent ? " mercury-description__line--accent" : ""}`}
          >
            {line.text}
          </p>
        ))}
      </div>

    </section>
  );
}
