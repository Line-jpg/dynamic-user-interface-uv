import Svg from "./Svg";
import styles from "./WeekForecast.module.css";

const TRACK_HEIGHT = 131.945;

const UV_MAX = 8; // fuld søjle svarer til UV 8 (UV 2 = 32.986 px i designet)

const COLUMN_PITCH = 40.725;

const FIRST_CENTER = 30.4;

/** Søjlens farve-klasse efter UV-niveau (UV 2 og derunder deler farve, ligesom 7 og derover). */
function barColor(uv) {
  if (uv <= 2) return styles.barUv2;
  if (uv === 3) return styles.barUv3;
  if (uv === 4) return styles.barUv4;
  if (uv === 5) return styles.barUv5;
  if (uv === 6) return styles.barUv6;
  return styles.barUv7;
}

/** "Ugens højeste UV · Mobil": søjlediagram over ugens højeste UV pr. dag. */
export default function WeekForecast({ city, days, todayIndex = 0 }) {
  const average = days.reduce((sum, d) => sum + d.uv, 0) / days.length;
  const peak = days.reduce((best, d) => (d.uv > best.uv ? d : best), days[0]);
  return (
    <section
      aria-label={`Ugens højeste UV i ${city}`}
      className={styles.weekCard}
    >
      {/* Overskrift */}
      <div className={styles.heading}>
        <p className={styles.subtitle}>
          Højeste UV på dagene i denne uge
        </p>
        <h2 className={styles.cityTitle}>Ugen i {city}</h2>
        <div className={styles.averageBadge}>
          <Svg name="average-outline" />
          <p className={styles.averageLabel}>GNS.</p>
          <p className={styles.averageValue}>
            {average.toLocaleString("da-DK", { maximumFractionDigits: 1, minimumFractionDigits: 1 })}
          </p>
        </div>
      </div>

      {/* Kortet med søjlerne */}
      <div className={styles.chartCard}>
        <ol className={styles.dayList}>
          {days.map((d, i) => {
            const center = FIRST_CENTER + COLUMN_PITCH * i;
            const fill = (Math.min(d.uv, UV_MAX) / UV_MAX) * TRACK_HEIGHT;
            return (
              <li
                key={d.day}
                aria-label={`${d.dayName} ${d.date}.: UV ${d.uv}`}
                className={styles.dayColumn}
                style={{ left: center }}
              >
                <p className={styles.dayName}>{d.day}</p>
                {i === todayIndex && (
                  <span className={styles.todayUnderline} />
                )}
                <p className={styles.dayDate}>
                  {d.date}
                </p>
                <span
                  className={styles.barTrack}
                  style={{ height: TRACK_HEIGHT }}
                />
                <span
                  className={`${styles.bar} ${barColor(d.uv)}`}
                  style={{ top: 53.28 + TRACK_HEIGHT - fill, height: fill }}
                />
                <p className={styles.dayValue}>
                  {d.uv}
                </p>
              </li>
            );
          })}
        </ol>

        <div className={styles.adviceDivider} />

        {/* Råd om solbeskyttelse */}
        <div className={styles.sunBadge}>
          <Svg name="sun-badge" />
        </div>
        <div className={styles.sunIcon}>
          <Svg name="sun-icon" />
        </div>
        <div className={styles.adviceText}>
          <p>
            {peak.dayName} får ugens højeste UV: <b>{peak.uv}</b>
          </p>
          <p>
            Brug solbeskyttelse, når UV er <b>over 3</b>.
          </p>
        </div>
      </div>
    </section>
  );
}
