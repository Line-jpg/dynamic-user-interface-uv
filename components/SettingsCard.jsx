import Toggle from "./Toggle";
import shared from "@/styles/shared.module.css";
import styles from "./SettingsCard.module.css";

/**
 * Kort med en titel og en række indstillinger, hver med en kontakt.
 * Bruges til "push-notifications" og "location-permissions" i Figma.
 */
export default function SettingsCard({ title, settings, height, className = "" }) {
  return (
    <section
      className={`${shared.glassCard} ${styles.card} ${className}`}
      style={{ height }}
    >
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.settingList}>
        {settings.map((label) => (
          <li key={label} className={styles.setting}>
            <p className={styles.settingLabel}>{label}</p>
            <Toggle label={label} />
          </li>
        ))}
      </ul>
    </section>
  );
}
