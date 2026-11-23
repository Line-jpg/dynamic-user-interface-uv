import "./globals.css";
import { reducedMotionScript } from "@/lib/reducedMotionScript";
import styles from "./layout.module.css";

export const metadata = {
  title: "UV Index",
  description: "Dagens UV-indeks, solsikkerhed og personlige tips.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: scriptet nedenfor sætter data-reduced-motion på <html>, før React overtager
    <html lang="da" suppressHydrationWarning>
      <head>
        {/* Slår animationer fra før første tegning, hvis brugeren (eller systemet) ønsker reduceret bevægelse */}
        <script dangerouslySetInnerHTML={{ __html: reducedMotionScript }} />
      </head>
      <body className={styles.page}>
        {/* iPhone-ramme: altid præcis 402 × 874 px. Er vinduet lavere, scroller siden i stedet for at skalere telefonen. */}
        <div className={styles.phoneFrame}>
          <div className={styles.phoneScreen}>{children}</div>
        </div>
      </body>
    </html>
  );
}
