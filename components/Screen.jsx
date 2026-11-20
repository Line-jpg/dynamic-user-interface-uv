/** Mobil-ramme (402 px) med plads til navbaren nederst. */
export default function Screen({ children, minHeight, bg = "bg-[#f5f5f5]" }) {
  return (
    <main className={`relative w-full overflow-hidden pb-[77px] ${bg}`} style={{ minHeight }}>
      {children}
    </main>
  );
}
