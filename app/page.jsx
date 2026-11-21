import Navbar from "@/components/Navbar";
import Screen from "@/components/Screen";
import SunLogo from "@/components/SunLogo";
import TodayUv from "@/components/TodayUv";
import WeekForecast from "@/components/WeekForecast";

// Eksempeldata til ugegrafen. Udskift med data fra jeres UV-API.
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
      <Screen minHeight={1599} bg="bg-[#fefefe]">
        <div className="px-5 text-text-primary">
          {/* front-page-title */}
          <h1 className="ml-[-1px] mt-[67px] h-[37px] w-[299px] text-center text-[36px] font-bold leading-normal">
            UV Index i dag
          </h1>
          {/* front-page-information */}
          <p className="mt-4 h-[38px] w-[253px] text-base leading-normal">
            Sådan kommer din dag i solen, til at se ud.
          </p>

          {/* clock-box + "Højeste UV i dag" + "Info om risiko", alle med data fra OpenUV */}
          <TodayUv />

          {/* week-uv-graphic */}
          <div className="mt-[18.94px]">
            <WeekForecast city="Cairo" days={week} todayIndex={0} />
          </div>
        </div>

        {/* smiley-orbit */}
        <SunLogo className="ml-[127px] mt-[77.75px]" />
      </Screen>

      <Navbar />
    </>
  );
}
