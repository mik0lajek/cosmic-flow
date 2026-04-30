"use client";

import { useEffect, useRef, useState } from "react";
import "../../../styles/colony/colony.css";
import Footer from "../../Footer";

export interface MissionFunding {
  raised:     number;
  goal:       number;
  supporters: number;
}

export interface Donor {
  rank:   number;
  name:   string;
  amount: number;
}

export interface MissionData {
  funding:    MissionFunding;
  topDonors:  Donor[];
  launchYear: string;
  colonists:  string;
  phase:      string;
  duration:   string;
}

const MOCKUP_DATA: MissionData = {
  funding: {
    raised:     284_729_300,
    goal:       500_000_000,
    supporters: 482_100,
  },
  topDonors: [
    { rank: 1, name: "E. Musk",      amount: 25_000_000 },
    { rank: 2, name: "SpaceX Corp.", amount: 18_000_000 },
    { rank: 3, name: "Anonymous",    amount:  9_500_000 },
    { rank: 4, name: "NASA Found.",  amount:  7_250_000 },
    { rank: 5, name: "C. Hadfield",  amount:  4_820_000 },
  ],
  launchYear: "2040",
  colonists:  "1,000",
  phase:      "Alpha",
  duration:   "10 Years",
};

function formatUSD(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function padRank(n: number): string {
  return String(n).padStart(2, "0");
}

interface Props {
  data?: MissionData;
}

export default function ColonySection({ data = MOCKUP_DATA }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pct        = Math.min(data.funding.raised / data.funding.goal, 1);
  const pctDisplay = (pct * 100).toFixed(1);

  const missionStats = [
    { label: "Launch Target", value: data.launchYear },
    { label: "First Colony",  value: data.colonists  },
    { label: "Mission Phase", value: data.phase      },
    { label: "Duration",      value: data.duration   },
  ];

  return (
    <section ref={sectionRef} id="section-colony" className="colony-section">
      <div className="colony-starfield" />
      <div className="colony-glow" />

      <div className={`colony-content${animated ? " colony-content--animated" : ""}`}>

        <div className="colony-left">
          <span className="colony-kicker">Cosmic Flow · Mars Initiative</span>

          <h2 className="colony-title">COLONIZE<br />MARS</h2>

          <p className="colony-tagline">
            Humanity's next chapter begins with a single step beyond Earth.
            Join the mission to make Mars our second home.
          </p>

          <button className="colony-cta" onClick={() => {}}>
            Support the Mission
          </button>
        </div>

        <div className="colony-center">
          <div className="colony-stats">
            {missionStats.map(({ label, value }, i) => (
              <div key={label} className="colony-stat">
                {i > 0 && <div className="colony-stat__sep" />}
                <div className="colony-stat__inner">
                  <span className="colony-stat__label">{label}</span>
                  <span className="colony-stat__value">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="colony-right">
          <div className="colony-donors">
            <span className="colony-donors__label">Top Donors</span>
            <div className="colony-donors__list">
              {data.topDonors.map((donor) => (
                <div key={donor.rank} className="colony-donor">
                  <span className="colony-donor__rank">{padRank(donor.rank)}</span>
                  <span className="colony-donor__name">{donor.name}</span>
                  <span className="colony-donor__amount">{formatUSD(donor.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="colony-funding">
          <div className="colony-funding__header">
            <span className="colony-funding__label">Mission Funding</span>
            <span>
              <span className="colony-funding__raised">{formatUSD(data.funding.raised)}</span>
              <span className="colony-funding__of">of</span>
              <span className="colony-funding__goal">{formatUSD(data.funding.goal)}</span>
            </span>
          </div>

          <div className="colony-bar">
            <div
              className="colony-bar__fill"
              style={{ width: animated ? `${pct * 100}%` : "0%" }}
            />
          </div>

          <div className="colony-funding__meta">
            <span>{data.funding.supporters.toLocaleString("en-US")} supporters</span>
            <span className="colony-funding__pct">{pctDisplay}% funded</span>
          </div>
        </div>

      </div>

      <Footer />
    </section>
  );
}
