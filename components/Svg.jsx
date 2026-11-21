/* eslint-disable @next/next/no-img-element */
import styles from "./Svg.module.css";

/**
 * Viser en SVG fra public/figma/.
 * layout="overlay" (standard): fylder den positionerede forælder.
 * layout="block": fylder forælderen i det normale flow (bruges inde i en wrapper, der styrer størrelsen).
 */
export default function Svg({ name, layout = "overlay", alt = "" }) {
  return <img alt={alt} className={styles[layout]} src={`/figma/${name}.svg`} />;
}
