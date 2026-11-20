/** "about-the-app" fra Figma: hvor UV-indekset kommer fra, og hvad appen kan og ikke kan. */
export default function AboutTheApp({ className = "" }) {
  return (
    <section
      className={`h-[365px] w-[358px] rounded-[30px] border-3 border-white bg-glass px-5 py-10 text-white ${className}`}
    >
      <h2 className="text-base font-bold leading-[26.4px]">Om appen</h2>
      <div className="h-[3px] w-[34px] bg-white" />
      <div className="mt-[13px] w-[315px] space-y-[19.2px] text-sm leading-[19.2px]">
        <p>
          UV-indekset i denne app er baseret på den daglige vejrudsigt fra Det Danske Meteorologiske Institut
          (EUMETSAT-O3MSAF). Vær opmærksom på, at vejret – herunder skydækket – kan afvige fra prognosen.
        </p>
        <p>
          UV-INDEKS-appen måler ikke det faktiske UV-indeks og er udelukkende ment som en vejledning. Det er derfor
          vigtigt, at du altid vurderer dit behov for solbeskyttelse ud fra den aktuelle vejrsituation og din hudtype.
        </p>
      </div>
    </section>
  );
}
