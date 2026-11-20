import Svg from "./Svg";

const TRACK_HEIGHT = 131.945;

const UV_MAX = 8; // fuld søjle svarer til UV 8 (UV 2 = 32.986 px i designet)

const COLUMN_PITCH = 40.725;

const FIRST_CENTER = 30.4;

function barColor(uv) {
  if (uv <= 2) return "bg-chart-2";
  if (uv === 3) return "bg-chart-3";
  if (uv === 4) return "bg-chart-4";
  if (uv === 5) return "bg-chart-5";
  if (uv === 6) return "bg-chart-6";
  return "bg-chart-7";
}

/** "Ugens højeste UV · Mobil": søjlediagram over ugens højeste UV pr. dag. */
export default function WeekForecast({ city, days, todayIndex = 0 }) {
  const average = days.reduce((sum, d) => sum + d.uv, 0) / days.length;
  const peak = days.reduce((best, d) => (d.uv > best.uv ? d : best), days[0]);
  return (
    <section
      aria-label={`Ugens højeste UV i ${city}`}
      className="relative h-[460px] rounded-[24px] bg-paper text-text-primary"
    >
      {/* Overskrift */}
      <div className="absolute left-[9.3px] right-[15.65px] top-[22.84px] h-[62.589px]">
        <p className="absolute left-0 top-[14.38px] text-[9.05px] leading-normal opacity-63">
          Højeste UV på dagene i denne uge
        </p>
        <h2 className="absolute left-0 top-[32.14px] text-[24.951px] font-normal leading-normal">Ugen i {city}</h2>
        <div className="absolute left-[246.13px] top-0 size-[60.898px]">
          <Svg name="average-outline" />
          <p className="absolute inset-x-0 top-[10.15px] text-center text-[7.612px] leading-normal opacity-70">GNS.</p>
          <p className="absolute inset-x-0 top-[24.53px] text-center text-[19.453px] leading-normal">
            {average.toLocaleString("da-DK", { maximumFractionDigits: 1, minimumFractionDigits: 1 })}
          </p>
        </div>
      </div>

      {/* Kortet med søjlerne */}
      <div className="absolute left-[12.69px] right-[12.26px] top-[112.79px] h-[328.171px] overflow-clip rounded-[33.832px] border-[0.846px] border-border-subtle bg-surface-card">
        <ol className="contents">
          {days.map((d, i) => {
            const center = FIRST_CENTER + COLUMN_PITCH * i;
            const fill = (Math.min(d.uv, UV_MAX) / UV_MAX) * TRACK_HEIGHT;
            return (
              <li
                key={d.day}
                aria-label={`${d.dayName} ${d.date}.: UV ${d.uv}`}
                className="absolute top-0 h-full w-[32.14px] -translate-x-1/2"
                style={{ left: center }}
              >
                <p className="absolute inset-x-0 top-[21.44px] text-center text-[9.05px] leading-normal">{d.day}</p>
                {i === todayIndex && (
                  <span className="absolute left-1/2 top-[33.71px] h-[0.846px] w-[21.991px] -translate-x-1/2 bg-text-primary" />
                )}
                <p className="absolute inset-x-0 top-[34.98px] text-center text-[9.304px] leading-normal opacity-55">
                  {d.date}
                </p>
                <span
                  className="absolute left-1/2 top-[53.28px] w-[17.762px] -translate-x-1/2 rounded-[8.881px] bg-paper opacity-85"
                  style={{ height: TRACK_HEIGHT }}
                />
                <span
                  className={`absolute left-1/2 w-[17.762px] -translate-x-1/2 rounded-[8.881px] ${barColor(d.uv)}`}
                  style={{ top: 53.28 + TRACK_HEIGHT - fill, height: fill }}
                />
                <p className="absolute inset-x-0 top-[191.57px] text-center text-[12.687px] leading-normal opacity-72">
                  {d.uv}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="absolute left-[-0.85px] top-[246.55px] h-[0.846px] w-[307px] bg-border-subtle" />

        {/* Råd om solbeskyttelse */}
        <div className="absolute left-[20.72px] top-[268.8px] size-[37.215px]">
          <Svg name="sun-badge" />
        </div>
        <div className="absolute left-[30.87px] top-[278.95px] size-[16.916px]">
          <Svg name="sun-icon" />
        </div>
        <div className="absolute left-[71.89px] top-[272.6px] w-[223.292px] text-[10.319px] leading-normal">
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
