import styles from "./Screen.module.css";

/**
 * Mobil-ramme (402 px) med plads til navbaren nederst.
 * tone="white" giver forsidens næsten hvide bund (standard er lysegrå).
 * `background` er valgfri og lægges bag indholdet (bruges af forsidens UV-baggrund).
 */
export default function Screen({ children, minHeight, tone = "grey", background = null }) {
  const className = tone === "white" ? `${styles.screen} ${styles.screenWhite}` : styles.screen;

  return (
    <main className={className} style={{ minHeight }}>
      {background}
      <div className={styles.content}>{children}</div>
    </main>
  );
}
