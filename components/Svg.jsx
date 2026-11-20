/* eslint-disable @next/next/no-img-element */

/** Viser en SVG fra public/figma/ (hentet med scripts/download-figma-assets.mjs). */
export default function Svg({ name, className = "absolute inset-0 block size-full max-w-none", alt = "" }) {
  return <img alt={alt} className={className} src={`/figma/${name}.svg`} />;
}
