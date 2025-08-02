import { Link } from "react-router-dom";
import star from "../assets/Star10.svg";
export default function ServicesHero() {
  return (
    <div className="bg-black font-avenir z-50 flex flex-col gap-4 px-4">
      <div className="pt-9 flex flex-row justify-between">
        <Link to="/services">
          <div className="text-[1.388vw] underline leading-none">
            Explore Services
          </div>
        </Link>
        <img
          id="services-star"
          src={star}
          alt="10-point star"
          className="w-[30vw] h-[30vh] absolute -mt-[10em] ml-[5em] opacity-0"
        />
        <div className="text-[3.3312vw] font-bold  leading-none text-white">
          A <span className="text-[#D6FB30]">full-stack developer</span>{" "}
          bringing ideas to life,
        </div>
      </div>
      <div className="text-[3.3312vw] font-bold  leading-none text-white text-left">
        turning creativity into web app &ndash;{" "}
        <span className="font-thin italic">from design to deployment.</span>
      </div>
    </div>
  );
}
