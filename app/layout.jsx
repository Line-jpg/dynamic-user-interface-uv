import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "UV Index",
  description: "Dagens UV-indeks, solsikkerhed og personlige tips.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className={styles.page}>
        {/* iPhone-ramme: altid præcis 402 × 874 px. Er vinduet lavere, scroller siden i stedet for at skalere telefonen. */}
        <div className={styles.phoneFrame}>
          <div className={styles.phoneScreen}>{children}</div>
        </div>
      </body>
    </html>
  );
}
