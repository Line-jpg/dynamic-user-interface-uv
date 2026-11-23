import Navbar from "@/components/Navbar";
import ReactiveGradient from "@/components/ReactiveGradient";
import Screen from "@/components/Screen";
import SunLogo from "@/components/SunLogo";
import TodayUv from "@/components/TodayUv";
import { UvProvider } from "@/components/UvContext";
import WeekUv from "@/components/WeekUv";
import styles from "./page.module.css";

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

          {/* week-uv-graphic: ugens højeste UV pr. dag fra OpenUV */}
          <div className={styles.weekForecast}>
            <WeekUv />
          </div>
        </div>

        {/* smiley-orbit */}
        <SunLogo className={styles.sunLogo} />
      </Screen>

      <Navbar />
    </UvProvider>
  );
}
