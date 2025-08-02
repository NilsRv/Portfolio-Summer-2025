import ServiceShowcase from "../components/ServiceShowcase";
import FrontendShowcase from "../components/ServiceShowcase";
import SkillBadge from "../components/SkillBadge";

const frontendFeatures = [
  "WEB & MOBILE APP",
  "RESPONSIVE DESIGN",
  "ANIMATIONS",
  "UI LIBRARIES",
  "SEO & PERFORMANCES",
];

const backendFeatures = [
  "API INTEGRATION",
  "AUTHENTIFICATION",
  "MICRO-SERVICES ARCHITECTURE",
  "SQL & NOSQL",
];

const devopsFeatures = ["CI/CD", "DOCKER", "DEPLOYMENT", "MONITORING"];

const uiuxFeatures = ["APP & WEB DESIGN", "WIREFRAME", "PROTOTYPE"];

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-36">
      <div className="inline-block leading-none text-[10rem] tracking-[-0.313rem] flex flex-col items-start font-bold font-avenir">
        <div>no cape, no spells</div>
        <div className="text-right">
          only <span className="text-[#D6FB30] italic">skills</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-12 pt-48 pb-36">
        <SkillBadge label="FRONTEND" color="#D6FB30" />
        <SkillBadge label="BACKEND" color="#30EAFB" />
        <SkillBadge label="DEVOPS" color="#C17CFF" />
        <SkillBadge label="UI / UX" color="#FF5EB7" />
      </div>
      <div>
        <ServiceShowcase label="Frontend" features={frontendFeatures} />
        <ServiceShowcase
          label="Backend"
          color="#30EAFB"
          features={backendFeatures}
          panelLeft={true}
        />
        <ServiceShowcase
          label="DevOps"
          color="#C17CFF"
          features={devopsFeatures}
        />
        <ServiceShowcase
          label="UX / UI"
          color="#FF5EB7"
          features={uiuxFeatures}
          panelLeft={true}
        />
      </div>
    </div>
  );
}
