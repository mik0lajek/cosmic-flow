"use client";

import { useEffect, useState } from "react";
import "../../../styles/header/scroll.css";

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`z-10 scroll-indicator ${scrolled ? "scroll-indicator--scrolled" : ""} ${className}`}>
      <span className="scroll-indicator__label">SCROLL</span>
      <div className="scroll-indicator__line" />
    </div>
  );
}