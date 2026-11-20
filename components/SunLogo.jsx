import Svg from "./Svg";

// Bogstaverne i "SKRU NED / FOR SOLEN" placeret langs cirklen som i Figma.
// [bogstav, left, top (centrum), boksbredde, bokshøjde, rotation]
// Bogstaverne i "SKRU NED / FOR SOLEN" placeret langs cirklen som i Figma ("Hover orbit / Preview").
// [bogstav, left, top (centrum), boksbredde, bokshøjde, rotation]
const letters = [
  ["S", 21.41, 52.03, 19.489, 17.328, -62.35],
  ["K", 30.94, 39.4, 19.328, 19.449, -44.01],
  ["R", 45.06, 30.35, 17.151, 19.474, -25.57],
  ["U", 62.34, 25.84, 13.68, 17.482, -6.75],
  ["N", 86.71, 29.98, 17.76, 19.773, 24.58],
  ["E", 99.46, 38.77, 18.536, 18.837, 42.95],
  ["D", 108.42, 51.4, 20.19, 18.694, 61.53],
  ["F", 21.4, 98.26, 19.803, 17.95, 61.98],
  ["O", 28.3, 109.39, 22.179, 22.153, 46],
  ["R", 41.19, 118.34, 19.789, 20.785, 28.89],
  ["S", 65.3, 124.43, 14.292, 16.874, 2.96],
  ["O", 77.69, 123.02, 18.63, 19.392, -14.04],
  ["L", 90.65, 117.93, 17.965, 19.733, -29.85],
  ["E", 99.33, 110.49, 20.358, 20.428, -44.2],
  ["N", 107.39, 99.49, 21.262, 20.632, -60.35],
];

// De to runde prikker: [asset, left, top]. Hver prik er 11,055 px, og SVG'en går 20,35 % ud over boksen.
const dots = [
  ["logo-dot-round-left", 19.965, 69.465],
  ["logo-dot-round-right", 118.98, 69.465],
];

/** "Skru ned for solen"-logoet. Teksten og prikkerne roterer, når man holder musen over. */
export default function SunLogo({ className = "" }) {
  return (
    <div className={`relative size-[150px] ${className}`}>
      <div className="absolute left-[43.5px] top-[53.91px] h-[42.188px] w-[63px]">
        <Svg name="logo-solhat" />
      </div>
      <button
        type="button"
        aria-label="Skru ned for solen"
        className="absolute inset-0 block cursor-pointer transition-transform duration-700 ease-in-out hover:rotate-[360deg] focus-visible:rotate-[360deg]"
      >
        {letters.map(([char, left, top, w, h, rotate], i) => (
          <span
            key={i}
            aria-hidden
            className="absolute flex -translate-y-1/2 items-center justify-center"
            style={{ left, top, width: w, height: h }}
          >
            <span
              className="block text-[16.2px] font-bold leading-normal text-black"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              {char}
            </span>
          </span>
        ))}
        {dots.map(([name, left, top]) => (
          <span key={name} aria-hidden className="absolute size-[11.055px]" style={{ left, top }}>
            <span className="absolute inset-[-20.35%]">
              <Svg name={name} className="block size-full max-w-none" />
            </span>
          </span>
        ))}
      </button>
    </div>
  );
}
