/**
 * Mobil-ramme (402 px) med plads til navbaren nederst.
 * `background` er valgfri og lægges bag indholdet (bruges af forsidens UV-baggrund).
 */
export default function Screen({ children, minHeight, bg = "bg-[#f5f5f5]", background = null }) {
  return (
    <main className={`relative w-full overflow-hidden pb-[77px] ${bg}`} style={{ minHeight }}>
      {background}
      <div className="relative z-[1]">{children}</div>
    </main>
  );
}
