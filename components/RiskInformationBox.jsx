import shared from "@/styles/shared.module.css";
import styles from "./RiskInformationBox.module.css";

/** "risk-information-box" fra Figma: råd om solbeskyttelse og et mærke med risikoniveauet. */
export default function RiskInformationBox({ advice, risk, className = "" }) {
  return (
    <section aria-label="Info om risiko" className={`${shared.glassPanel} ${styles.box} ${className}`}>
      <p className={styles.advice}>{advice}</p>
      <p className={styles.riskBadge}>{risk}</p>
    </section>
  );
}
