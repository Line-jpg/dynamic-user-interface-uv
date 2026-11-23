import { cacheLife } from "next/cache";

// Fælles kode til OpenUV. Bruges KUN på serveren (af ruterne i app/api/uv).
// API-nøglen læses fra .env.local og sendes aldrig til browseren.

const LOCATIONS = {
  aarhus: {
    name: "Aarhus",
    lat: 56.1629,
    lng: 10.2039,
    timeZone: "Europe/Copenhagen",
  },
  cairo: {
    name: "Cairo",
    lat: 30.0444,
    lng: 31.2357,
    timeZone: "Africa/Cairo",
  },
  capetown: {
    name: "Cape Town",
    lat: -33.9249,
    lng: 18.4241,
    timeZone: "Africa/Johannesburg",
  },
};

// Skift by her. Tidszonen følger med, så uret og ugen følger byens egen lokaltid.
export const LOCATION = LOCATIONS.capetown; // Aarhus, Cairo, Cape Town

export function hasApiKey() {
  return Boolean(process.env.OPENUV_API_KEY);
}

/** Dagens dato (ÅÅÅÅ-MM-DD) i byens lokaltid. */
export function todayIn(timeZone) {
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
 * Henter OpenUV's time-for-time-prognose for én dato og returnerer [{ minutes, uv }] sorteret efter tid.
 *
 * Caching (gratisplanen giver 50 kald pr. døgn):
 * - I dag: genhentes højst én gang i timen (deles af uret og ugegrafen).
 * - Andre dage: genhentes højst én gang i døgnet.
 * I alt ca. 24 + 6 = 30 kald pr. døgn, uanset hvor mange der åbner appen.
 */
export async function fetchDayForecast(lat, lng, timeZone, date, isToday) {
  // "remote": på Vercel deles cachen mellem alle serverinstanser (Runtime Cache),
  // så kvoten ikke bliver brugt op af nye instanser. Lokalt virker den som almindelig "use cache".
  "use cache: remote";
  cacheLife(isToday ? "hours" : "days");

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
  return result
    .map((entry) => ({ minutes: minutesIn(timeZone, entry.uv_time), uv: entry.uv }))
    .sort((a, b) => a.minutes - b.minutes);
}

/** Fejlsvar til browseren. Under udvikling vises OpenUV's egen fejlbesked (aldrig nøglen). */
export function errorResponse(error) {
  console.error(error);
  return Response.json(
    {
      error: "Kunne ikke hente UV-data fra OpenUV.",
      ...(process.env.NODE_ENV === "development" && { details: error.message }),
    },
    { status: 502 },
  );
}

export function missingKeyResponse() {
  return Response.json(
    { error: "OPENUV_API_KEY mangler. Tilføj den i .env.local og genstart serveren." },
    { status: 500 },
  );
}
