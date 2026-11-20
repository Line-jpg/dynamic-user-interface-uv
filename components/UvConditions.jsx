import Svg from "./Svg";

const levels = [
  { hat: "hat-lav", title: "Lav", lines: ["Minimal beskyttelse som solbriller er ofte nok"] },
  { hat: "hat-moderat", title: "Moderat", lines: ["Brug solcreme (SPF 15-30), solbriller og solhat."] },
  { hat: "hat-hoj", title: "Høj", lines: ["Søg skygge.", "Brug solcreme SPF 50, solbriller, solhat og solbeskyttende tøj."] },
  {
    hat: "hat-meget-hoj",
    title: "Meget høj",
    lines: ["Undgå direkte sol.", "Brug solcreme med SPF 50+, solbriller, solhat og solbeskyttende tøj."],
  },
  {
    hat: "hat-ekstrem",
    title: "Ekstrem",
    lines: [
      "Undgå solen - bliv indendørs.",
      "Brug maksimal beskyttelse som solcreme SPF 50+, solbriller, solhat og solbeskyttende tøj.",
    ],
  },
];

/** "meaning-uv-text" og "UV forhold" fra Figma: hvad de fem UV-niveauer betyder. */
export default function UvConditions() {
  return (
    <section>
      <h2 className="ml-[22px] mt-[58.94px] h-[66px] w-[356px] text-[22px] font-bold leading-[1.5] tracking-[-0.242px] text-text-primary">
        Hvad betyder de forskellige UV forhold?
      </h2>
      <ul className="ml-[21px] mt-[6.06px] w-[360px]">
        {levels.map((level) => (
          <li key={level.title} className="flex h-[100px] items-center gap-[12.15px]">
            <span className="relative h-[60.75px] w-[90.72px] shrink-0">
              <Svg name={level.hat} />
            </span>
            <div className="w-[257px] text-[12.96px] leading-[1.5] tracking-[-0.1426px] text-[#1e1e1e]">
              <p className="font-bold">{level.title}</p>
              {level.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
