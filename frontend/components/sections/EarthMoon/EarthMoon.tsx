"use client";

import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";
import EARTH from "../../../Images/sections/earth.png";
import MOON from "../../../Images/sections/moon.png";
import "../../../styles/earth-moon/earth-moon.css";

export default function EarthMoonSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const rafRef        = useRef<number | null>(null);
  const targetRef     = useRef({ x: 0, y: 0 });
  const progressRef   = useRef(0);
  const animatingRef  = useRef(false);
  const [prog, setProg]         = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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

  const applyParallax = () => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.setProperty("--earth-x", `${targetRef.current.x * -18}px`);
    section.style.setProperty("--earth-y", `${targetRef.current.y * -10}px`);
    section.style.setProperty("--moon-x",  `${targetRef.current.x * 32}px`);
    section.style.setProperty("--moon-y",  `${targetRef.current.y * 22}px`);
    section.style.setProperty("--field-x", `${targetRef.current.x * 10}px`);
    section.style.setProperty("--field-y", `${targetRef.current.y * 8}px`);
    rafRef.current = null;
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: (event.clientX - bounds.left) / bounds.width  - 0.5,
      y: (event.clientY - bounds.top)  / bounds.height - 0.5,
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

  // prog=0: EarthMoon layout  →  prog=1: Earth centered in viewport
  // Final: 80vw wide, left=10vw → horizontally centered; bottom=-14vh → equator at ~50vh
  const earthW = 78  + prog * 2;    // 78vw → 80vw
  const earthL = -10 + prog * 20;   // -10vw → 10vw
  const earthB = -36 + prog * 22;   // -36vh → -14vh  (Earth rises to center)

  // Moon fades out as Earth moves to center
  const moonOpacity = Math.max(0, 1 - prog * 2);  // gone by prog=0.5
  const moonDx = prog * -20;
  const moonDy = prog * -5;

  const kickerOpacity = Math.max(0, 1 - prog / 0.4);
  const titleOpacity  = Math.max(0, (prog - 0.5) / 0.5);
  const orbitOpacity  = Math.max(0, 1 - prog * 2);

  const earthStyle = isMobile ? undefined : {
    left:   `${earthL}vw`,
    bottom: `${earthB}vh`,
    width:  `clamp(520px, ${earthW}vw, 1560px)`,
    height: `clamp(520px, ${earthW}vw, 1560px)`,
  };

  const moonStyle = isMobile ? undefined : {
    opacity:   moonOpacity,
    transform: `translate3d(calc(${moonDx}vw + var(--moon-x)), calc(${moonDy}vh + var(--moon-y)), 0)`,
  };

  return (
    <section
      ref={sectionRef}
      className="earth-moon-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="earth-moon-starfield" />
      <div
        className="earth-moon-orbit earth-moon-orbit--outer"
        style={isMobile ? undefined : { opacity: orbitOpacity }}
      />
      <div
        className="earth-moon-orbit earth-moon-orbit--inner"
        style={isMobile ? undefined : { opacity: orbitOpacity }}
      />

      <p
        className="earth-moon-kicker"
        style={{ opacity: isMobile ? 1 : kickerOpacity }}
      >
        EARTH / MOON
      </p>

      <p
        className="earth-moon-title"
        style={{ opacity: isMobile ? 0 : titleOpacity }}
      >
        EARTH
      </p>

      <div className="earth-moon-earth" style={earthStyle} aria-hidden="true">
        <Image
          src={EARTH}
          alt=""
          fill
          priority={false}
          quality={90}
          sizes="(max-width: 768px) 92vw, 105vw"
          className="earth-moon-earth__img"
        />
      </div>

      <div className="earth-moon-moon" style={moonStyle}>
        <div className="earth-moon-moon__halo" />
        <Image
          src={MOON}
          alt="The Moon"
          fill
          quality={90}
          sizes="(max-width: 768px) 32vw, 20vw"
          className="earth-moon-moon__img"
        />
      </div>
    </section>
  );
}
