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

const FAILURE_CACHE = { stale: 900, revalidate: 900, expire: 1800 };

export async function fetchDayForecast(lat, lng, timeZone, date, isToday) {
  "use cache: remote";

  try {
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
    const points = result
      .map((entry) => ({
        minutes: minutesIn(timeZone, entry.uv_time),
        uv: entry.uv,
      }))
      .sort((a, b) => a.minutes - b.minutes);

    cacheLife(isToday ? "hours" : "days");
    return { points };
  } catch (error) {
    console.error(`UV for ${date} kunne ikke hentes:`, error.message);
    cacheLife(FAILURE_CACHE);
    return { error: error.message };
  }
}

export const CDN_CACHE_OK = {
  "CDN-Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
};
const CDN_CACHE_ERROR = { "CDN-Cache-Control": "public, s-maxage=300" };

export function errorResponse(message, details) {
  return Response.json(
    {
      error: message,
      ...(process.env.NODE_ENV === "development" && details && { details }),
    },
    { status: 502, headers: CDN_CACHE_ERROR },
  );
}

export function missingKeyResponse() {
  return Response.json(
    {
      error:
        "OPENUV_API_KEY mangler. Tilføj den i .env.local og genstart serveren.",
    },
    { status: 500 },
  );
}
