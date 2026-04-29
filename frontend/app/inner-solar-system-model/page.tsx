"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import SUN from "../../Images/sections/sun.png";
import MERCURY from "../../Images/sections/mercury.png";
import VENUS from "../../Images/sections/venus.png";
import EARTH from "../../Images/sections/earth.png";
import MOON from "../../Images/sections/moon.png";
import MARS from "../../Images/sections/mars.png";
import "../../styles/inner-solar-system-model.css";

type Body = {
  name: string;
  image: StaticImageData;
  className: string;
  orbitSize: string;
  bodySize: string;
  duration: string;
  start: string;
  depth: string;
  sourceHref: string;
};

const placeholderSource = "about:blank";

const planets: Body[] = [
  {
    name: "Mercury",
    image: MERCURY,
    className: "solar-model__planet--mercury",
    orbitSize: "26%",
    bodySize: "clamp(14px, 1.8vw, 22px)",
    duration: "15s",
    start: "292deg",
    depth: "92px",
    sourceHref: placeholderSource,
  },
  {
    name: "Venus",
    image: VENUS,
    className: "solar-model__planet--venus",
    orbitSize: "48%",
    bodySize: "clamp(22px, 2.8vw, 38px)",
    duration: "24s",
    start: "38deg",
    depth: "54px",
    sourceHref: placeholderSource,
  },
  {
    name: "Earth",
    image: EARTH,
    className: "solar-model__planet--earth",
    orbitSize: "72%",
    bodySize: "clamp(24px, 3vw, 40px)",
    duration: "34s",
    start: "158deg",
    depth: "18px",
    sourceHref: placeholderSource,
  },
  {
    name: "Mars",
    image: MARS,
    className: "solar-model__planet--mars",
    orbitSize: "96%",
    bodySize: "clamp(18px, 2.4vw, 32px)",
    duration: "48s",
    start: "326deg",
    depth: "-18px",
    sourceHref: placeholderSource,
  },
];

const moon: Body = {
  name: "Moon",
  image: MOON,
  className: "solar-model__moon-link",
  orbitSize: "clamp(42px, 4.8vw, 58px)",
  bodySize: "clamp(7px, 0.9vw, 11px)",
  duration: "7s",
  start: "54deg",
  depth: "0px",
  sourceHref: placeholderSource,
};

