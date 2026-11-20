import Svg from "./Svg";

function ShadeIcon() {
  return (
    <span className="relative block h-[29px] w-[22px]">
      <span className="absolute inset-[-2.49%_-3.27%_-2.48%_-3.27%]">
        <Svg name="icon-shade" className="block size-full max-w-none" />
      </span>
    </span>
  );
}

function BottleIcon({ name }) {
  return (
    <span className="relative block h-[30.864px] w-[16.32px]">
      <span className="absolute inset-[-2.87%_-5.51%_-2.92%_-5.51%]">
        <Svg name={name} className="block size-full max-w-none" />
      </span>
    </span>
  );
}

function HatShirtIcon() {
  return (
    <span className="relative block h-[35px] w-6">
      <span className="absolute inset-[0_0_56.62%_0]">
        <Svg name="icon-hat-top" />
      </span>
      <span className="absolute inset-[41.18%_14.29%_0_14.29%]">
        <span className="absolute inset-[-5.83%_-7%]">
          <Svg name="icon-shirt" className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  );
}

const reductions = [
  { icon: <ShadeIcon />, gap: "gap-[9px]", text: "Du mindsker UV radiationen med 2 gange hvis du opholder dig i skyggen udendørs" },
  { icon: <BottleIcon name="icon-spf15" />, gap: "gap-[14px]", text: "Du mindsker UV radiationen med 3 gange hvis du benytter solcreme med factor 15" },
  { icon: <BottleIcon name="icon-spf30" />, gap: "gap-[14px]", text: "Du mindsker UV radiationen med 4 gange hvis du benytter solcreme med factor 30" },
  { icon: <HatShirtIcon />, gap: "gap-[6px]", text: "Du mindsker UV radiationen med 10 gange hvis du bærer en hat og en langærmet t-shirt" },
];

/** "minimise-exposure" fra Figma: hvor meget skygge, solcreme og tøj mindsker UV-strålingen. */
export default function MinimiseExposure() {
  return (
    <section className="ml-[21px] mt-[26px] h-[413px] w-[360px] rounded-[30px] border-3 border-white bg-glass px-5 py-10 text-white">
      <div className="h-[111px]">
        <h2 className="text-base font-bold leading-[26.4px]">Mindsk UV radiation</h2>
        <div className="h-[3px] w-[34px] bg-white" />
        <p className="mt-[13px] text-sm leading-[19.2px]">
          Hvis du bruger solcreme kan du reducere din eksponering til solens UV radiation- dette forhindrer hudkræft og
          melanoma
        </p>
      </div>
      <ul className="mt-[14px] flex flex-col gap-[10px]">
        {reductions.map((r) => (
          <li key={r.text} className={`flex h-[43px] items-center ${r.gap}`}>
            <span className="shrink-0">{r.icon}</span>
            <p className="h-[43px] w-[278px] text-xs leading-[19.2px]">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
