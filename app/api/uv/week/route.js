import { connection } from "next/server";
import {
  CDN_CACHE_OK,
  LOCATION,
  errorResponse,
  fetchDayForecast,
  hasApiKey,
  missingKeyResponse,
  todayIn,
} from "@/lib/openuv";

// Højeste UV pr. dag i den aktuelle uge (mandag–søndag i byens lokaltid), til ugegrafen.
//
// OpenUV har ingen færdig ugeprognose. /forecast giver time-for-time-UV for én dato ad gangen,
// så ruten henter hver dag for sig og bruger dagens højeste værdi.
// Kan en dag ikke hentes, eller er der ingen data, sendes uv: null for den dag. Der gættes aldrig.

/** Ugens 7 datoer (ÅÅÅÅ-MM-DD) fra mandag til søndag, ud fra dagens dato. */
function weekDates(today) {
  const date = new Date(`${today}T12:00:00Z`);
  const mondayOffset = (date.getUTCDay() + 6) % 7; // mandag = 0
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(date);
    d.setUTCDate(date.getUTCDate() - mondayOffset + i);
    return d.toISOString().slice(0, 10);
  });
}

export async function GET() {
  await connection();

  if (!hasApiKey()) return missingKeyResponse();

  const { name, lat, lng, timeZone } = LOCATION;
  const today = todayIn(timeZone);
  const dates = weekDates(today);

  // Alle dage hentes samtidig. Hver dag caches for sig, også fejl (se lib/openuv.js).
  const results = await Promise.all(
    dates.map((date) => fetchDayForecast(lat, lng, timeZone, date, date === today)),
  );

  const days = dates.map((date, i) => {
    const { points, error } = results[i];
    if (error || !points.length) return { date, uv: null };
    return { date, uv: Math.max(...points.map((p) => p.uv)) };
  });

  if (days.every((d) => d.uv === null)) {
    return errorResponse("Kunne ikke hente ugens UV-data fra OpenUV.", results.find((r) => r.error)?.error);
  }

  return Response.json({ location: name, timeZone, today, days }, { headers: CDN_CACHE_OK });
}
