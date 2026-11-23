import { connection } from "next/server";
import { LOCATION, errorResponse, fetchDayForecast, hasApiKey, missingKeyResponse, todayIn } from "@/lib/openuv";

// Dagens UV-prognose time for time (bruges af uret og kasserne på forsiden).

export async function GET() {
  // Ruten skal køre ved hver forespørgsel (ikke ved build), fordi "i dag" ændrer sig.
  await connection();

  if (!hasApiKey()) return missingKeyResponse();

  const { name, lat, lng, timeZone } = LOCATION;
  const date = todayIn(timeZone);
  try {
    const points = await fetchDayForecast(lat, lng, timeZone, date, true);
    const max = points.reduce((best, p) => (p.uv > best.uv ? p : best), { uv: 0, minutes: 0 });
    return Response.json({ location: name, timeZone, date, points, max });
  } catch (error) {
    return errorResponse(error);
  }
}
