"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  targetOpacity: number;
  speed: number;
  timer: number;
  period: number;
}

function createStar(width: number, height: number): Star {
  const period = 3000 + Math.random() * 5000;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.5 + Math.random() * 1.5,
    opacity: 0.3 + Math.random() * 0.7,
    targetOpacity: 0.3 + Math.random() * 0.7,
    speed: 0.3 + Math.random() * 0.4,
    timer: Math.random() * period,
    period,
  };
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const starCount = reducedMotion ? 20 : 60;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: Star[] = Array.from({ length: starCount }, () =>
      createStar(width, height)
    );

    let rafId: number;
    let last = performance.now();

    function draw(now: number) {
      const delta = now - last;
      last = now;

      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        if (!reducedMotion) {
          star.timer += delta;
          if (star.timer >= star.period) {
            star.timer = 0;
            star.targetOpacity = 0.3 + Math.random() * 0.7;
            star.period = 3000 + Math.random() * 5000;
          }
          const t = star.timer / star.period;
          const sine = Math.sin(t * Math.PI * 2);
          star.opacity = 0.3 + ((sine + 1) / 2) * 0.7;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${star.opacity.toFixed(2)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      for (const star of stars) {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
