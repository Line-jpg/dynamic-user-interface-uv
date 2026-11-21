import styles from "./PageHeader.module.css";

/** "page-header" fra Figma: sidetitel med en kort streg under. Slutter 119,4 px fra toppen. */
export default function PageHeader({ title }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.titleUnderline} />
    </header>
  );
}
