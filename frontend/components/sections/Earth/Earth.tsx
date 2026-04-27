import Image from "next/image";
import EARTH from "../../../Images/sections/earth.png";
import "../../../styles/earth/earth.css";

const earthDetails = [
  { label: "RADIUS", value: "6,371 km" },
  { label: "MASS", value: "5.972 x 10^24 kg" },
  { label: "AGE", value: "4.54 billion years" },
  { label: "DENSITY", value: "5.51 g/cm3" },
  { label: "DISTANCE FROM SUN", value: "149.6 million km" },
];

const earthDescriptionLeft = [
  "Amid the vast emptiness of space lies Earth. A vibrant world teeming with life.",
  "Its oceans, atmosphere, and unique conditions make it the only known planet capable of sustaining life.",
  "From afar, it appears as a fragile blue sphere suspended in darkness.",
];

const earthDescriptionRight = [
  "Yet Earth is not eternal. As time passes and conditions inevitably change, humanity will face the need to look beyond its home.",
  "The search for new worlds may one day become not a choice, but a necessity.",
];

export default function EarthSection() {
  return (
    <section className="earth-section">
      <p className="earth-title">EARTH</p>
      <div className="earth-planet">
        <Image
          src={EARTH}
          alt="Earth"
          fill
          quality={90}
          sizes="100vw"
          className="earth-planet__img"
        />
      </div>

      <div className="earth-info">
        <div className="earth-description earth-description--left">
          {earthDescriptionLeft.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="earth-details">
          {earthDetails.map((detail) => (
            <div key={detail.label} className="earth-detail">
              <span className="earth-detail__label">{detail.label}</span>
              <span className="earth-detail__value">{detail.value}</span>
            </div>
          ))}
        </div>

        <div className="earth-description earth-description--right">
          {earthDescriptionRight.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
