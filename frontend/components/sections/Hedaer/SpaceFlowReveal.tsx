"use client";

import { useEffect, useRef, useState } from "react";

export default function SpaceFlowReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const animatingRef = useRef(false);
  const doneRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = (progress: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const fontSize = 3000 - progress * 2700;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "white";
      ctx.font = `900 ${fontSize}px "Playfair Display", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SOLAR", w / 2, h / 2 - fontSize * 0.55);
      ctx.fillText("SYSTEM", w / 2, h / 2 + fontSize * 0.55);
      ctx.globalCompositeOperation = "source-over";

      canvas.style.opacity = String(progress);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(progressRef.current);
    };

    resize();
    window.addEventListener("resize", resize);

    const duration = 1200;
    let startTime: number | null = null;
    let startProgress = 0;
    let targetProgress = 0;
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const current = startProgress + (targetProgress - startProgress) * eased;
      progressRef.current = current;
      draw(current);

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        animatingRef.current = false;
        doneRef.current = targetProgress >= 1;
      }
    };

    const triggerAnimation = (to: number) => {
      if (animatingRef.current) return;
      startProgress = progressRef.current;
      targetProgress = to;
      startTime = null;
      animatingRef.current = true;
      rafId = requestAnimationFrame(animate);
    };

    const resetReveal = () => {
      if (rafId) cancelAnimationFrame(rafId);
      animatingRef.current = false;
      doneRef.current = false;
      progressRef.current = 0;
      draw(0);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isReturningUp = currentScrollY < lastScrollY;
      lastScrollY = currentScrollY;

      if (!isReturningUp || progressRef.current <= 0) return;

      const header = document.querySelector("header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const isHeaderVisible = headerBottom > 0;

      if (isHeaderVisible) {
        resetReveal();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const header = document.querySelector("header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const isHeaderVisible = headerBottom > 0;

      if (e.deltaY < 0 && !isHeaderVisible) {
        e.preventDefault();

        canvas.style.opacity = "0";
        canvas.style.pointerEvents = "none";
        if (rafId) cancelAnimationFrame(rafId);
        animatingRef.current = false;

        let scrollEndTimer: ReturnType<typeof setTimeout>;

        const onScrollEnd = () => {
          clearTimeout(scrollEndTimer);
          scrollEndTimer = setTimeout(() => {
            window.removeEventListener("scroll", onScrollEnd);
            resetReveal();
          }, 50);
        };

        window.addEventListener("scroll", onScrollEnd);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (doneRef.current && e.deltaY > 0) return;

      if (e.deltaY > 0 && progressRef.current < 1) {
        e.preventDefault();
        triggerAnimation(1);
      } else if (e.deltaY < 0 && progressRef.current > 0) {
        e.preventDefault();
        triggerAnimation(0);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const header = document.querySelector("header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const isHeaderVisible = headerBottom > 0;

      const isDown = e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      const isUp   = e.key === "ArrowUp"   || e.key === "PageUp";
      if (!isDown && !isUp) return;

      if (isUp && !isHeaderVisible) {
        e.preventDefault();
        canvas.style.opacity = "0";
        canvas.style.pointerEvents = "none";
        if (rafId) cancelAnimationFrame(rafId);
        animatingRef.current = false;

        let scrollEndTimer: ReturnType<typeof setTimeout>;
        const onScrollEnd = () => {
          clearTimeout(scrollEndTimer);
          scrollEndTimer = setTimeout(() => {
            window.removeEventListener("scroll", onScrollEnd);
            resetReveal();
          }, 50);
        };
        window.addEventListener("scroll", onScrollEnd);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (doneRef.current && isDown) return;

      if (isDown && progressRef.current < 1) {
        e.preventDefault();
        triggerAnimation(1);
      } else if (isUp && progressRef.current > 0) {
        e.preventDefault();
        triggerAnimation(0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
