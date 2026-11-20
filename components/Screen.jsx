/** Mobil-ramme (402 px) med gradient-baggrund og plads til navbaren nederst. */
export default function Screen({ children, background, minHeight, bg = "bg-[#f5f5f5]" }) {
  return (
    <main className={`relative w-full overflow-hidden pb-[77px] ${bg}`} style={{ minHeight }}>
      {background}
      <div className="relative">{children}</div>
    </main>
  );
}
