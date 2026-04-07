"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Blocks,
  Network,
  Orbit,
  Pointer,
  Sparkles,
} from "lucide-react";

import styles from "../../styles/home-page.module.css";
import { createProgram } from "./skill-reveal-shader";

const skillIcons = {
  badgeCheck: BadgeCheck,
  blocks: Blocks,
  network: Network,
  orbit: Orbit,
  pointer: Pointer,
  sparkles: Sparkles,
};

const TIMING = {
  iconSwap: 140,
  idleStop: 520,
};

const MOTION = {
  focusEase: 0.11,
  rowEase: 0.16,
  pointerEase: 0.11,
  paletteEase: 0.056,
  intensityEase: 0.085,
  speedToDisturbance: 1.18,
};

const LOOP_EPSILON = {
  interaction: 0.008,
  disturbance: 0.008,
  row: 0.01,
  pointer: 0.002,
  palette: 0.002,
};

export default function HomeSkillsReveal({
  fallbackImageAlt,
  fallbackImageSrc,
  skills,
}) {
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const canvasRef = useRef(null);
  const rowRefs = useRef([]);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [iconFading, setIconFading] = useState(false);
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    activeIndexRef.current = 0;
    setActiveIndex(0);
    setIconFading(false);
  }, [skills]);

  useEffect(() => {
    const rootEl = rootRef.current;
    const menuEl = menuRef.current;
    const canvasEl = canvasRef.current;

    if (!rootEl || !menuEl || !canvasEl || skills.length === 0) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5 };
    const smoothPointer = { x: 0.5, y: 0.5 };
    const pointerVelocity = { x: 0, y: 0 };
    const disturbance = { current: 0, target: 0 };

    let isInside = false;
    let interactionTarget = 0;
    let interactionValue = 0;
    let targetIndex = activeIndexRef.current;
    let activeFloat = activeIndexRef.current;
    let currentIndex = activeIndexRef.current;
    let isInView = true;
    let isLoopRunning = false;
    let rafId = 0;
    let elapsedTime = 0;
    let previousFrame = 0;
    let iconTimer = null;
    let idleStopTimer = null;
    let observer = null;

    let gl = null;
    let program = null;
    let uniforms = null;

    const targetPalette = skills[currentIndex].palette.map((color) => [...color]);
    const currentPalette = skills[currentIndex].palette.map((color) => [...color]);

    function resizeCanvas() {
      if (!canvasRef.current) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvasRef.current.getBoundingClientRect();
      canvasRef.current.width = Math.floor(bounds.width * dpr);
      canvasRef.current.height = Math.floor(bounds.height * dpr);
    }

    function setPalette(index) {
      const palette = skills[index].palette;

      for (let colorIndex = 0; colorIndex < 3; colorIndex += 1) {
        targetPalette[colorIndex][0] = palette[colorIndex][0];
        targetPalette[colorIndex][1] = palette[colorIndex][1];
        targetPalette[colorIndex][2] = palette[colorIndex][2];
      }
    }

    function updateRows() {
      for (let rowIndex = 0; rowIndex < skills.length; rowIndex += 1) {
        const row = rowRefs.current[rowIndex];
        if (!row) {
          continue;
        }

        const diff = Math.abs(rowIndex - activeFloat);
        const base = clamp(1 - diff * 1.3, 0, 1);
        const eased = base * base * (3 - 2 * base);
        const push = interactionValue * eased * 5.4;
        const tone = 0.72 + eased * 0.28;

        row.style.setProperty("--skill-push", push.toFixed(3));
        row.style.setProperty("--skill-tone", tone.toFixed(3));
      }
    }

    function announceActive(index) {
      activeIndexRef.current = index;
      setIconFading(true);

      if (iconTimer) {
        window.clearTimeout(iconTimer);
      }

      iconTimer = window.setTimeout(() => {
        setActiveIndex(index);
        setIconFading(false);
      }, TIMING.iconSwap);
    }

    function draw(time) {
      if (!gl || !program || !uniforms || !canvasRef.current) {
        return;
      }

      gl.useProgram(program);
      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.uniform1f(uniforms.time, time);
      gl.uniform2f(uniforms.resolution, canvasRef.current.width, canvasRef.current.height);
      gl.uniform2f(uniforms.pointer, smoothPointer.x, smoothPointer.y);
      gl.uniform1f(uniforms.disturbance, disturbance.current);
      gl.uniform1f(uniforms.focus, interactionValue);
      gl.uniform3f(uniforms.colorA, currentPalette[0][0], currentPalette[0][1], currentPalette[0][2]);
      gl.uniform3f(uniforms.colorB, currentPalette[1][0], currentPalette[1][1], currentPalette[1][2]);
      gl.uniform3f(uniforms.colorC, currentPalette[2][0], currentPalette[2][1], currentPalette[2][2]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function renderFrame() {
      updateRows();
      draw(elapsedTime);
    }

    function isPaletteSettled() {
      for (let colorIndex = 0; colorIndex < 3; colorIndex += 1) {
        for (let channelIndex = 0; channelIndex < 3; channelIndex += 1) {
          if (Math.abs(currentPalette[colorIndex][channelIndex] - targetPalette[colorIndex][channelIndex]) > LOOP_EPSILON.palette) {
            return false;
          }
        }
      }

      return true;
    }

    function isPointerSettled() {
      return (
        Math.abs(pointer.x - smoothPointer.x) <= LOOP_EPSILON.pointer &&
        Math.abs(pointer.y - smoothPointer.y) <= LOOP_EPSILON.pointer
      );
    }

    function shouldAnimate() {
      if (!isInView) {
        return false;
      }

      if (prefersReducedMotion) {
        return false;
      }

      return (
        isInside ||
        Math.abs(interactionTarget - interactionValue) > LOOP_EPSILON.interaction ||
        Math.abs(activeFloat - currentIndex) > LOOP_EPSILON.row ||
        disturbance.current > LOOP_EPSILON.disturbance ||
        disturbance.target > LOOP_EPSILON.disturbance ||
        !isPointerSettled() ||
        !isPaletteSettled()
      );
    }

    function stopLoop() {
      if (!isLoopRunning) {
        return;
      }

      window.cancelAnimationFrame(rafId);
      rafId = 0;
      previousFrame = 0;
      isLoopRunning = false;
    }

    function snapToIdleState() {
      idleStopTimer = null;
      interactionValue = 0;
      disturbance.target = 0;
      disturbance.current = 0;
      activeFloat = currentIndex;
      smoothPointer.x = pointer.x;
      smoothPointer.y = pointer.y;

      for (let colorIndex = 0; colorIndex < 3; colorIndex += 1) {
        currentPalette[colorIndex][0] = targetPalette[colorIndex][0];
        currentPalette[colorIndex][1] = targetPalette[colorIndex][1];
        currentPalette[colorIndex][2] = targetPalette[colorIndex][2];
      }

      renderFrame();
      stopLoop();
    }

    function initializeWebGL() {
      try {
        const context = canvasEl.getContext("webgl");
        if (!context) {
          setWebglReady(false);
          return;
        }

        gl = context;
        program = createProgram(context);
        uniforms = {
          time: context.getUniformLocation(program, "u_time"),
          resolution: context.getUniformLocation(program, "u_resolution"),
          pointer: context.getUniformLocation(program, "u_pointer"),
          disturbance: context.getUniformLocation(program, "u_disturbance"),
          focus: context.getUniformLocation(program, "u_focus"),
          colorA: context.getUniformLocation(program, "u_colorA"),
          colorB: context.getUniformLocation(program, "u_colorB"),
          colorC: context.getUniformLocation(program, "u_colorC"),
        };

        const positionBuffer = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
        context.bufferData(
          context.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
          context.STATIC_DRAW
        );

        const positionLocation = context.getAttribLocation(program, "a_position");
        context.enableVertexAttribArray(positionLocation);
        context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);
        setWebglReady(true);
        resizeCanvas();
      } catch {
        setWebglReady(false);
      }
    }

    // 只有正在交互或还在回弹时才继续渲染，避免首页常驻空转。
    function startLoop() {
      if (idleStopTimer) {
        window.clearTimeout(idleStopTimer);
        idleStopTimer = null;
      }

      if (isLoopRunning || !isInView) {
        return;
      }

      isLoopRunning = true;
      previousFrame = 0;
      rafId = window.requestAnimationFrame(loop);
    }

    function onPointerEnter() {
      if (prefersReducedMotion) {
        return;
      }

      isInside = true;
      interactionTarget = 1;
      startLoop();
    }

    function onPointerLeave() {
      if (prefersReducedMotion) {
        return;
      }

      isInside = false;
      interactionTarget = 0;
      disturbance.target = 0;

      if (idleStopTimer) {
        window.clearTimeout(idleStopTimer);
      }

      idleStopTimer = window.setTimeout(() => {
        if (!isInside) {
          snapToIdleState();
        }
      }, TIMING.idleStop);

      startLoop();
    }

    function onPointerMove(event) {
      if (prefersReducedMotion) {
        return;
      }

      const interactionRect = rootEl.getBoundingClientRect();
      pointer.x = clamp((event.clientX - interactionRect.left) / interactionRect.width, 0, 1);
      pointer.y = 1 - clamp((event.clientY - interactionRect.top) / interactionRect.height, 0, 1);

      const menuRect = menuEl.getBoundingClientRect();
      const y = clamp((event.clientY - menuRect.top) / menuRect.height, 0, 0.999);
      targetIndex = y * (skills.length - 1);
      startLoop();
    }

    function onWindowResize() {
      resizeCanvas();
      renderFrame();
    }

    function loop(now) {
      if (!previousFrame) {
        previousFrame = now;
      }

      const delta = Math.min((now - previousFrame) / 1000, 0.04);
      previousFrame = now;
      elapsedTime += delta;

      interactionValue = settleNumber(
        interactionValue + (interactionTarget - interactionValue) * MOTION.focusEase,
        interactionTarget,
        LOOP_EPSILON.interaction
      );

      const rowTarget = isInside ? targetIndex : currentIndex;
      activeFloat = settleNumber(
        activeFloat + (rowTarget - activeFloat) * MOTION.rowEase,
        rowTarget,
        LOOP_EPSILON.row
      );

      const nearest = clamp(Math.round(activeFloat), 0, skills.length - 1);
      if (nearest !== currentIndex && interactionValue > 0.06) {
        currentIndex = nearest;
        setPalette(currentIndex);
        announceActive(currentIndex);
      }

      const dx = pointer.x - smoothPointer.x;
      const dy = pointer.y - smoothPointer.y;
      smoothPointer.x = settleNumber(
        smoothPointer.x + dx * MOTION.pointerEase,
        pointer.x,
        LOOP_EPSILON.pointer
      );
      smoothPointer.y = settleNumber(
        smoothPointer.y + dy * MOTION.pointerEase,
        pointer.y,
        LOOP_EPSILON.pointer
      );
      pointerVelocity.x = dx / Math.max(delta, 0.0001);
      pointerVelocity.y = dy / Math.max(delta, 0.0001);

      const speed = Math.hypot(pointerVelocity.x, pointerVelocity.y);
      disturbance.target = clamp(
        speed * MOTION.speedToDisturbance * interactionValue,
        0,
        1
      );
      disturbance.current = settleNumber(
        disturbance.current + (disturbance.target - disturbance.current) * MOTION.intensityEase,
        disturbance.target,
        LOOP_EPSILON.disturbance
      );

      for (let colorIndex = 0; colorIndex < 3; colorIndex += 1) {
        currentPalette[colorIndex][0] = settleNumber(
          currentPalette[colorIndex][0] +
            (targetPalette[colorIndex][0] - currentPalette[colorIndex][0]) * MOTION.paletteEase,
          targetPalette[colorIndex][0],
          LOOP_EPSILON.palette
        );
        currentPalette[colorIndex][1] = settleNumber(
          currentPalette[colorIndex][1] +
            (targetPalette[colorIndex][1] - currentPalette[colorIndex][1]) * MOTION.paletteEase,
          targetPalette[colorIndex][1],
          LOOP_EPSILON.palette
        );
        currentPalette[colorIndex][2] = settleNumber(
          currentPalette[colorIndex][2] +
            (targetPalette[colorIndex][2] - currentPalette[colorIndex][2]) * MOTION.paletteEase,
          targetPalette[colorIndex][2],
          LOOP_EPSILON.palette
        );
      }

      renderFrame();

      if (shouldAnimate()) {
        rafId = window.requestAnimationFrame(loop);
        return;
      }

      isLoopRunning = false;
      rafId = 0;
      previousFrame = 0;
    }

    initializeWebGL();
    renderFrame();

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInView = entry?.isIntersecting ?? true;
          if (!isInView) {
            snapToIdleState();
            return;
          }

          renderFrame();
          if (shouldAnimate()) {
            startLoop();
          }
        },
        { threshold: 0.05 }
      );

      observer.observe(rootEl);
    }

    rootEl.addEventListener("pointerenter", onPointerEnter);
    rootEl.addEventListener("pointerleave", onPointerLeave);
    rootEl.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onWindowResize);

    return () => {
      if (iconTimer) {
        window.clearTimeout(iconTimer);
      }

      if (idleStopTimer) {
        window.clearTimeout(idleStopTimer);
      }

      rootEl.removeEventListener("pointerenter", onPointerEnter);
      rootEl.removeEventListener("pointerleave", onPointerLeave);
      rootEl.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onWindowResize);
      observer?.disconnect();
      stopLoop();
    };
  }, [skills]);

  if (skills.length === 0) {
    return null;
  }

  const activeSkill = skills[activeIndex] ?? skills[0];
  const ActiveIcon = skillIcons[activeSkill.iconName] || Orbit;

  return (
    <div ref={rootRef} className={styles.skillsLayout}>
      <ul ref={menuRef} className={styles.skillList}>
        {skills.map((skill, index) => {
          const SkillIcon = skillIcons[skill.iconName] || Sparkles;
          const isActive = index === activeIndex;

          return (
            <li
              key={skill.label}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
              className={[
                styles.skillItem,
                styles.skillItemInteractive,
                isActive ? styles.skillItemActive : styles.skillItemMuted,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                className={[
                  styles.skillIconWrap,
                  isActive ? styles.skillIconWrapActive : styles.skillIconWrapMuted,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <SkillIcon
                  aria-hidden="true"
                  className={styles.skillIcon}
                  size={15}
                  strokeWidth={1.9}
                />
              </span>
              <span>{skill.label}</span>
            </li>
          );
        })}
      </ul>

      <div className={styles.skillHighlight}>
        <div className={[styles.skillHighlightFrame, styles.skillHighlightFrameInteractive].join(" ")}>
          {!webglReady ? (
            <Image
              alt={fallbackImageAlt}
              className={styles.skillHighlightImage}
              fill
              sizes="240px"
              src={fallbackImageSrc}
            />
          ) : null}
          <canvas aria-hidden="true" className={styles.skillHighlightCanvas} ref={canvasRef} />
          <div
            className={[
              styles.skillHighlightBadge,
              iconFading ? styles.skillHighlightBadgeFading : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.skillHighlightGlyph}>
              <ActiveIcon
                aria-hidden="true"
                className={styles.skillIcon}
                size={18}
                strokeWidth={1.9}
              />
            </span>
          </div>
        </div>
        <p className={styles.skillHighlightCaption}>{activeSkill.caption}</p>
      </div>
    </div>
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function settleNumber(value, target, epsilon) {
  return Math.abs(value - target) <= epsilon ? target : value;
}
