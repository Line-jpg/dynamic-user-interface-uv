"use client";

import { useEffect, useState } from "react";
import WeekForecast from "./WeekForecast";

const SHORT_DAY_NAMES = ["SØN", "MAN", "TIR", "ONS", "TOR", "FRE", "LØR"];
const DAY_NAMES = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

const PLACEHOLDER_WEEK = [1, 2, 3, 4, 5, 6, 0].map((weekday) => ({
  day: SHORT_DAY_NAMES[weekday],
  dayName: DAY_NAMES[weekday],
  date: null,
  uv: null,
}));

/** Gør en dag fra /api/uv/week ({ date: "ÅÅÅÅ-MM-DD", uv }) klar til ugegrafen. */
function toForecastDay({ date, uv }) {
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  return {
    day: SHORT_DAY_NAMES[weekday],
    dayName: DAY_NAMES[weekday],
    date: Number(date.slice(8, 10)),
    uv,
  };
}

/**
 * Henter ugens højeste UV pr. dag fra /api/uv/week (OpenUV) og viser den i WeekForecast.
 * Mens data hentes, eller hvis det fejler, vises kortet uden søjler og med en forklarende tekst.
 */
export default function WeekUv() {
  const [week, setWeek] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/uv/week")
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Kunne ikke hente ugens UV-data.");
        return body;
      })
      .then((data) => {
        if (cancelled) return;
        setWeek(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Uden data (henter eller fejl) vises ugens 7 dage uden søjler, så kortets layout bevares.
  const days = week ? week.days.map(toForecastDay) : PLACEHOLDER_WEEK;
  const todayIndex = week ? week.days.findIndex((d) => d.date === week.today) : -1;

  return <WeekForecast city={week?.location ?? "…"} days={days} todayIndex={todayIndex} status={status} />;
}
