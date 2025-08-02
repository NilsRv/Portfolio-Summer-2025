import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import gsap from "gsap";
import Services from "../pages/Services";

export default function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const transition = async () => {
      const container = document.getElementById("webgl-transition");
      const material = container?.__shaderMaterial;
      if (!material) return;

      container.style.visibility = "visible";
      container.style.pointerEvents = "auto";

      const animateProgress = (from, to, duration) => {
        material.uniforms.uProgress.value = from;
        return gsap
          .to(material.uniforms.uProgress, {
            value: to,
            duration,
            ease: "power2.inOut",
          })
          .then();
      };

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      await delay(1000); // Première pause (avant l'entrée)

      // Première montée
      await animateProgress(0, 0.6, 1);
      await delay(100); // Petite pause
      await animateProgress(0.6, 1, 0.8);
      await delay(400); // Petite pause avant montée finale

      // Montée finale pour sortir l'effet du haut de l'écran
      await animateProgress(1, 1.4, 0.3);

      material.uniforms.uProgress.value = 0;
      container.style.visibility = "hidden";
      container.style.pointerEvents = "none";
    };
    transition();
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}
