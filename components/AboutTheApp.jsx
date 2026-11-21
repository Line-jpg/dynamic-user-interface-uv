import shared from "@/styles/shared.module.css";
import styles from "./AboutTheApp.module.css";

/** "about-the-app" fra Figma: hvor UV-indekset kommer fra, og hvad appen kan og ikke kan. */
export default function AboutTheApp({ className = "" }) {
  return (
    <section
      className={`${shared.glassCard} ${styles.card} ${className}`}
    >
      <h2 className={shared.cardTitle}>Om appen</h2>
      <div className={shared.cardTitleUnderline} />
      <div className={styles.text}>
        <p>
          UV-indekset i denne app er baseret på den daglige vejrudsigt fra Det Danske Meteorologiske Institut
          (EUMETSAT-O3MSAF). Vær opmærksom på, at vejret – herunder skydækket – kan afvige fra prognosen.
        </p>
        <p>
          UV-INDEKS-appen måler ikke det faktiske UV-indeks og er udelukkende ment som en vejledning. Det er derfor
          vigtigt, at du altid vurderer dit behov for solbeskyttelse ud fra den aktuelle vejrsituation og din hudtype.
        </p>
      </div>
    </section>
  );
}
