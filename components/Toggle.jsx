"use client";

import { useState } from "react";
import Svg from "./Svg";
import styles from "./Toggle.module.css";

/** "Component 3" fra Figma: gul kontakt med hvid knap. Knappen står til venstre, når kontakten er slået fra. */
export default function Toggle({ label, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((v) => !v)}
      className={styles.toggle}
    >
      <span
        className={`${styles.track} ${on ? styles.trackOn : ""}`}
      />
      <span
        className={`${styles.knob} ${on ? styles.knobOn : ""}`}
      >
        <Svg name="toggle-knob" />
      </span>
    </button>
  );
}
