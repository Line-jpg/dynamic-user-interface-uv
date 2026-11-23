import Script from "next/script";
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
      <body className={styles.page}>
        {/* Slår animationer fra, før siden bliver interaktiv, hvis brugeren (eller systemet) ønsker reduceret bevægelse.
            beforeInteractive lægger scriptet i <head> og kører det før Next.js' egen kode. */}
        <Script id="reduced-motion" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: reducedMotionScript }} />
        {/* iPhone-ramme: altid præcis 402 × 874 px. Er vinduet lavere, scroller siden i stedet for at skalere telefonen. */}
        <div className={styles.phoneFrame}>
          <div className={styles.phoneScreen}>{children}</div>
        </div>
      </body>
    </html>
  );
}
