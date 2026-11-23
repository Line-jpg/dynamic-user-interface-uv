"use client";

import { useState } from "react";
import Svg from "./Svg";
import styles from "./Toggle.module.css";

/**
 * "Component 3" fra Figma: gul kontakt med hvid knap. Knappen står til venstre, når kontakten er slået fra.
 * Uden `checked` husker kontakten selv sin tilstand. Med `checked` og `onChange` styres den udefra
 * (fx af en gemt indstilling).
 */
export default function Toggle({ label, defaultOn = false, checked, onChange }) {
  const [internalOn, setInternalOn] = useState(defaultOn);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internalOn;

  const toggle = () => {
    if (isControlled) onChange?.(!on);
    else setInternalOn(!on);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={toggle}
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
