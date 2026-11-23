import Toggle from "./Toggle";
import shared from "@/styles/shared.module.css";
import styles from "./SettingsCard.module.css";

/**
 * Kort med en titel og en række indstillinger, hver med en kontakt.
 * Bruges til "push-notifications" og "location-permissions" i Figma samt "Reduced motion".
 *
 * En indstilling er enten bare en tekst (kontakten husker selv sin tilstand),
 * eller { label, checked, onChange }, når kontakten skal styres udefra.
 */
export default function SettingsCard({ title, settings, height, className = "" }) {
  return (
    <section
      className={`${shared.glassCard} ${styles.card} ${className}`}
      style={{ height }}
    >
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.settingList}>
        {settings.map((setting) => {
          const { label, checked, onChange } = typeof setting === "string" ? { label: setting } : setting;
          return (
            <li key={label} className={styles.setting}>
              <p className={styles.settingLabel}>{label}</p>
              <Toggle label={label} checked={checked} onChange={onChange} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
