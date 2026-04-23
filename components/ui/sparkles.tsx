"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
};

type SparklesCoreProps = {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  className?: string;
};

export function SparklesCore({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 800,
  particleColor = "#FFFFFF",
  className = "",
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      spawnParticles();
    };

    const spawnParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / (1920 * 1080 / particleDensity));
      particles.current = Array.from({ length: count }, () => makeParticle(canvas.width, canvas.height));
    };

    const makeParticle = (w: number, h: number): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: minSize + Math.random() * (maxSize - minSize),
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random(),
      opacitySpeed: 0.003 + Math.random() * 0.005,
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (const p of particles.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;
        if (p.opacity > 1 || p.opacity < 0) p.opacitySpeed *= -1;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.abs(p.opacity);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [background, minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
