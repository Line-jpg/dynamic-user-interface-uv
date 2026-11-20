import HighestUvBox from "@/components/HighestUvBox";
import Navbar from "@/components/Navbar";
import OrbBackground from "@/components/OrbBackground";
import RiskInformationBox from "@/components/RiskInformationBox";
import Screen from "@/components/Screen";
import SunLogo from "@/components/SunLogo";
import WeekForecast from "@/components/WeekForecast";

// Eksempeldata fra designet. Udskift med data fra jeres UV-API.
const today = {
  uv: 5,
  level: "HØJ",
  peakTime: "13:34",
  risk: "Moderat Risiko",
  advice: "Søg skygge midt på dagen og brug solcreme",
};

const week = [
  { day: "MAN", dayName: "Mandag", date: 12, uv: 2 },
  { day: "TIR", dayName: "Tirsdag", date: 13, uv: 4 },
  { day: "ONS", dayName: "Onsdag", date: 14, uv: 3 },
  { day: "TOR", dayName: "Torsdag", date: 15, uv: 6 },
  { day: "FRE", dayName: "Fredag", date: 16, uv: 5 },
  { day: "LØR", dayName: "Lørdag", date: 17, uv: 7 },
  { day: "SØN", dayName: "Søndag", date: 18, uv: 4 },
];

/** Forsiden ("front-page" i Figma, 402 × 1599 px). */
export default function Forside() {
  return (
    <>
      <Screen minHeight={1599} bg="bg-[#fefefe]" background={<OrbBackground />}>
        <div className="px-5 text-text-primary">
          {/* front-page-title */}
          <h1 className="ml-[-1px] mt-[67px] h-[37px] w-[299px] text-center text-[36px] font-bold leading-normal">
            UV Index i dag
          </h1>
          {/* front-page-information */}
          <p className="mt-4 h-[38px] w-[253px] text-base leading-normal">Sådan kommer din dag i solen, til at se ud.</p>

          {/* clock-box: tomt panel i Figma */}
          <div className="mt-6 h-[399px] rounded-[24px] bg-glass" />

          <div className="mt-5 flex items-start gap-[14px]">
            <HighestUvBox uv={today.uv} level={today.level} peakTime={today.peakTime} />
            <RiskInformationBox advice={today.advice} risk={today.risk} className="mt-px" />
          </div>

          {/* week-uv-graphic */}
          <div className="mt-[18.94px]">
            <WeekForecast city="Aarhus" days={week} todayIndex={0} />
          </div>
        </div>

        {/* smiley-orbit */}
        <SunLogo className="ml-[127px] mt-[77.75px]" />
      </Screen>

      <Navbar />
    </>
  );
}
