/** "risk-information-box" fra Figma: råd om solbeskyttelse og et mærke med risikoniveauet. */
export default function RiskInformationBox({ advice, risk, className = "" }) {
  return (
    <section
      aria-label="Info om risiko"
      className={`flex size-[174px] shrink-0 flex-col items-start gap-[21px] rounded-[24px] bg-glass px-6 py-[33px] ${className}`}
    >
      <p className="h-[51px] w-full text-center text-sm leading-normal text-white">{advice}</p>
      <p className="flex h-[33px] w-full items-start justify-center rounded-[12px] bg-paper p-2 text-center text-sm leading-normal text-text-primary">
        {risk}
      </p>
    </section>
  );
}
