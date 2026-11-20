"use client";

import { useState } from "react";
import Svg from "./Svg";

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
      className="relative h-[23px] w-[46px] shrink-0 cursor-pointer"
    >
      <span
        className={`absolute inset-0 rounded-[50px] bg-uv-yellow transition-opacity ${on ? "opacity-100" : "opacity-30"}`}
      />
      <span
        className={`absolute top-[8.7%] bottom-[8.7%] w-[41.3%] transition-[left] duration-200 ${on ? "left-1/2" : "left-[8.7%]"}`}
      >
        <Svg name="toggle-knob" />
      </span>
    </button>
  );
}
