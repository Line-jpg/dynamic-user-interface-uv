import Svg from "./Svg";
import shared from "@/styles/shared.module.css";
import styles from "./HighestUvBox.module.css";

/** "highest-uv-box" fra Figma: dagens højeste UV i en gul ring og tidspunktet for toppen. */
export default function HighestUvBox({ uv, level, peakTime }) {
  return (
    <section aria-label="Højeste UV i dag" className={`${shared.glassPanel} ${styles.box}`}>
      <div className={styles.uvRing}>
        <Svg name="uv-ring" />
        <p className={styles.uvValue}>{uv}</p>
        <p className={styles.uvLevel}>{level}</p>
      </div>
      <p className={styles.peakText}>
        UV’en bliver højest <b>{uv}</b> i dag, klokken <b>{peakTime}</b>
      </p>
    </section>
  );
}
