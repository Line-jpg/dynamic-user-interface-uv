"use client";

import { useEffect, useState } from "react";
import { useUv } from "./UvContext";
import { formatMinutes, nowInMinutes, uvAdvice, uvAtMinutes, uvLevel } from "@/lib/uv";
import Clock from "./Clock";
import HighestUvBox from "./HighestUvBox";
import RiskInformationBox from "./RiskInformationBox";
import shared from "@/styles/shared.module.css";
import styles from "./TodayUv.module.css";

/**
 * Henter dagens UV-prognose fra /api/uv én gang og deler den mellem uret og de to kasser under det.
 * - "Højeste UV i dag" viser dagens maksimum fra prognosen.
 * - "Info om risiko" følger det tidspunkt, uret står på.
 * - UV-værdien på urets tidspunkt deles via UvContext, så baggrunden kan skifte farve.
 */
export default function TodayUv() {
  const [uvData, setUvData] = useState(null);
  const [uvError, setUvError] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/uv")
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Kunne ikke hente UV-data.");
        return body;
      })
      .then((data) => {
        if (!cancelled) setUvData({ ...data, loadedAtMinutes: nowInMinutes(data.timeZone) });
      })
      .catch((error) => {
        if (!cancelled) setUvError(error.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Dagens højeste UV (afrundet, som WHO's skala bruger det)
  const maxUv = uvData ? Math.round(uvData.max.uv) : null;

  // UV på det tidspunkt, uret står på (præcis værdi til baggrunden, afrundet til teksterne)
  const exactUv = uvData ? uvAtMinutes(uvData.points, selectedMinutes) : null;
  const selectedUv = exactUv === null ? null : Math.round(exactUv);

  const { setUv } = useUv();
  useEffect(() => {
    setUv(exactUv);
  }, [exactUv, setUv]);
  const selectedLevel = selectedUv === null ? null : uvLevel(selectedUv);

  const placeholder = uvError ? "Ingen data" : "Henter…";

  return (
    <>
      {/* clock-box med det interaktive ur centreret */}
      <div className={`${shared.glassPanel} ${styles.clockPanel}`}>
        {/* Uret startes forfra på klokken "nu", når data er hentet */}
        <Clock
          key={uvData ? "loaded" : "loading"}
          uvData={uvData}
          uvError={uvError}
          initialMinutes={uvData?.loadedAtMinutes ?? 0}
          onMinutesChange={setSelectedMinutes}
        />
      </div>

      <div className={styles.infoBoxes}>
        <HighestUvBox
          uv={maxUv ?? "–"}
          level={maxUv === null ? "" : uvLevel(maxUv).toUpperCase()}
          peakTime={uvData ? formatMinutes(uvData.max.minutes) : "–"}
        />
        <RiskInformationBox
          advice={selectedLevel ? uvAdvice(selectedLevel) : placeholder}
          risk={selectedLevel ? `${selectedLevel} Risiko` : placeholder}
          className={styles.riskBox}
        />
      </div>
    </>
  );
}
