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