const asteroids = [
  { x: "1%", y: "5%", w: "34px", h: "24px", r: "-18deg", blur: "0.2px", opacity: 0.78 },
  { x: "7%", y: "13%", w: "16px", h: "11px", r: "24deg", blur: "1.2px", opacity: 0.52 },
  { x: "13%", y: "2%", w: "48px", h: "33px", r: "7deg", blur: "0px", opacity: 0.72 },
  { x: "23%", y: "8%", w: "22px", h: "16px", r: "-34deg", blur: "0.7px", opacity: 0.56 },
  { x: "36%", y: "3%", w: "30px", h: "21px", r: "41deg", blur: "1px", opacity: 0.48 },
  { x: "49%", y: "9%", w: "18px", h: "13px", r: "-12deg", blur: "1.8px", opacity: 0.4 },
  { x: "61%", y: "4%", w: "54px", h: "37px", r: "-8deg", blur: "0px", opacity: 0.74 },
  { x: "76%", y: "10%", w: "24px", h: "17px", r: "19deg", blur: "0.6px", opacity: 0.62 },
  { x: "87%", y: "3%", w: "40px", h: "28px", r: "-27deg", blur: "1.4px", opacity: 0.44 },
  { x: "96%", y: "16%", w: "21px", h: "15px", r: "33deg", blur: "0.8px", opacity: 0.55 },
  { x: "2%", y: "23%", w: "45px", h: "31px", r: "13deg", blur: "0px", opacity: 0.68 },
  { x: "10%", y: "35%", w: "15px", h: "10px", r: "-44deg", blur: "1.5px", opacity: 0.42 },
  { x: "94%", y: "29%", w: "38px", h: "27px", r: "-40deg", blur: "0.8px", opacity: 0.58 },
  { x: "88%", y: "44%", w: "58px", h: "39px", r: "4deg", blur: "0px", opacity: 0.72 },
  { x: "4%", y: "50%", w: "27px", h: "19px", r: "-9deg", blur: "0.6px", opacity: 0.58 },
  { x: "14%", y: "62%", w: "19px", h: "14px", r: "31deg", blur: "1.3px", opacity: 0.45 },
  { x: "96%", y: "59%", w: "22px", h: "16px", r: "31deg", blur: "1.2px", opacity: 0.43 },
  { x: "90%", y: "68%", w: "34px", h: "24px", r: "-22deg", blur: "0.4px", opacity: 0.63 },
  { x: "2%", y: "75%", w: "52px", h: "36px", r: "47deg", blur: "0px", opacity: 0.66 },
  { x: "9%", y: "87%", w: "25px", h: "18px", r: "-36deg", blur: "1.1px", opacity: 0.48 },
  { x: "19%", y: "95%", w: "43px", h: "30px", r: "12deg", blur: "0px", opacity: 0.66 },
  { x: "31%", y: "88%", w: "18px", h: "13px", r: "-21deg", blur: "1.3px", opacity: 0.46 },
  { x: "43%", y: "97%", w: "32px", h: "23px", r: "35deg", blur: "0.5px", opacity: 0.58 },
  { x: "57%", y: "91%", w: "21px", h: "15px", r: "-6deg", blur: "1.4px", opacity: 0.44 },
  { x: "69%", y: "96%", w: "50px", h: "35px", r: "25deg", blur: "0px", opacity: 0.72 },
  { x: "83%", y: "88%", w: "26px", h: "18px", r: "-31deg", blur: "0.9px", opacity: 0.55 },
  { x: "94%", y: "93%", w: "46px", h: "32px", r: "9deg", blur: "0.2px", opacity: 0.66 },
  { x: "25%", y: "15%", w: "12px", h: "9px", r: "58deg", blur: "1.7px", opacity: 0.34 },
  { x: "72%", y: "19%", w: "14px", h: "10px", r: "-52deg", blur: "1.9px", opacity: 0.32 },
  { x: "17%", y: "78%", w: "13px", h: "9px", r: "18deg", blur: "2px", opacity: 0.3 },
  { x: "79%", y: "76%", w: "16px", h: "11px", r: "-17deg", blur: "1.6px", opacity: 0.38 },
  { x: "4%", y: "10%", w: "11px", h: "8px", r: "-61deg", blur: "1.4px", opacity: 0.36 },
  { x: "17%", y: "9%", w: "20px", h: "14px", r: "29deg", blur: "0.9px", opacity: 0.5 },
  { x: "29%", y: "2%", w: "14px", h: "10px", r: "-12deg", blur: "1.6px", opacity: 0.35 },
  { x: "44%", y: "6%", w: "38px", h: "26px", r: "17deg", blur: "0.4px", opacity: 0.6 },
  { x: "55%", y: "1%", w: "15px", h: "11px", r: "-38deg", blur: "1.7px", opacity: 0.34 },
  { x: "70%", y: "7%", w: "28px", h: "20px", r: "46deg", blur: "0.8px", opacity: 0.53 },
  { x: "91%", y: "10%", w: "13px", h: "9px", r: "-4deg", blur: "1.5px", opacity: 0.4 },
  { x: "4%", y: "31%", w: "18px", h: "13px", r: "52deg", blur: "1px", opacity: 0.47 },
  { x: "96%", y: "36%", w: "14px", h: "10px", r: "-49deg", blur: "1.6px", opacity: 0.38 },
  { x: "7%", y: "67%", w: "30px", h: "21px", r: "-27deg", blur: "0.4px", opacity: 0.58 },
  { x: "94%", y: "51%", w: "19px", h: "14px", r: "56deg", blur: "1.1px", opacity: 0.46 },
  { x: "89%", y: "62%", w: "13px", h: "9px", r: "-63deg", blur: "1.8px", opacity: 0.34 },
  { x: "4%", y: "88%", w: "16px", h: "12px", r: "15deg", blur: "1.3px", opacity: 0.42 },
  { x: "14%", y: "97%", w: "22px", h: "15px", r: "-8deg", blur: "0.9px", opacity: 0.52 },
  { x: "27%", y: "94%", w: "12px", h: "9px", r: "44deg", blur: "1.8px", opacity: 0.34 },
  { x: "50%", y: "92%", w: "46px", h: "31px", r: "-19deg", blur: "0.2px", opacity: 0.64 },
  { x: "63%", y: "98%", w: "14px", h: "10px", r: "61deg", blur: "1.5px", opacity: 0.37 },
  { x: "76%", y: "90%", w: "35px", h: "24px", r: "-43deg", blur: "0.7px", opacity: 0.56 },
  { x: "97%", y: "86%", w: "18px", h: "13px", r: "26deg", blur: "1.2px", opacity: 0.45 },
  { x: "0%", y: "2%", w: "19px", h: "13px", r: "35deg", blur: "1px", opacity: 0.46 },
  { x: "6%", y: "1%", w: "27px", h: "19px", r: "-25deg", blur: "0.5px", opacity: 0.58 },
  { x: "11%", y: "8%", w: "9px", h: "7px", r: "11deg", blur: "1.9px", opacity: 0.3 },
  { x: "21%", y: "0%", w: "18px", h: "12px", r: "71deg", blur: "1.3px", opacity: 0.39 },
  { x: "31%", y: "10%", w: "26px", h: "18px", r: "-54deg", blur: "0.7px", opacity: 0.5 },
  { x: "39%", y: "0%", w: "12px", h: "9px", r: "23deg", blur: "1.6px", opacity: 0.34 },
  { x: "52%", y: "7%", w: "24px", h: "16px", r: "-11deg", blur: "0.8px", opacity: 0.52 },
  { x: "58%", y: "13%", w: "10px", h: "8px", r: "48deg", blur: "2px", opacity: 0.29 },
  { x: "66%", y: "0%", w: "31px", h: "22px", r: "5deg", blur: "0.4px", opacity: 0.61 },
  { x: "73%", y: "13%", w: "13px", h: "9px", r: "-33deg", blur: "1.7px", opacity: 0.36 },
  { x: "82%", y: "8%", w: "21px", h: "15px", r: "62deg", blur: "1px", opacity: 0.48 },
  { x: "90%", y: "1%", w: "29px", h: "20px", r: "-7deg", blur: "0.5px", opacity: 0.57 },
  { x: "99%", y: "3%", w: "16px", h: "11px", r: "28deg", blur: "1.4px", opacity: 0.41 },
  { x: "0%", y: "14%", w: "12px", h: "9px", r: "-46deg", blur: "1.8px", opacity: 0.32 },
  { x: "12%", y: "23%", w: "23px", h: "16px", r: "38deg", blur: "0.8px", opacity: 0.49 },
  { x: "3%", y: "43%", w: "41px", h: "28px", r: "-14deg", blur: "0.3px", opacity: 0.6 },
  { x: "11%", y: "54%", w: "13px", h: "9px", r: "73deg", blur: "1.6px", opacity: 0.34 },
  { x: "1%", y: "64%", w: "22px", h: "15px", r: "-36deg", blur: "1.1px", opacity: 0.44 },
  { x: "13%", y: "72%", w: "10px", h: "7px", r: "19deg", blur: "2px", opacity: 0.28 },
  { x: "0%", y: "83%", w: "29px", h: "20px", r: "51deg", blur: "0.5px", opacity: 0.56 },
  { x: "99%", y: "20%", w: "30px", h: "21px", r: "-60deg", blur: "0.6px", opacity: 0.54 },
  { x: "87%", y: "22%", w: "11px", h: "8px", r: "32deg", blur: "1.9px", opacity: 0.31 },
  { x: "95%", y: "39%", w: "25px", h: "17px", r: "-18deg", blur: "0.9px", opacity: 0.47 },
  { x: "88%", y: "55%", w: "12px", h: "9px", r: "69deg", blur: "1.7px", opacity: 0.35 },
  { x: "99%", y: "70%", w: "36px", h: "25px", r: "8deg", blur: "0.3px", opacity: 0.59 },
  { x: "86%", y: "82%", w: "14px", h: "10px", r: "-45deg", blur: "1.5px", opacity: 0.37 },
  { x: "98%", y: "98%", w: "24px", h: "17px", r: "36deg", blur: "0.8px", opacity: 0.5 },
  { x: "2%", y: "97%", w: "17px", h: "12px", r: "-24deg", blur: "1.2px", opacity: 0.41 },
  { x: "12%", y: "91%", w: "11px", h: "8px", r: "47deg", blur: "1.8px", opacity: 0.32 },
  { x: "34%", y: "99%", w: "28px", h: "20px", r: "-57deg", blur: "0.6px", opacity: 0.53 },
  { x: "38%", y: "90%", w: "9px", h: "7px", r: "8deg", blur: "2px", opacity: 0.27 },
  { x: "48%", y: "99%", w: "20px", h: "14px", r: "58deg", blur: "1px", opacity: 0.45 },
  { x: "55%", y: "88%", w: "13px", h: "9px", r: "-30deg", blur: "1.7px", opacity: 0.34 },
  { x: "62%", y: "93%", w: "26px", h: "18px", r: "16deg", blur: "0.7px", opacity: 0.51 },
  { x: "72%", y: "99%", w: "11px", h: "8px", r: "-68deg", blur: "1.9px", opacity: 0.29 },
  { x: "81%", y: "96%", w: "23px", h: "16px", r: "40deg", blur: "0.9px", opacity: 0.48 },
  { x: "93%", y: "89%", w: "12px", h: "8px", r: "-2deg", blur: "1.8px", opacity: 0.33 },
  { x: "18%", y: "14%", w: "15px", h: "10px", r: "-73deg", blur: "1.5px", opacity: 0.36 },
  { x: "84%", y: "15%", w: "16px", h: "11px", r: "14deg", blur: "1.4px", opacity: 0.38 },
  { x: "7%", y: "80%", w: "12px", h: "9px", r: "-9deg", blur: "1.6px", opacity: 0.35 },
];

