import { useEffect, useState } from "react";
import { gsap } from "gsap";
import star from "../assets/Star10.svg";

/**
 * StarSplash – orchestrates the entry sequence on the Home page.
 *
 * 1. Étoile centrale ➜ vole jusqu’à #services-star.
 * 2. Révèle l’étoile statique (#services-star).
 * 3. "Nils Riviere" (#hero-title) se dévoile comme une écriture manuscrite (clip-path).
 * 4. Le reste de la page (#home-rest) fade-in.
 *
 * Pré-requis dans le markup :
 *  ▸ Hero :
 *      <div
 *        id="hero-title"
 *        className="... opacity-100"
 *        style={{ clipPath: 'inset(0 0 0 100%)' }}   // caché à droite
 *      >Nils Riviere</div>
 *
 *  ▸ Conteneur du reste du contenu :
 *      <div id="home-rest" className="opacity-0"> ... </div>
 *
 *  ▸ Étoile cible déjà présente (id="services-star") avec opacity-0 comme décrit
 */
export default function StarSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const splash = document.getElementById("star-splash");
    const target = document.getElementById("services-star");
    const heroTitle = document.getElementById("hero-title");
    const homeRest = document.getElementById("home-rest");

    // Sécurité : si éléments manquants, simple fade puis unmount
    if (!splash || !target || !heroTitle || !homeRest) {
      const tl = gsap.timeline({ onComplete: () => setVisible(false) });
      tl.fromTo(splash, { scale: 0 }, { scale: 1, duration: 0.8 }).to(splash, {
        opacity: 0,
      });
      return () => tl.kill();
    }

    // Préparation : masques initiaux
    gsap.set(target, { opacity: 0 }); // étoile statique
    gsap.set(heroTitle, { clipPath: "inset(0 0 0 100%)" }); // caché
    gsap.set(homeRest, { opacity: 0 });

    const splashRect = splash.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const deltaX =
      targetRect.left +
      targetRect.width / 2 -
      (splashRect.left + splashRect.width / 2);
    const deltaY =
      targetRect.top +
      targetRect.height / 2 -
      (splashRect.top + splashRect.height / 2);
    const scaleTo = targetRect.width / splashRect.width;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => setVisible(false),
    });

    // 1. apparition + saut
    tl.set(splash, { scale: 0, rotate: -30, transformOrigin: "50% 50%" })
      .to(splash, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" })
      .to(
        splash,
        { x: deltaX, y: deltaY, scale: scaleTo, duration: 1 },
        "+=0.4"
      )
      .to(splash, { opacity: 0, duration: 0.2 });

    // 2. affiche l’étoile fixe
    tl.set(target, { opacity: 1 }, "<");

    // 3. animation manuscrite du titre
    tl.to(
      heroTitle,
      {
        clipPath: "inset(0 0 0 0)",
        duration: 1.4,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // 4. fade-in reste contenu
    tl.to(homeRest, { opacity: 1, duration: 0.6 }, "-=0.4");

    return () => tl.kill();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-none select-none">
      <img
        id="star-splash"
        src={star}
        alt="Loading star"
        className="w-40 h-40"
      />
    </div>
  );
}
