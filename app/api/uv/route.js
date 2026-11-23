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

// Dagens UV-prognose time for time (bruges af uret og kasserne på forsiden).

export async function GET() {
  // Ruten skal køre ved hver forespørgsel (ikke ved build), fordi "i dag" ændrer sig.
  await connection();

  if (!hasApiKey()) return missingKeyResponse();

  const { name, lat, lng, timeZone } = LOCATION;
  const date = todayIn(timeZone);
  const { points, error } = await fetchDayForecast(lat, lng, timeZone, date, true);
  if (error) return errorResponse("Kunne ikke hente UV-data fra OpenUV.", error);

  const max = points.reduce((best, p) => (p.uv > best.uv ? p : best), { uv: 0, minutes: 0 });
  return Response.json({ location: name, timeZone, date, points, max }, { headers: CDN_CACHE_OK });
}
