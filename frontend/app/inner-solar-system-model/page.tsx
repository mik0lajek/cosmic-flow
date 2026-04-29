import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
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
  sourceHref: placeholderSource,
};

export default function InnerSolarSystemModel() {
  return (
    <main className="solar-model-page">
      <section id="inner-solar-system-model" className="solar-model-section" aria-labelledby="solar-model-title">
        <div className="solar-model-section__stars" aria-hidden="true" />
        <div className="solar-model-section__haze" aria-hidden="true" />

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
