import "./globals.css";

export const metadata = {
  title: "UV Index",
  description: "Dagens UV-indeks, solsikkerhed og personlige tips.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da" className="antialiased">
      <body className="flex min-h-dvh items-center justify-center bg-white px-4 py-8">
        {/* iPhone-ramme: altid præcis 402 × 874 px. Er vinduet lavere, scroller siden i stedet for at skalere telefonen.
            transform gør, at fixed-elementer (navbar, popups) placeres i rammen. */}
        <div className="relative h-[874px] w-[402px] shrink-0 overflow-hidden rounded-[48px] shadow-[0_0_0_10px_#1a1a1a,0_20px_60px_rgba(0,0,0,0.25)] [transform:translateZ(0)]">
          <div className="no-scrollbar h-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
