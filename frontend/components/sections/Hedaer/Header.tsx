import Image from "next/image";
import IMGBG from "../../../Images/header/header-bg.jpg";
import ASTRONAUT from "../../../Images/header/astronaut.png";
import "../../../styles/header/header.css";
import "../../../styles/header/astronaut.css";
import ScrollIndicator from "./ScrollIndicator";
import SpaceFlowReveal from "./SpaceFlowReveal";

export default function Header() {
  return (
    <header className="relative w-screen h-screen px-4xl flex items-center ">
      <Image
        src={IMGBG}
        alt="Header Background"
        quality={75}
        fill
        className="w-full h-full object-cover"
      />

      <div className="astronaut-wrapper">
        <div className="astronaut-shadow astronaut-shadow--green">
          <Image src={ASTRONAUT} alt="" aria-hidden="true" quality={75} />
        </div>
        <div className="astronaut-shadow astronaut-shadow--purple">
          <Image src={ASTRONAUT} alt="" aria-hidden="true" quality={75} />
        </div>
        <div className="astronaut-main">
          <Image src={ASTRONAUT} alt="Astronaut" quality={75} />
        </div>
      </div>

      <h1
        id="header"
        className="relative z-10"
        style={{ textShadow: "10px 10px 9.8px rgba(0,0,0,1)" }}
      >
        DISCOVER
      </h1>

      <ScrollIndicator className="absolute bottom-15 left-1/2 transform -translate-x-1/2" />
      <SpaceFlowReveal />
    </header>
  );
}