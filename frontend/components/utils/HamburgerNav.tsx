"use client";

import { useEffect, useState } from "react";
import "../../styles/utils/hamburger-nav.css";

const sections = [
  { id: "section-start",      label: "Start"        },
  { id: "section-sun",        label: "Sun"          },
  { id: "section-mercury",    label: "Mercury"      },
  { id: "section-venus",      label: "Venus"        },
  { id: "section-earth-moon", label: "Earth" },
  { id: "section-mars",       label: "Mars"         },
  { id: "section-colony",     label: "Mission"      },
];

export default function HamburgerNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
    }
    return () => { html.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <button
        className={`hamburger-btn${open ? " hamburger-btn--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="hamburger-overlay"
      >
        <span className="hamburger-btn__bar" aria-hidden="true" />
        <span className="hamburger-btn__bar" aria-hidden="true" />
        <span className="hamburger-btn__bar" aria-hidden="true" />
      </button>

      <div
        id="hamburger-overlay"
        className={`hamburger-overlay${open ? " hamburger-overlay--open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Main navigation">
          <ol className="hamburger-nav__list">
            {sections.map(({ id, label }, i) => (
              <li key={id} className="hamburger-nav__item">
                <button
                  className="hamburger-nav__link"
                  onClick={() => scrollTo(id)}
                  tabIndex={open ? 0 : -1}
                >
                  <span className="hamburger-nav__index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hamburger-nav__label">{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
