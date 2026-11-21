import Navbar from "@/components/Navbar";
import ReactiveGradient from "@/components/ReactiveGradient";
import Screen from "@/components/Screen";
import SunLogo from "@/components/SunLogo";
import TodayUv from "@/components/TodayUv";
import { UvProvider } from "@/components/UvContext";
import WeekForecast from "@/components/WeekForecast";
import styles from "./page.module.css";

// Eksempeldata til ugegrafen. Udskift med data fra jeres UV-API.
const week = [
  { day: "MAN", dayName: "Mandag", date: 12, uv: 2 },
  { day: "TIR", dayName: "Tirsdag", date: 13, uv: 4 },
  { day: "ONS", dayName: "Onsdag", date: 14, uv: 3 },
  { day: "TOR", dayName: "Torsdag", date: 15, uv: 6 },
  { day: "FRE", dayName: "Fredag", date: 16, uv: 5 },
  { day: "LØR", dayName: "Lørdag", date: 17, uv: 7 },
  { day: "SØN", dayName: "Søndag", date: 18, uv: 4 },
];

/** Forsiden ("front-page" i Figma, 402 × 1599 px). */
export default function Forside() {
  return (
    <UvProvider>
      {/* Levende baggrund, der skifter farve efter UV på urets tidspunkt */}
      <Screen minHeight={1599} tone="white" background={<ReactiveGradient />}>
        <div className={styles.content}>
          {/* front-page-title */}
          <h1 className={styles.title}>
            UV Index i dag
          </h1>
          {/* front-page-information */}
          <p className={styles.intro}>
            Sådan kommer din dag i solen, til at se ud.
          </p>

          {/* clock-box + "Højeste UV i dag" + "Info om risiko", alle med data fra OpenUV */}
          <TodayUv />

          {/* week-uv-graphic */}
          <div className={styles.weekForecast}>
            <WeekForecast city="Cairo" days={week} todayIndex={0} />
          </div>
        </div>

        {/* smiley-orbit */}
        <SunLogo className={styles.sunLogo} />
      </Screen>

      <Navbar />
    </UvProvider>
  );
}
