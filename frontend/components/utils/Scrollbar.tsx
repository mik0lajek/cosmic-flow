"use client";

import { useEffect, useRef, useState } from "react";
import '../../styles/utils/scrollbar.css'

export default function RocketScrollbar() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percent = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollPercent(percent);

      setVisible(true);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => setVisible(false), 1500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const trackHeight = typeof window !== "undefined" ? window.innerHeight - 80 : 600;
  const rocketY = scrollPercent * trackHeight;

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        top: "40px",
        width: "28px",
        height: `${trackHeight}px`,
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, transform: "translateX(-50%)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", paddingBlock: "4px" }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: "1px",
          height: `${rocketY}px`,
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))",
          transition: "height 0.1s linear",
        }}
      />

      {/* Rakieta */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${rocketY}px`,
          transform: "translateX(-50%)",
          transition: "top 0.1s linear",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <svg
          width="20"
          height="36"
          viewBox="0 0 20 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1C10 1 3 9 3 20H17C17 9 10 1 10 1Z"
            fill="white"
          />

          <rect x="3" y="20" width="14" height="7" rx="1" fill="white" />
          <path d="M3 21 L0 29 L3 27 Z" fill="rgba(255,255,255,0.5)" />
          <path d="M17 21 L20 29 L17 27 Z" fill="rgba(255,255,255,0.5)" />
          <circle cx="10" cy="13" r="3" fill="black" />
          <circle cx="10" cy="13" r="2" fill="rgba(255,255,255,0.15)" />
          <circle cx="9" cy="12" r="0.7" fill="rgba(255,255,255,0.6)" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", marginTop: "-1px" }}>
          <Flame delay={0} size={8} />
          <Flame delay={0.08} size={6} />
          <Flame delay={0.15} size={4} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      />
    </div>
  );
}

function Flame({ delay, size }: { delay: number; size: number }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.4), transparent)",
        animation: `flicker 0.25s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}