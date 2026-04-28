"use client";

import { useEffect, useRef } from "react";

import styles from "../styles/site-moonlight-background.module.css";

const STAR_COUNT_DESKTOP = 112;
const STAR_COUNT_MOBILE = 56;
const MOON_CANVAS_SIZE = 480;

function parseColorValue(value) {
  const color = value.trim();

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex;

    const parsed = Number.parseInt(normalized, 16);

    if (Number.isFinite(parsed)) {
      return {
        r: (parsed >> 16) & 255,
        g: (parsed >> 8) & 255,
        b: parsed & 255,
      };
    }
  }

  const rgbMatch = color.match(/rgba?\(([^)]+)\)/);

  if (rgbMatch) {
    const [r, g, b] = rgbMatch[1]
      .split(",")
      .slice(0, 3)
      .map((part) => Number.parseFloat(part.trim()));

    if ([r, g, b].every(Number.isFinite)) {
      return { r, g, b };
    }
  }

  return null;
}

function getMoonlightColorPalette(root) {
  const computedStyle = window.getComputedStyle(root);
  const read = (name) => parseColorValue(computedStyle.getPropertyValue(name));

  const palette = {
    canvas: read("--portfolio-color-canvas"),
    title: read("--portfolio-color-text-title"),
    body: read("--portfolio-color-text-body"),
    muted: read("--portfolio-color-text-muted"),
    blue: read("--portfolio-color-accent-blue"),
    ochre: read("--portfolio-color-accent-ochre"),
    brand: read("--portfolio-color-accent-brand"),
  };

  return Object.values(palette).every(Boolean) ? palette : null;
}

function colorWithAlpha(color, alpha) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function drawMoon(canvas, palette) {
  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const size = MOON_CANVAS_SIZE;
  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;

  canvas.width = size;
  canvas.height = size;
  context.clearRect(0, 0, size, size);

  context.save();
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.clip();

  const base = context.createRadialGradient(
    centerX * 0.72,
    centerY * 0.68,
    radius * 0.02,
    centerX,
    centerY,
    radius,
  );
  base.addColorStop(0, colorWithAlpha(palette.title, 0.94));
  base.addColorStop(0.28, colorWithAlpha(palette.title, 0.84));
  base.addColorStop(0.56, colorWithAlpha(palette.body, 0.76));
  base.addColorStop(0.8, colorWithAlpha(palette.muted, 0.68));
  base.addColorStop(1, colorWithAlpha(palette.canvas, 0.58));
  context.fillStyle = base;
  context.fillRect(0, 0, size, size);

  const maria = [
    { x: 0.36, y: 0.3, rx: 0.2, ry: 0.13, alpha: 0.13, rotate: 0.16 },
    { x: 0.46, y: 0.54, rx: 0.15, ry: 0.11, alpha: 0.11, rotate: -0.22 },
    { x: 0.58, y: 0.41, rx: 0.11, ry: 0.15, alpha: 0.09, rotate: 0.28 },
    { x: 0.3, y: 0.62, rx: 0.13, ry: 0.1, alpha: 0.08, rotate: -0.08 },
  ];

  maria.forEach((mark) => {
    const x = mark.x * size;
    const y = mark.y * size;
    const gradient = context.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      Math.max(mark.rx, mark.ry) * size,
    );
    gradient.addColorStop(0, colorWithAlpha(palette.canvas, mark.alpha * 0.92));
    gradient.addColorStop(0.56, colorWithAlpha(palette.canvas, mark.alpha * 0.4));
    gradient.addColorStop(1, "transparent");

    context.fillStyle = gradient;
    context.beginPath();
    context.ellipse(
      x,
      y,
      mark.rx * size,
      mark.ry * size,
      mark.rotate,
      0,
      Math.PI * 2,
    );
    context.fill();
  });

  const craters = [
    { x: 0.32, y: 0.28, radius: 0.055 },
    { x: 0.52, y: 0.35, radius: 0.035 },
    { x: 0.4, y: 0.56, radius: 0.045 },
    { x: 0.61, y: 0.58, radius: 0.03 },
  ];

  craters.forEach((crater) => {
    const x = crater.x * size;
    const y = crater.y * size;
    const craterRadius = crater.radius * size;
    const shadow = context.createRadialGradient(
      x + craterRadius * 0.12,
      y + craterRadius * 0.12,
      craterRadius * 0.2,
      x,
      y,
      craterRadius,
    );

    shadow.addColorStop(0, colorWithAlpha(palette.canvas, 0.08));
    shadow.addColorStop(0.82, colorWithAlpha(palette.canvas, 0.035));
    shadow.addColorStop(1, "transparent");

    context.fillStyle = shadow;
    context.beginPath();
    context.arc(x, y, craterRadius, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = colorWithAlpha(palette.title, 0.09);
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(
      x - craterRadius * 0.06,
      y - craterRadius * 0.06,
      craterRadius * 0.8,
      -Math.PI * 0.7,
      Math.PI * 0.15,
    );
    context.stroke();
  });

  const terminator = context.createLinearGradient(centerX * 0.5, 0, size, 0);
  terminator.addColorStop(0, "transparent");
  terminator.addColorStop(0.58, "transparent");
  terminator.addColorStop(0.82, colorWithAlpha(palette.canvas, 0.28));
  terminator.addColorStop(1, colorWithAlpha(palette.canvas, 0.68));
  context.fillStyle = terminator;
  context.fillRect(0, 0, size, size);

  const earthshine = context.createRadialGradient(
    centerX + radius * 0.64,
    centerY,
    0,
    centerX + radius * 0.64,
    centerY,
    radius * 0.52,
  );
  earthshine.addColorStop(0, colorWithAlpha(palette.blue, 0.065));
  earthshine.addColorStop(1, "transparent");
  context.fillStyle = earthshine;
  context.fillRect(0, 0, size, size);

  const limb = context.createRadialGradient(centerX, centerY, radius * 0.66, centerX, centerY, radius);
  limb.addColorStop(0, "transparent");
  limb.addColorStop(0.86, colorWithAlpha(palette.canvas, 0.08));
  limb.addColorStop(1, colorWithAlpha(palette.canvas, 0.22));
  context.fillStyle = limb;
  context.fillRect(0, 0, size, size);
  context.restore();
}

