"use client";

import { useEffect, useState } from "react";
import "../../styles/utils/section-nav.css";

const sections = [
  { id: "section-start",      label: "Start",        color: "rgba(255,255,255,0.9)"   },
  { id: "section-sun",        label: "Sun",           color: "rgba(251,191,36,0.9)"    },
  { id: "section-mercury",    label: "Mercury",       color: "rgba(148,163,184,0.9)"   },
  { id: "section-venus",      label: "Venus",         color: "rgba(212,167,106,0.9)"   },
  { id: "section-earth-moon", label: "Earth",  color: "rgba(96,165,250,0.9)"    },
  { id: "section-mars",       label: "Mars",          color: "rgba(249,115,22,0.9)"    },
  { id: "section-colony",     label: "Mission",       color: "rgba(220,90,36,0.9)"     },
];

export default function SectionNav() {
  const [active, setActive] = useState("section-start");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2;
      let bestId = sections[0].id;
      let bestDist = Infinity;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, height } = el.getBoundingClientRect();
        const dist = Math.abs(top + height / 2 - mid);
        if (dist < bestDist) { bestDist = dist; bestId = id; }
      }
      setActive(bestId);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`section-nav${hovered ? " section-nav--open" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {sections.map(({ id, label, color }, i) => {
        const isActive = active === id;
        return (
          <div key={id} className="section-nav__item-wrap">
            {i > 0 && <div className="section-nav__connector" />}
            <button
              className={`section-nav__item${isActive ? " section-nav__item--active" : ""}`}
              onClick={() => scrollTo(id)}
              style={{ "--dot-color": color } as React.CSSProperties}
            >
              <span className="section-nav__dot" />
              <span className="section-nav__label">{label}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
