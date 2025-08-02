import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServicesHero from "../components/ServicesHero";
import HomeIntro from "../components/HomeIntro";
export default function Home() {
  return (
    <main className="page">
      <HomeIntro />
      <div className="h-screen w-screen flex flex-col">
        <Hero />
        <div id="home-rest" className="flex flex-col opacity-0">
          <ServicesHero />
        </div>
      </div>
    </main>
  );
}
