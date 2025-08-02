import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * HomeIntro – anime les éléments de la page Home **uniquement au reload**.
 *
 * Séquence :
 * 1. Étoile (#services-star) : scale 0 ➜ 1 + fade.
 * 2. Titre "Nils Riviere" (#hero-title) : effet « écriture » via clip‑path.
 * 3. Reste du contenu (#home-rest) : fade + léger slide‑up.
 *
 * Chaque élément doit exister dans le DOM avec les IDs indiqués :
 *   · services-star  (opacity‑0 dans le markup)
 *   · hero-title     (style={{ clipPath: 'inset(0 0 0 100%)' }})
 *   · home-rest      (opacity‑0)
 */
export default function HomeIntro() {
  useEffect(() => {
    const star = document.getElementById("services-star");
    const title = document.getElementById("hero-title");
    const rest = document.getElementById("home-rest");

    if (!star || !title || !rest) return; // sécurité

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      star,
      { scale: 0, opacity: 0, rotate: -20, transformOrigin: "50% 50%" },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }
    )
      .fromTo(
        title,
        { clipPath: "inset(0 0 0 100%)" },
        { clipPath: "inset(0 0 0 0)", duration: 1.1 },
        "-=0.4"
      )
      .fromTo(
        rest,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.5"
      );

    return () => tl.kill();
  }, []);

  return null; // Pas de rendu : contrôle uniquement l’animation
}
