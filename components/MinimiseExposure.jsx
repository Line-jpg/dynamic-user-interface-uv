import Svg from "./Svg";
import shared from "@/styles/shared.module.css";
import styles from "./MinimiseExposure.module.css";

function ShadeIcon() {
  return (
    <span className={styles.shadeIcon}>
      <span className={styles.shadeArt}>
        <Svg name="icon-shade" layout="block" />
      </span>
    </span>
  );
}

function SunscreenIcon({ name }) {
  return (
    <span className={styles.sunscreenIcon}>
      <span className={styles.sunscreenArt}>
        <Svg name={name} layout="block" />
      </span>
    </span>
  );
}

function ClothingIcon() {
  return (
    <span className={styles.clothingIcon}>
      <span className={styles.clothingHat}>
        <Svg name="icon-hat-top" />
      </span>
      <span className={styles.clothingShirt}>
        <span className={styles.clothingShirtArt}>
          <Svg name="icon-shirt" layout="block" />
        </span>
      </span>
    </span>
  );
}

const reductions = [
  {
    icon: <ShadeIcon />,
    className: styles.reductionShade,
    text: "Du mindsker UV radiationen med 2 gange hvis du opholder dig i skyggen udendørs",
  },
  {
    icon: <SunscreenIcon name="icon-spf15" />,
    className: styles.reductionSunscreen,
    text: "Du mindsker UV radiationen med 3 gange hvis du benytter solcreme med factor 15",
  },
  {
    icon: <SunscreenIcon name="icon-spf30" />,
    className: styles.reductionSunscreen,
    text: "Du mindsker UV radiationen med 4 gange hvis du benytter solcreme med factor 30",
  },
  {
    icon: <ClothingIcon />,
    className: styles.reductionClothing,
    text: "Du mindsker UV radiationen med 10 gange hvis du bærer en hat og en langærmet t-shirt",
  },
];

/** "minimise-exposure" fra Figma: hvor meget skygge, solcreme og tøj mindsker UV-strålingen. */
export default function MinimiseExposure() {
  return (
    <section className={`${shared.glassCard} ${styles.card}`}>
      <div className={styles.intro}>
        <h2 className={shared.cardTitle}>Mindsk UV radiation</h2>
        <div className={shared.cardTitleUnderline} />
        <p className={styles.introText}>
          Hvis du bruger solcreme kan du reducere din eksponering til solens UV radiation- dette forhindrer hudkræft og
          melanoma
        </p>
      </div>
      <ul className={styles.reductionList}>
        {reductions.map((r) => (
          <li key={r.text} className={`${styles.reduction} ${r.className}`}>
            <span className={styles.reductionIcon}>{r.icon}</span>
            <p className={styles.reductionText}>{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
