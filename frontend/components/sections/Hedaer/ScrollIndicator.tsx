"use client";

import { useEffect, useState } from "react";
import "../../../styles/header/scroll.css";

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const p = Math.min(window.scrollY / (vh * 0.55), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollDown = () => {
    document.getElementById("section-sun")?.scrollIntoView({ behavior: "smooth" });
  };

  const e = progress * progress;
  const h = hovered && progress < 0.05 ? 1 : 0;

  const labelStyle: React.CSSProperties = {
    transform: `translateY(${-e * 18 - h * 30}px)`,
    opacity: Math.max(0, 1 - e * 2),
    transition: "transform 0.35s ease",
  };

  const lineStyle: React.CSSProperties = {
    transform: `scaleY(${Math.max(0, 1 - e + h * 0.45)})`,
    transformOrigin: "bottom center",
    opacity: Math.max(0, 1 - e * 1.4),
    transition: "transform 0.35s ease",
  };

  return (
    <button
      className={`scroll-indicator ${className}`}
      onClick={scrollDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll to content"
      style={{ pointerEvents: progress > 0.95 ? "none" : "auto" }}
    >
      <span className="scroll-indicator__label" style={labelStyle}>SCROLL</span>
      <div className="scroll-indicator__line" style={lineStyle} aria-hidden="true" />
    </button>
  );
}
