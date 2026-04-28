"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MARS from "../../../Images/sections/mars.png";
import "../../../styles/mars/mars.css";

const stats = [
  { label: "Surface Gravity", value: "3.72 M/S²" },
  { label: "Day Length",      value: "24H 37M" },
  { label: "Avg Temperature", value: "−63 °C" },
  { label: "Moons",           value: "Phobos · Deimos" },
];

const descriptions = [
  "Bathed in a cold, reddish glow, Mars stands as a silent and distant world on the edge of possibility. Its barren landscapes, carved by ancient rivers and vast canyons, hint at a past that may once have been warmer and wetter.",
  "Today, it endures harsh conditions — thin atmosphere, extreme temperatures, and relentless radiation shaping its desolate surface. Yet among all the planets, Mars remains the most promising candidate for future exploration and human settlement.",
  "It is not merely a symbol of mystery, but a potential next step in humanity's journey beyond Earth.",
];

export default function MarsSection() {
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
        progressRef.current = targetProg;
        setProg(targetProg);
        animatingRef.current = false;
      }
    };

    const trigger = (to: number) => {
      if (animatingRef.current) return;
      if (Math.abs(progressRef.current - to) < 0.01) return;
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
      if (e.deltaY < 0 && progressRef.current > 0) { e.preventDefault(); trigger(0); }
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

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const heroOpacity = Math.max(0, 1 - prog / 0.45);
  const storyOpacity = Math.max(0, (prog - 0.42) / 0.58);
  const heroScale = 0.9 + prog * 0.24;
  const heroY = prog * 20;
  const surfaceY = (1 - prog) * 38;

  return (
    <section ref={sectionRef} id="section-mars" className="mars-section">
      <div className="mars-starfield" />

      <div
        className="mars-hero"
        style={{
          opacity: isMobile ? 0 : heroOpacity,
          transform: `translate3d(-50%, ${heroY}vh, 0) scale(${heroScale})`,
        }}
        aria-hidden="true"
      >
        <Image
          src={MARS}
          alt=""
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 78vw"
          className="mars-hero__img"
        />
      </div>

      <p className="mars-title" style={{ opacity: isMobile ? 0 : heroOpacity }}>
        MARS
      </p>

      <div
        className="mars-surface"
        style={{
          opacity: isMobile ? 1 : storyOpacity,
          transform: isMobile ? undefined : `translate3d(-50%, ${surfaceY}vh, 0)`,
        }}
        aria-hidden="true"
      >
        <Image
          src={MARS}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="mars-surface__img"
        />
      </div>

      <div
        className="mars-story"
        style={{
          opacity: isMobile ? 1 : storyOpacity,
          pointerEvents: (isMobile || storyOpacity > 0.05) ? "all" : "none",
        }}
      >
        <div className="mars-story__inner">
          <div className="mars-story__left">
            <span className="mars-story__kicker">Fourth Planet · Solar System</span>
            <h2 className="mars-arc-title">OUR<br />NEW HOME</h2>
            <div className="mars-story__divider" />
            <div className="mars-story__stats">
              {stats.map((s) => (
                <div key={s.label} className="mars-story__stat">
                  <span className="mars-story__stat-label">{s.label}</span>
                  <span className="mars-story__stat-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mars-story__right">
            {descriptions.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
