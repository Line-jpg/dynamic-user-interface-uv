import Svg from "./Svg";

/** "highest-uv-box" fra Figma: dagens højeste UV i en gul ring og tidspunktet for toppen. */
export default function HighestUvBox({ uv, level, peakTime }) {
  return (
    <section
      aria-label="Højeste UV i dag"
      className="flex size-[174px] shrink-0 flex-col items-center gap-[3px] rounded-[24px] bg-glass px-[15px] py-[11px]"
    >
      <div className="relative flex size-24 shrink-0 flex-col items-center px-[13px] py-[15px] text-paper">
        <Svg name="uv-ring" />
        <p className="relative mb-[-8px] flex h-[54px] w-[86px] items-center justify-center text-[46px] font-bold leading-[90.228px] tracking-[-5.52px]">
          {uv}
        </p>
        <p className="relative flex h-3 w-14 items-center justify-center text-[8.203px] font-bold leading-[11.278px] tracking-[2px]">
          {level}
        </p>
      </div>
      <p className="w-full text-center text-sm leading-normal text-white">
        UV’en bliver højest <b>{uv}</b> i dag, klokken <b>{peakTime}</b>
      </p>
    </section>
  );
}
