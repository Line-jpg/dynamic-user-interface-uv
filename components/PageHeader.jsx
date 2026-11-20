/** "page-header" fra Figma: sidetitel med en kort streg under. Slutter 119,4 px fra toppen. */
export default function PageHeader({ title }) {
  return (
    <header className="flex flex-col items-start px-[22px] pt-[90px]">
      <h1 className="whitespace-nowrap text-[22px] font-bold leading-[26.4px] text-text-primary">{title}</h1>
      <div className="h-[3px] w-[34px] bg-text-primary" />
    </header>
  );
}