const numberFromCssValue = (value: string) => Number.parseFloat(value);

const getAsteroidOrbit = (asteroid: (typeof asteroids)[number], index: number) => {
  const x = numberFromCssValue(asteroid.x);
  const y = numberFromCssValue(asteroid.y);
  const width = numberFromCssValue(asteroid.w);
  const height = numberFromCssValue(asteroid.h);
  const blur = numberFromCssValue(asteroid.blur);
  const dx = x - 50;
  const dy = y - 50;
  const radius = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const size = (width + height) / 2;
  const depthDuration = 210 + blur * 58 + Math.max(0, 34 - size) * 2.4 + (index % 6) * 14;

  return {
    angle: `${angle}deg`,
    radius: `${radius}%`,
    duration: `${Math.round(depthDuration)}s`,
    direction: index % 4 === 0 ? "reverse" : "normal",
  };
};

export default function InnerSolarSystemModel() {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    event.currentTarget.style.setProperty("--solar-tilt-x", `${y * -2.2}deg`);
    event.currentTarget.style.setProperty("--solar-tilt-y", `${x * 3.2}deg`);
    event.currentTarget.style.setProperty("--solar-belt-x", `${y * 0.25}deg`);
    event.currentTarget.style.setProperty("--solar-belt-y", `${x * -0.35}deg`);
    event.currentTarget.style.setProperty("--solar-belt-shift-x", `${x * 1}px`);
    event.currentTarget.style.setProperty("--solar-belt-shift-y", `${y * 0.8}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--solar-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--solar-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--solar-belt-x", "0deg");
    event.currentTarget.style.setProperty("--solar-belt-y", "0deg");
    event.currentTarget.style.setProperty("--solar-belt-shift-x", "0px");
    event.currentTarget.style.setProperty("--solar-belt-shift-y", "0px");
  };

  return (
    <main className="solar-model-page">
      <section
        id="inner-solar-system-model"
        className="solar-model-section"
        aria-labelledby="solar-model-title"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="solar-model-section__stars" aria-hidden="true" />
        <div className="solar-model-section__haze" aria-hidden="true" />
        <div className="solar-model-asteroid-belt" aria-hidden="true">
          {asteroids.map((asteroid, index) => {
            const orbit = getAsteroidOrbit(asteroid, index);

            return (
              <span
                className="solar-model-asteroid-track"
                key={`${asteroid.x}-${asteroid.y}-${index}`}
                style={{
                  "--asteroid-start": orbit.angle,
                  "--asteroid-radius": orbit.radius,
                  "--asteroid-duration": orbit.duration,
                  "--asteroid-direction": orbit.direction,
                } as CSSProperties}
              >
                <span
                  className="solar-model-asteroid"
                  style={{
                  "--asteroid-w": asteroid.w,
                  "--asteroid-h": asteroid.h,
                  "--asteroid-rotate": asteroid.r,
                  "--asteroid-blur": asteroid.blur,
                  "--asteroid-opacity": asteroid.opacity,
                  } as CSSProperties}
                />
              </span>
            );
          })}
        </div>

        <header className="solar-model-header">
          <Link href="/" className="solar-model-header__home">
            Cosmic Flow
          </Link>
          <p className="solar-model-header__kicker">Interactive orbit study</p>
          <h1 id="solar-model-title" className="solar-model-header__title">
            Inner Solar System Model
          </h1>
        </header>

        <div className="solar-model-stage" aria-label="Animated inner Solar System model">
          <a
            className="solar-model__sun-link"
            href={placeholderSource}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open Sun image source in a new tab"
          >
            <Image src={SUN} alt="Sun" priority sizes="(max-width: 768px) 28vw, 15vw" className="solar-model__sun-img" />
          </a>

          {planets.map((planet) => (
            <div
              className="solar-model__orbit"
              key={planet.name}
              style={{
                "--orbit-size": planet.orbitSize,
                "--orbit-duration": planet.duration,
                "--orbit-start": planet.start,
                "--orbit-depth": planet.depth,
              } as CSSProperties}
            >
              <div className="solar-model__runner">
                {planet.name === "Earth" ? (
                  <div
                    className="solar-model__planet-system"
                    style={{ "--body-size": planet.bodySize } as CSSProperties}
                  >
                    <a
                      className={`solar-model__planet-link ${planet.className}`}
                      href={planet.sourceHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Open Earth image source in a new tab"
                    >
                      <Image
                        src={planet.image}
                        alt={planet.name}
                        fill
                        sizes="(max-width: 768px) 12vw, 6vw"
                        className="solar-model__planet-img"
                      />
                    </a>
                    <span
                      className="solar-model__moon-orbit"
                      style={{
                        "--moon-orbit-size": moon.orbitSize,
                        "--moon-duration": moon.duration,
                        "--moon-start": moon.start,
                      } as CSSProperties}
                    >
                      <span className="solar-model__moon-runner">
                        <a
                          className={moon.className}
                          href={moon.sourceHref}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label="Open Moon image source in a new tab"
                          style={{ "--body-size": moon.bodySize } as CSSProperties}
                        >
                          <Image src={moon.image} alt="Moon" fill sizes="16px" className="solar-model__planet-img" />
                        </a>
                      </span>
                    </span>
                  </div>
                ) : (
                  <a
                    className={`solar-model__planet-link ${planet.className}`}
                    href={planet.sourceHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${planet.name} image source in a new tab`}
                    style={{ "--body-size": planet.bodySize } as CSSProperties}
                  >
                    <Image
                      src={planet.image}
                      alt={planet.name}
                      fill
                      sizes="(max-width: 768px) 12vw, 6vw"
                      className="solar-model__planet-img"
                    />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="solar-model-caption" aria-hidden="true">
          <span>Sun</span>
          <span>Mercury</span>
          <span>Venus</span>
          <span>Earth + Moon</span>
          <span>Mars</span>
        </div>
      </section>
    </main>
  );
}
