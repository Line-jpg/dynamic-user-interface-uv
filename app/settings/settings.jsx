import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ReducedMotionSetting from "@/components/ReducedMotionSetting";
import Screen from "@/components/Screen";
import SettingsCard from "@/components/SettingsCard";
import SunLogo from "@/components/SunLogo";
import styles from "./settings.module.css";

/** Indstillinger ("settings" i Figma, 402 × 928 px). */
export default function Settings() {
  return (
    <>
      <Screen minHeight={928}>
        <PageHeader title="Indstillinger" />

        {/* push-notifications */}
        <SettingsCard
          title="Push Notifikationer"
          settings={["Hvis UV-indeks stiger over 4", "Personlige tips baseret på hudtype"]}
          height={188}
          className={styles.pushNotificationsCard}
        />

        {/* location-permissions */}
        <SettingsCard
          title="Lokation"
          settings={["Appen må bruge din live lokation"]}
          height={141}
          className={styles.locationCard}
        />

        {/* Reduced motion: slår animationer fra i hele appen */}
        <ReducedMotionSetting className={styles.reducedMotionCard} />

        {/* SunLogo/Default */}
        <SunLogo className={styles.sunLogo} />
      </Screen>

      <Navbar />
    </>
  );
}
