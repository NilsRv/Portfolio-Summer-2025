import React, { useState } from "react";
import SkillBadge from "./SkillBadge";

/**
 * ServiceShowcase – interactif :
 *  • Survol d’une feature ➜ texte géant dans la zone preview + feature en #D6FB30.
 *  • Sortie du survol ➜ revient au placeholder gris/noise.
 */
export default function ServiceShowcase({
  label,
  color = "#D6FB30",
  features = [],
  panelLeft = false,
  icon = (
    <span
      className="mx-auto h-24 w-24 select-none"
      style={{
        WebkitMask: "url('/lightning.svg') center / contain no-repeat",
        mask: "url('/lightning.svg') center / contain no-repeat",
        backgroundColor: "#4D4D4D",
      }}
      aria-label="Lightning icon"
    />
  ),
  preview = null,
}) {
  const [active, setActive] = useState(null);

  const handleEnter = (item) => setActive(item);
  const handleLeave = () => setActive(null);

  return (
    <section className="w-full bg-black pb-24">
      <div
        className={`flex flex-col gap-4 ${panelLeft ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        {/* Preview zone */}
        <div
          className="relative flex-1 aspect-video rounded-[40px] bg-neutral-700/40 drop-shadow-lg flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundBlendMode: "overlay",
          }}
        >
          {active && (
            <span className="text-[5vw] md:text-[3vw] font-avenir font-extrabold uppercase tracking-tight text-white mix-blend-difference pointer-events-none select-none text-center px-8">
              {active}
            </span>
          )}
          {/* Si un preview custom est fourni, on le place derrière et on laisse le texte au dessus */}
          {preview && <div className="absolute inset-0">{preview}</div>}
        </div>

        {/* Panneau descriptif */}
        <div className="relative w-full max-w-sm flex-shrink-0 rounded-[40px] bg-[#1B1B1B] px-6 py-12 flex flex-col gap-8">
          <SkillBadge
            label={label}
            color={color}
            className="-mt-15 mx-2 -rotate-6 origin-top-left shadow-lg"
          />

          {icon}

          {features.length > 0 && (
            <ul className="min-h-[379px] flex flex-col font-avenir text-xl font-bold text-white/90">
              {features.map((item) => {
                const isActive = active === item;
                return (
                  <li
                    key={item}
                    onMouseEnter={() => handleEnter(item)}
                    onMouseLeave={handleLeave}
                    className={`leading-none border-b pb-5 pt-7 border-[#4D4D4D] first:pt-0 last:border-none last:pb-0 first:border-t first:pt-7 cursor-pointer transition-colors ${
                      isActive ? "text-[#D6FB30]" : ""
                    }`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
