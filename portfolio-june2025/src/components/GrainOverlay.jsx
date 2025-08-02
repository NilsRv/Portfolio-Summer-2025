import { useEffect } from "react";

export default function GrainOverlay() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "grain-overlay";
    Object.assign(canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      opacity: 0.5, // opacité subtile
      mixBlendMode: "overlay", // facultatif
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      const imageData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = (25 << 24) | (Math.random() * 0xffffff);
      }
      ctx.putImageData(imageData, 0, 0);
    };

    let frame;
    const animate = () => {
      draw();
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
