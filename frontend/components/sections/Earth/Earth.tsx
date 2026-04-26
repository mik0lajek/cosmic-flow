import Image from "next/image";
import EARTH from "../../../Images/sections/earth.png";
import "../../../styles/earth/earth.css";

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
    </section>
  );
}
