import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 flex justify-between lowercase p-4 font-avenir text-sm font-medium z-50 text-white"
      style={{ mixBlendMode: "difference" }}
    >
      <Link to="/">Nils Riviere</Link>
      <div>full-stack developer</div>
      <div></div>
      <div className="flex flex-col">
        <Link to="/services">services</Link>
        <Link to="/projects">projects</Link>
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
      </div>
      <div></div>
      <div>paris, fr</div>
    </div>
  );
}
