"use client";

import { setReducedMotion, useReducedMotion } from "@/lib/reducedMotion";
import SettingsCard from "./SettingsCard";

/** Indstillingskortet "Reduced motion". Kontakten viser og ændrer den gemte indstilling for hele appen. */
export default function ReducedMotionSetting({ className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <SettingsCard
      title="Reduceret bevægelse"
      settings={[
        {
          label: "Reducér animationer og bevægelse i hele appen.",
          checked: reducedMotion,
          onChange: setReducedMotion,
        },
      ]}
      // Samme luft under teksten som "Lokation"-kortet (141 px til én linje; her to linjer)
      height={157}
      className={className}
    />
  );
}
