import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLTransition() {
  const containerRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader: `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      precision mediump float;

uniform float uProgress;
uniform float uTime;
uniform vec2 uResolution;

float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Distorsion fluide (simule irrégularités)
  float distortion = noise(uv * 4.6 + vec2(0.0, uTime * 0.5)) * 0.3;

  // Masque de transition net (bordure franche)
  float mask = smoothstep(uProgress - 0.01, uProgress + 0.01, uv.y + distortion);

  // Bruit pour la couleur (base métal)
  float detail = noise(uv * 2.5 + uTime * 0.2);

  // Couleurs vertes
  vec3 base = vec3(0.839, 0.984, 0.188);   // #D6FB30
  vec3 mid = vec3(0.75, 0.92, 0.15);
  vec3 deep = vec3(0.5, 0.65, 0.05);
  vec3 color = mix(mid, base, detail);
  color = mix(deep, color, detail * 1.2);

  // --- Effet métallisé ---
  // Simuler une "normale" perturbée en 2D à partir du bruit (variation autour de y)
  float normalPerturb = distortion * 2.0 - 1.0; // [-1,1]

  // Direction lumière fixe (simulée en 2D)
  vec2 lightDir = normalize(vec2(0.5, 1.0));

  // "Normal" de la surface simulée en 2D, ici on considère une normale dans y avec perturbation sur x
  vec2 normal = normalize(vec2(normalPerturb, 1.0));

  // Calcul speculaire simple : reflet = max(dot(normal, lightDir), 0.0)^shininess
  float shininess = 20.0;
  float spec = pow(max(dot(normal, lightDir), 0.0), shininess);

  // Ajouter reflet blanc légèrement teinté en vert
  vec3 specular = vec3(0.8, 1.0, 0.3) * spec * 0.5;

  // Couleur finale avec reflet métallique
  vec3 finalColor = color + specular;

  // Appliquer masque et fond transparent
  finalColor = mix(vec3(0.0), finalColor, mask);
  gl_FragColor = vec4(finalColor, mask);
}

    `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const render = () => {
      material.uniforms.uTime.value += 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    render();

    containerRef.current.__shaderMaterial = material;

    const onResize = () => {
      const w = window.innerWidth,
        h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize);
    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      id="webgl-transition"
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        visibility: "hidden",
      }}
    />
  );
}
