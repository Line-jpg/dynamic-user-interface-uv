import Svg from "./Svg";
import styles from "./UvConditions.module.css";

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
      <h2 className={styles.title}>
        Hvad betyder de forskellige UV forhold?
      </h2>
      <ul className={styles.levelList}>
        {levels.map((level) => (
          <li key={level.title} className={styles.level}>
            <span className={styles.levelHat}>
              <Svg name={level.hat} />
            </span>
            <div className={styles.levelText}>
              <p className={styles.levelName}>{level.title}</p>
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
