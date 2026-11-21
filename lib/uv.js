// Fælles hjælpefunktioner til UV-data. Bruges både på serveren og i browseren.

/** WHO's UV-skala, oversat til appens risikotekster. */
export function uvLevel(uv) {
  if (uv < 3) return "Lav";
  if (uv < 6) return "Moderat";
  if (uv < 8) return "Høj";
  if (uv < 11) return "Meget høj";
  return "Ekstrem";
}

/**
 * UV-indekset på et bestemt tidspunkt (minutter efter midnat), beregnet ud fra prognosens målepunkter.
 * Mellem to punkter glider værdien jævnt. Før solopgang og efter solnedgang er UV 0.
 */
export function uvAtMinutes(points, minutes) {
  if (!points?.length) return null;
  if (minutes <= points[0].minutes || minutes >= points[points.length - 1].minutes) {
    const edge = minutes <= points[0].minutes ? points[0] : points[points.length - 1];
    return edge.minutes === minutes ? edge.uv : 0;
  }

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (minutes >= a.minutes && minutes <= b.minutes) {
      const t = (minutes - a.minutes) / (b.minutes - a.minutes);
      return a.uv + (b.uv - a.uv) * t;
    }
  }
  return 0;
}

/** Kort råd til hvert risikoniveau (passer i "Info om risiko"-kassen). */
const ADVICE = {
  Lav: "Solbriller er ofte nok som beskyttelse",
  Moderat: "Søg skygge midt på dagen og brug solcreme",
  Høj: "Søg skygge og brug solcreme med SPF 50",
  "Meget høj": "Undgå direkte sol og brug SPF 50+",
  Ekstrem: "Undgå solen og bliv indendørs",
};

export function uvAdvice(level) {
  return ADVICE[level];
}

/** Minutter efter midnat som "TT:MM". */
export function formatMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Klokkeslættet lige nu i en given tidszone, som minutter efter midnat. */
export function nowInMinutes(timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get("hour") * 60 + get("minute");
}
