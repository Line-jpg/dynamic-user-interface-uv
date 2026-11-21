import { cacheLife } from "next/cache";
import { connection } from "next/server";

// Henter dagens UV-prognose fra OpenUV.
// API-nøglen læses fra .env.local og bruges KUN her på serveren. Den sendes aldrig til browseren.

const LOCATIONS = {
  aarhus: { name: "Aarhus", lat: 56.1629, lng: 10.2039, timeZone: "Europe/Copenhagen" },
  cairo: { name: "Cairo", lat: 30.0444, lng: 31.2357, timeZone: "Africa/Cairo" },
};

// Skift by her. Tidszonen følger med, så uret viser byens egen lokaltid.
const LOCATION = LOCATIONS.cairo;

/** Dagens dato (ÅÅÅÅ-MM-DD) i byens lokaltid. */
function todayIn(timeZone) {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

/** Minutter efter midnat i byens lokaltid for et ISO-tidspunkt. */
function minutesIn(timeZone, iso) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get("hour") * 60 + get("minute");
}

/**
 * Kalder OpenUV. Svaret caches i en time pr. by og dato, så appen bruger højst ca. 24 af
 * gratisplanens 50 daglige kald, uanset hvor mange der åbner siden.
 */
async function fetchForecast(lat, lng, timeZone, date) {
  "use cache";
  cacheLife("hours");

  const url = new URL("https://api.openuv.io/api/v1/forecast");
  url.searchParams.set("lat", lat);
  url.searchParams.set("lng", lng);
  url.searchParams.set("dt", `${date}T12:00:00.000Z`);

  const res = await fetch(url, {
    headers: { "x-access-token": process.env.OPENUV_API_KEY },
  });
  if (!res.ok) {
    throw new Error(`OpenUV svarede ${res.status}: ${await res.text()}`);
  }

  const { result } = await res.json();
  return result.map((entry) => ({ minutes: minutesIn(timeZone, entry.uv_time), uv: entry.uv }));
}

export async function GET() {
  // Ruten skal køre ved hver forespørgsel (ikke ved build), fordi "i dag" ændrer sig.
  await connection();

  if (!process.env.OPENUV_API_KEY) {
    return Response.json(
      { error: "OPENUV_API_KEY mangler. Tilføj den i .env.local og genstart serveren." },
      { status: 500 },
    );
  }

  const { name, lat, lng, timeZone } = LOCATION;
  const date = todayIn(timeZone);
  try {
    const points = (await fetchForecast(lat, lng, timeZone, date)).sort((a, b) => a.minutes - b.minutes);
    const max = points.reduce((best, p) => (p.uv > best.uv ? p : best), { uv: 0, minutes: 0 });
    return Response.json({ location: name, timeZone, date, points, max });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Kunne ikke hente UV-data fra OpenUV.",
        // Under udvikling vises OpenUV's egen fejlbesked (aldrig nøglen) for at gøre fejlfinding nemmere.
        ...(process.env.NODE_ENV === "development" && { details: error.message }),
      },
      { status: 502 },
    );
  }
}
