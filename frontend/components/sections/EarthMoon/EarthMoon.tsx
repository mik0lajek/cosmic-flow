"use client";

import Image from "next/image";
import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import EARTH from "../../../Images/sections/earth.png";
import MOON from "../../../Images/sections/moon.png";
import "../../../styles/earth-moon/earth-moon.css";

const earthDetails = [
  { label: "RADIUS", value: "6,371 km" },
  { label: "MASS", value: "5.972 x 10^24 kg" },
  { label: "AGE", value: "4.54 billion years" },
  { label: "DENSITY", value: "5.51 g/cm3" },
  { label: "DISTANCE FROM SUN", value: "149.6 million km" },
];

const earthDescriptionLeft = [
  "Amid the vast emptiness of space lies Earth — a vibrant world teeming with life. Its oceans, atmosphere, and unique conditions make it the only known planet capable of sustaining life. From afar, it appears as a fragile blue sphere suspended in darkness.",
];

const earthDescriptionRight = [
  "Yet Earth is not eternal. As time passes and conditions inevitably change, humanity will face the need to look beyond its home.",
  "The search for new worlds may one day become not a choice, but a necessity.",
];

export default function EarthMoonSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const rafRef       = useRef<number | null>(null);
  const targetRef    = useRef({ x: 0, y: 0 });
  const progressRef  = useRef(0);
  const animatingRef = useRef(false);
  const [prog, setProg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const applyParallax = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      section.style.setProperty("--earth-x", "0px");
      section.style.setProperty("--earth-y", "0px");
      section.style.setProperty("--moon-x", "0px");
      section.style.setProperty("--moon-y", "0px");
      section.style.setProperty("--field-x", "0px");
      section.style.setProperty("--field-y", "0px");
      rafRef.current = null;
      return;
    }

    const strength = Math.max(0, 1 - progressRef.current);
    section.style.setProperty("--earth-x", `${targetRef.current.x * -18 * strength}px`);
    section.style.setProperty("--earth-y", `${targetRef.current.y * -10 * strength}px`);
    section.style.setProperty("--moon-x", `${targetRef.current.x * 32 * strength}px`);
    section.style.setProperty("--moon-y", `${targetRef.current.y * 22 * strength}px`);
    section.style.setProperty("--field-x", `${targetRef.current.x * 10}px`);
    section.style.setProperty("--field-y", `${targetRef.current.y * 8}px`);
    rafRef.current = null;
  }, [isMobile]);

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
      const mobileRafId = requestAnimationFrame(() => {
        setProg(1);
        applyParallax();
      });
      return () => cancelAnimationFrame(mobileRafId);
    }

    const DURATION = 1200;
    let startTime: number | null = null;
    let startProg = 0;
    let targetProg = 0;
    let rafId: number | null = null;

    const ease = (t: number) => t * t * t * (t * (6 * t - 15) + 10);

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / DURATION, 1);
      const val = startProg + (targetProg - startProg) * ease(t);
      progressRef.current = val;
      setProg(val);
      applyParallax();
      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        progressRef.current = targetProg;
        setProg(targetProg);
        applyParallax();
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

    const resetIfLeftAbove = () => {
      const section = sectionRef.current;
      if (!section || progressRef.current <= 0.01) return;
      if (section.getBoundingClientRect().top > window.innerHeight * 0.7) {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        animatingRef.current = false;
        progressRef.current = 0;
        setProg(0);
        applyParallax();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", resetIfLeftAbove, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", resetIfLeftAbove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, applyParallax]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (isMobile) return;

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
    if (isMobile) return;

    targetRef.current = { x: 0, y: 0 };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyParallax);
    }
  };

  const earthScale = 0.74 + prog * 0.26;
  const earthDx = -21 * (1 - prog);
  const earthDy = -10 * (1 - prog);
  const titleOpacity = Math.max(0, (prog - 0.5) / 0.5);
  const kickerOpacity = Math.max(0, 1 - prog / 0.4);
  const orbitOpacity = Math.max(0, 1 - prog * 2);
  const fieldOpacity = Math.max(0, 0.42 * (1 - prog * 1.8));
  const finalBgOpacity = Math.min(1, Math.max(0, (prog - 0.35) / 0.65));
  const infoOpacity = Math.min(1, Math.max(0, (prog - 0.68) / 0.32));
  const infoY = 28 - infoOpacity * 28;
  const moonDx = prog * -20;
  const moonDy = prog * -5;
  const earthGlowInner = 42 + prog * 12;
  const earthGlowOuter = 140 + prog * 30;
  const earthGlowPrimary = 0.36 + prog * 0.04;
  const earthGlowSecondary = 0.2 + prog * 0.04;

  const earthStyle = isMobile ? undefined : {
    transform: `translate3d(calc(-50% + ${earthDx}vw + var(--earth-x)), calc(${earthDy}vh + var(--earth-y)), 0) scale(${earthScale})`,
    filter: `drop-shadow(0 0 ${earthGlowInner}px rgba(44, 134, 235, ${earthGlowPrimary})) drop-shadow(0 0 ${earthGlowOuter}px rgba(22, 92, 168, ${earthGlowSecondary}))`,
  };

  const moonStyle = isMobile ? undefined : {
    transform: `translate3d(calc(${moonDx}vw + var(--moon-x)), calc(${moonDy}vh + var(--moon-y)), 0)`,
  };

  const infoStyle = isMobile ? undefined : {
    opacity: infoOpacity,
    transform: `translate3d(-50%, ${infoY}px, 0)`,
  };

  return (
    <section
      ref={sectionRef}
      id="section-earth-moon"
      className="earth-moon-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="earth-moon-starfield" style={{ opacity: isMobile ? 0.42 : fieldOpacity }} />
      <div className="earth-moon-final-bg" style={{ opacity: isMobile ? 0 : finalBgOpacity }} />
      <div className="earth-moon-orbit earth-moon-orbit--outer" style={isMobile ? undefined : { opacity: orbitOpacity }} />
      <div className="earth-moon-orbit earth-moon-orbit--inner" style={isMobile ? undefined : { opacity: orbitOpacity }} />

      <p className="earth-moon-kicker" style={{ opacity: isMobile ? 1 : kickerOpacity }}>EARTH</p>
      <p className="earth-moon-title" style={{ opacity: isMobile ? 0 : titleOpacity }}>EARTH</p>

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

      <div className="earth-moon-moon" style={moonStyle} aria-hidden="true">
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

      <div className="earth-moon-info" style={infoStyle}>
        <div className="earth-moon-description earth-moon-description--left">
          {earthDescriptionLeft.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="earth-moon-details">
          <span className="earth-moon-details__kicker">Third Planet · Solar System</span>
          <div className="earth-moon-details__divider" />
          {earthDetails.map((detail) => (
            <div key={detail.label} className="earth-moon-detail">
              <span className="earth-moon-detail__label">{detail.label}</span>
              <span className="earth-moon-detail__value">{detail.value}</span>
            </div>
          ))}
        </div>

        <div className="earth-moon-description earth-moon-description--right">
          {earthDescriptionRight.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
