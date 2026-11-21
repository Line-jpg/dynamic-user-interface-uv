"use client";

import { useId } from "react";
import { useUv } from "./UvContext";
import styles from "./ReactiveGradient.module.css";

// Farver pr. UV-niveau (fra skillen "reactive-gradient-background"). Værdier imellem blandes.
const UV_ANCHORS = [
  { at: 1, c: ["#86EFAC", "#D9F99D", "#4ADE80", "#BBF7D0"] }, // Lav – mint
  { at: 2, c: ["#4ADE80", "#A3E635", "#22C55E", "#BEF264"] }, // Lav – grøn
  { at: 3, c: ["#FB923C", "#FACC15", "#FDBA74", "#FDE047"] }, // Moderat – solopgang
  { at: 6, c: ["#F97316", "#F59E0B", "#EA580C", "#FBBF24"] }, // Høj – dyb orange
  { at: 8, c: ["#EF4444", "#F97316", "#DC2626", "#FB923C"] }, // Meget høj – rødorange
  { at: 11, c: ["#DB2777", "#E11D48", "#A21CAF", "#F43F5E"] }, // Ekstrem – magenta
];

// Den langsomste klat bevæger sig 22 s pr. vej; de andre lidt hurtigere/langsommere, så de ikke går i takt.
const SPEED = 22;
const SPEED_FACTORS = [1, 1.3, 0.85, 1.15];
const GRAIN = 0.12;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) =>
  "#" +
  hex(a)
    .map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, "0"))
    .join("");

function colorsFor(value) {
  let i = 0;
  while (i < UV_ANCHORS.length - 2 && value > UV_ANCHORS[i + 1].at) i++;
  const lo = UV_ANCHORS[i];
  const hi = UV_ANCHORS[i + 1];
  const t = Math.min(1, Math.max(0, (value - lo.at) / (hi.at - lo.at)));
  return lo.c.map((color, k) => mix(color, hi.c[k], t));
}

/**
 * Levende baggrund, hvis farver følger UV-indekset på det tidspunkt, uret står på.
 * Indtil data er hentet, vises "Moderat"-farverne (UV 3).
 */
export default function ReactiveGradient({ fallback = 3 }) {
  const { uv } = useUv();
  const noiseId = useId();
  const colors = colorsFor(uv ?? fallback);

  return (
    <div className={styles.root} aria-hidden="true">
      {colors.map((color, k) => (
        <div
          key={k}
          className={styles.blob}
          style={{ backgroundColor: color, animationDuration: `${Math.round(SPEED * SPEED_FACTORS[k])}s` }}
        />
      ))}
      <svg className={styles.grain} style={{ opacity: GRAIN }}>
        <filter id={noiseId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>
    </div>
  );
}
