import GrainOverlay from "./GrainOverlay";
import MovingShadow from "./MovingShadow";

export default function Hero() {
  return (
    <div className="relative bg-[#3B3838] z-0">
      {/* Crée un contexte d'empilement pour tout */}
      <div className="">
        <GrainOverlay />
        <MovingShadow />
        <div
          id="hero-title"
          className="font-great-vibes text-center h-[0.75em] lowercase text-[33vw] leading-none text-white px-8 pl-4 -top-[0.062em]  relative z-40 whitespace-nowrap"
          style={{ clipPath: "inset(0 0 0 100%)" }}
        >
          Nils Riviere
        </div>
      </div>
    </div>
  );
}
