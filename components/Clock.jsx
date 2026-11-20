"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Clock.module.css";

// Interaktivt 24-timers ur fra Figma ("Loop Clock Every 24 Hours").
// Træk håndtaget rundt for at vælge et tidspunkt. To omgange = et døgn.

const VIEW_WIDTH = 349;
const VIEW_HEIGHT = 369;
const CENTER_X = VIEW_WIDTH / 2;
const CENTER_Y = VIEW_HEIGHT / 2;
const HANDLE_RADIUS = 103;
const OUTER_TICK_RADIUS = 153;
const TICK_COUNT = 60;
const FULL_DAY_ANGLE = Math.PI * 4;
const MINUTES_PER_DAY = 24 * 60;

// Afrunder til 3 decimaler, så serveren og browseren tegner præcis de samme tal (undgår hydrerings-fejl).
const round = (value) => Math.round(value * 1000) / 1000;

function pointOnCircle(angle, radius) {
  return {
    x: round(CENTER_X + Math.sin(angle) * radius),
    y: round(CENTER_Y - Math.cos(angle) * radius),
  };
}

function baseTickLength(index) {
  if (index % 15 === 0) return 56;
  if (index % 5 === 0) return 44;

  // Designet bruger let varierende stregelængder i stedet for et stift mønster.
  return 24 + ((Math.sin(index * 2.17) + 1) / 2) * 12;
}

function wrapDayAngle(angle) {
  return ((angle % FULL_DAY_ANGLE) + FULL_DAY_ANGLE) % FULL_DAY_ANGLE;
}

function minutesFromAngle(angle) {
  return Math.min(Math.round((angle / FULL_DAY_ANGLE) * MINUTES_PER_DAY), MINUTES_PER_DAY - 1);
}

