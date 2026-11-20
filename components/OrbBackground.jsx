import Svg from "./Svg";

// Den store gradient-gruppe, placeret som på forsiden (402 px bred ramme).
const topOrbs = [
  { asset: "orb-a", left: 148, top: 751, width: 324.503, height: 304.691, bleed: [32.93, 30.92] },
  { asset: "orb-b", left: -344, top: 911, width: 943, height: 885.427, bleed: [15.11, 14.19] },
  { asset: "orb-a", left: -773, top: 756, width: 324.503, height: 304.691, bleed: [32.93, 30.92] },
  { asset: "orb-c", left: 240, top: -115, width: 326, height: 306.097, bleed: [43.71, 41.04] },
  { asset: "orb-c", left: 80, top: 126, width: 326, height: 306.097, bleed: [43.71, 41.04] },
  { asset: "orb-c", left: -95, top: 622, width: 326, height: 306.097, bleed: [43.71, 41.04] },
  { asset: "orb-c", left: -109, top: 348, width: 326, height: 306.097, bleed: [43.71, 41.04] },
  { asset: "orb-d", left: -102, top: -129, width: 432.671, height: 406.255, bleed: [32.93, 30.92] },
  { asset: "orb-e", left: -53, top: 197, width: 749, height: 703.272, bleed: [19.03, 17.86] },
];


export default function OrbBackground({ offset = { x: 0, y: 0 }, extra = [] }) {
  const orbs = [...topOrbs.map((o) => ({ ...o, left: o.left + offset.x, top: o.top + offset.y })), ...extra];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: orb.left, top: orb.top, width: orb.width, height: orb.height }}
        >
          <div className="absolute" style={{ inset: `-${orb.bleed[0]}% -${orb.bleed[1]}%` }}>
            <Svg name={orb.asset} className="block size-full max-w-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
