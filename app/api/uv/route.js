import { cacheLife } from "next/cache";
import { connection } from "next/server";

// Henter dagens UV-prognose fra OpenUV.
// API-nøglen læses fra .env.local og bruges KUN her på serveren. Den sendes aldrig til browseren.

const LOCATION = { name: "Aarhus", lat: 56.1629, lng: 10.2039 };
const TIME_ZONE = "Europe/Copenhagen";

/** Dagens dato (ÅÅÅÅ-MM-DD) i dansk tid. */
function todayInDenmark() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(new Date());
}

/** Minutter efter midnat i dansk tid for et ISO-tidspunkt. */
function minutesInDenmark(iso) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get("hour") * 60 + get("minute");
}

/**
 * Kalder OpenUV. Svaret caches i en time pr. dato, så appen bruger højst ca. 24 kald om dagen
 * af gratisplanens daglige kvote, uanset hvor mange der åbner siden.
 */
async function fetchForecast(date) {
  "use cache";
  cacheLife("hours");

  const url = new URL("https://api.openuv.io/api/v1/forecast");
  url.searchParams.set("lat", LOCATION.lat);
  url.searchParams.set("lng", LOCATION.lng);
  url.searchParams.set("dt", `${date}T12:00:00.000Z`);

  const res = await fetch(url, {
    headers: { "x-access-token": process.env.OPENUV_API_KEY },
  });
  if (!res.ok) {
    throw new Error(`OpenUV svarede ${res.status}: ${await res.text()}`);
  }

  const { result } = await res.json();
  return result.map((entry) => ({ minutes: minutesInDenmark(entry.uv_time), uv: entry.uv }));
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

  const date = todayInDenmark();
  try {
    const points = (await fetchForecast(date)).sort((a, b) => a.minutes - b.minutes);
    const max = points.reduce((best, p) => (p.uv > best.uv ? p : best), { uv: 0, minutes: 0 });
    return Response.json({ location: LOCATION.name, date, points, max });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Kunne ikke hente UV-data fra OpenUV." }, { status: 502 });
  }
}