function buildStars(count, palette) {
  const colors = [
    palette.body,
    palette.title,
    palette.blue,
    palette.ochre,
    palette.brand,
  ];

  return Array.from({ length: count }, () => {
    const isBright = Math.random() < 0.12;

    return {
      x: Math.random() * 100,
      y: Math.random() * 64,
      baseRadius: isBright ? 1.2 + Math.random() * 1.25 : 0.48 + Math.random() * 0.92,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: isBright ? 0.38 + Math.random() * 0.24 : 0.14 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      speed: 0.24 + Math.random() * 0.48,
      flickerAmplitude: isBright ? 0.09 + Math.random() * 0.12 : 0.04 + Math.random() * 0.08,
      flashPhase: Math.random() * Math.PI * 2,
      flashSpeed: 0.035 + Math.random() * 0.07,
      isBright,
    };
  });
}

function drawStars(context, stars, width, height, time, isReducedMotion) {
  context.clearRect(0, 0, width, height);

  stars.forEach((star) => {
    const x = (star.x * width) / 100;
    const y = (star.y * height) / 100;
    const shimmer = isReducedMotion
      ? 0
      : Math.sin(star.phase + time * star.speed) * star.flickerAmplitude;
    const flash = isReducedMotion
      ? 0
      : Math.pow(Math.max(0, Math.sin(star.flashPhase + time * star.flashSpeed)), 12) * 0.18;
    const alpha = Math.max(0.02, star.baseAlpha + shimmer + flash);
    const radius = star.baseRadius * (1 + flash * 0.5);

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = colorWithAlpha(star.color, alpha);
    context.fill();

    if (star.isBright && alpha > 0.24) {
      const glow = context.createRadialGradient(x, y, 0, x, y, radius * 3.8);
      glow.addColorStop(0, colorWithAlpha(star.color, alpha * 0.26));
      glow.addColorStop(1, "transparent");

      context.beginPath();
      context.arc(x, y, radius * 3.8, 0, Math.PI * 2);
      context.fillStyle = glow;
      context.fill();
    }
  });
}

export default function SiteMoonlightBackground() {
  const rootRef = useRef(null);
  const moonCanvasRef = useRef(null);
  const starsCanvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const moonCanvas = moonCanvasRef.current;
    const starsCanvas = starsCanvasRef.current;

    if (!root || !moonCanvas || !starsCanvas) {
      return undefined;
    }

    const palette = getMoonlightColorPalette(root);
    const context = starsCanvas.getContext("2d");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let stars = [];

    if (!palette) {
      return undefined;
    }

    drawMoon(moonCanvas, palette);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      width = window.innerWidth;
      height = window.innerHeight;
      starsCanvas.width = Math.round(width * dpr);
      starsCanvas.height = Math.round(height * dpr);
      starsCanvas.style.width = `${width}px`;
      starsCanvas.style.height = `${height}px`;

      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      stars = buildStars(isMobile ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP, palette);
    };

    const render = (timestamp = 0) => {
      if (!context) {
        return;
      }

      drawStars(context, stars, width, height, timestamp * 0.001, reduceMotionQuery.matches);

      if (!reduceMotionQuery.matches && !document.hidden) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const restart = () => {
      window.cancelAnimationFrame(animationFrame);
      resize();
      render();
    };

    const handleVisibilityChange = () => {
      window.cancelAnimationFrame(animationFrame);

      if (!document.hidden) {
        render();
      }
    };

    restart();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", restart);
    reduceMotionQuery.addEventListener("change", restart);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", restart);
      reduceMotionQuery.removeEventListener("change", restart);
      context?.clearRect(0, 0, width, height);
    };
  }, []);

  return (
    <div aria-hidden="true" className={styles.moonlightBackground} ref={rootRef}>
      <div className={styles.moonlightBeam} />
      <canvas className={styles.starsCanvas} ref={starsCanvasRef} />
      <div className={styles.moonWrap}>
        <canvas className={styles.moonCanvas} ref={moonCanvasRef} />
      </div>
    </div>
  );
}
