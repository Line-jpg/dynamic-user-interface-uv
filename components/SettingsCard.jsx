import Toggle from "./Toggle";

/**
 * Kort med en titel og en række indstillinger, hver med en kontakt.
 * Bruges til "push-notifications" og "location-permissions" i Figma.
 */
export default function SettingsCard({ title, settings, height, className = "" }) {
  return (
    <section
      className={`w-[358px] rounded-[30px] border-3 border-white bg-glass pb-6 pl-4 pr-5 pt-6 ${className}`}
      style={{ height }}
    >
      <h2 className="py-[10px] text-base font-bold leading-[19.2px] text-white">{title}</h2>
      <ul className="-mt-[2px] flex flex-col gap-[7px]">
        {settings.map((label) => (
          <li key={label} className="flex items-center justify-between gap-2">
            <p className="text-sm leading-[19.2px] text-white">{label}</p>
            <Toggle label={label} />
          </li>
        ))}
      </ul>
    </section>
  );
}
