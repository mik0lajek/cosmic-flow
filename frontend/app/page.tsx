import Header from "@/components/sections/Hedaer/Header";
import SunSection from "@/components/sections/Sun/Sun";
import MercurySection from "@/components/sections/Mercury/Mercury";
import VenusSection from "@/components/sections/Venus/Venus";
import EarthMoonSection from "@/components/sections/EarthMoon/EarthMoon";
import MarsSection from "@/components/sections/Mars/Mars";

export default function Home() {
  return (
    <>
      <Header />
      <SunSection />
      <MercurySection />
      <VenusSection />
      <EarthMoonSection />
      <MarsSection />
    </>
  );
}