function formatTime(angle) {
  const totalMinutes = minutesFromAngle(angle);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export default function Clock() {
  const svgRef = useRef(null);
  const frameRef = useRef(null);
  const strengthRef = useRef(0);
  const targetStrengthRef = useRef(0);
  const totalAngleRef = useRef(0);
  const previousPointerAngleRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [waveStrength, setWaveStrength] = useState(0);
  const [waveOrigin, setWaveOrigin] = useState(() => pointOnCircle(0, HANDLE_RADIUS));

  const handle = useMemo(() => pointOnCircle(angle % (Math.PI * 2), HANDLE_RADIUS), [angle]);

  // Bølgen i stregerne glider blødt mod sin målstyrke, én frame ad gangen.
  const animateWave = useCallback(() => {
    const step = () => {
      const difference = targetStrengthRef.current - strengthRef.current;
      strengthRef.current += difference * 0.18;

      if (Math.abs(difference) < 0.002) {
        strengthRef.current = targetStrengthRef.current;
        setWaveStrength(strengthRef.current);
        frameRef.current = null;
        return;
      }

      setWaveStrength(strengthRef.current);
      frameRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  const setWaveTarget = useCallback(
    (target) => {
      targetStrengthRef.current = target;
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(animateWave);
      }
    },
    [animateWave],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const updateFromPointer = useCallback((clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return;

    const bounds = svg.getBoundingClientRect();
    const x = ((clientX - bounds.left) / bounds.width) * VIEW_WIDTH;
    const y = ((clientY - bounds.top) / bounds.height) * VIEW_HEIGHT;
    const rawAngle = Math.atan2(x - CENTER_X, CENTER_Y - y);
    const pointerAngle = rawAngle < 0 ? rawAngle + Math.PI * 2 : rawAngle;

    setWaveOrigin({ x, y });

    if (previousPointerAngleRef.current === null) {
      previousPointerAngleRef.current = pointerAngle;
      return;
    }

    let delta = pointerAngle - previousPointerAngleRef.current;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;

    const nextAngle = wrapDayAngle(totalAngleRef.current + delta);
    totalAngleRef.current = nextAngle;
    previousPointerAngleRef.current = pointerAngle;
    setAngle(nextAngle);
  }, []);

  const beginDrag = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    previousPointerAngleRef.current = null;
    setIsDragging(true);
    setWaveTarget(1);
    updateFromPointer(event.clientX, event.clientY);
  };

  const moveDrag = (event) => {
    if (!isDragging) return;
    updateFromPointer(event.clientX, event.clientY);
  };

  const endDrag = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    previousPointerAngleRef.current = null;
    setIsDragging(false);
    setWaveTarget(0);
  };

  const adjustTime = (minutes) => {
    const step = (minutes / MINUTES_PER_DAY) * FULL_DAY_ANGLE;
    const next = wrapDayAngle(totalAngleRef.current + step);
    totalAngleRef.current = next;
    setAngle(next);
    setWaveOrigin(pointOnCircle(next % (Math.PI * 2), HANDLE_RADIUS));
    setWaveTarget(0.7);
    window.setTimeout(() => setWaveTarget(0), 180);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      adjustTime(event.shiftKey ? 60 : 5);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      adjustTime(event.shiftKey ? -60 : -5);
    }
    if (event.key === "Home") {
      event.preventDefault();
      totalAngleRef.current = 0;
      setAngle(0);
      setWaveOrigin(pointOnCircle(0, HANDLE_RADIUS));
    }
  };

  const ticks = useMemo(
    () =>
      Array.from({ length: TICK_COUNT }, (_, index) => {
        const tickAngle = (index / TICK_COUNT) * Math.PI * 2;
        const baseLength = baseTickLength(index);
        const innerRadius = OUTER_TICK_RADIUS - baseLength;
        const inner = pointOnCircle(tickAngle, innerRadius);
        const baseMidpoint = pointOnCircle(tickAngle, innerRadius + baseLength / 2);
        const distance = Math.hypot(baseMidpoint.x - waveOrigin.x, baseMidpoint.y - waveOrigin.y);
        const normalizedDistance = Math.min(distance / 105, 1);
        const falloff = Math.pow(1 - normalizedDistance, 2) * (3 - 2 * (1 - normalizedDistance));
        const length = baseLength + falloff * 36 * waveStrength;
        const outer = pointOnCircle(tickAngle, innerRadius + length);

        return {
          index,
          inner,
          outer,
          width: index % 15 === 0 ? 3 : index % 5 === 0 ? 2 : 1.15,
        };
      }),
    [waveOrigin.x, waveOrigin.y, waveStrength],
  );

  return (
    <section className={styles.clock} aria-label="Interaktivt 24-timers ur">
      <svg
        ref={svgRef}
        className={styles.face}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        role="group"
        aria-label={`Valgt tidspunkt ${formatTime(angle)}`}
      >
        <g aria-hidden="true">
          {ticks.map((tick) => (
            <line
              key={tick.index}
              className={styles.tick}
              x1={tick.inner.x}
              y1={tick.inner.y}
              x2={tick.outer.x}
              y2={tick.outer.y}
              strokeWidth={tick.width}
            />
          ))}
        </g>

        <g className={styles.numbers} aria-hidden="true">
          <text x={CENTER_X} y="23" textAnchor="middle">
            12
          </text>
          <text x="342" y={CENTER_Y + 8} textAnchor="middle">
            3
          </text>
          <text x={CENTER_X} y="364" textAnchor="middle">
            6
          </text>
          <text x="7" y={CENTER_Y + 8} textAnchor="middle">
            9
          </text>
        </g>

        <g className={styles.data} aria-hidden="true">
          <text className={styles.small} x={CENTER_X} y="118" textAnchor="middle">
            UV-INDEKS
          </text>
          <text className={styles.value} x={CENTER_X} y="193" textAnchor="middle">
            4
          </text>
          <text className={styles.small} x={CENTER_X} y="220" textAnchor="middle">
            Moderat Risiko
          </text>
          <rect x="152.5" y="229.5" width="44.5" height="27" rx="9.7" />
          <text className={styles.small} x={CENTER_X} y="247" textAnchor="middle">
            {formatTime(angle)}
          </text>
        </g>

        <circle
          className={`${styles.handle} ${isDragging ? styles.handleDragging : ""}`}
          cx={handle.x}
          cy={handle.y}
          r="9"
          tabIndex={0}
          role="slider"
          aria-label="Valgt tidspunkt"
          aria-valuemin={0}
          aria-valuemax={MINUTES_PER_DAY - 1}
          aria-valuenow={minutesFromAngle(angle)}
          aria-valuetext={formatTime(angle)}
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        />
      </svg>
    </section>
  );
}
