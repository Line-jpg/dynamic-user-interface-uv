import Svg from "./Svg";

const letters = [
  ["S", 26.7, 50.79, 18.741, 19.575, -38.4],
  ["K", 38.28, 43.92, 17.248, 19.499, -26.35],
  ["R", 51.6, 39.44, 14.891, 18.467, -14.19],
  ["U", 66.03, 37.59, 12.355, 16.561, -1.78],
  ["N", 84.13, 40.31, 16.366, 19.058, 17.19],
  ["E", 95.71, 45.39, 16.861, 19.141, 29.3],
  ["D", 104.74, 52.96, 20.085, 20.402, 41.55],
  ["F", 29.25, 99.27, 19.989, 18.904, 54.84],
  ["O", 35.89, 107.68, 22.041, 22.158, 40.45],
  ["R", 47.56, 114.27, 19.22, 20.45, 24.94],
  ["S", 67.99, 118.44, 13.906, 16.558, 1.55],
  ["O", 77.74, 117.14, 18.591, 19.357, -13.85],
  ["L", 88.66, 113.1, 17.726, 19.675, -28.26],
  ["E", 95.81, 107.3, 20.182, 20.517, -41.18],
  ["N", 102.75, 98.69, 21.563, 21.121, -55.74],
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
        {[30, 114].map((left) => (
          <span key={left} aria-hidden className="absolute top-[73.875px] h-[8.76px] w-[11.055px]" style={{ left }}>
            <span className="absolute inset-[-25.7%_-20.35%]">
              <Svg name="logo-dot" className="block size-full max-w-none" />
            </span>
          </span>
        ))}
      </button>
    </div>
  );
}
