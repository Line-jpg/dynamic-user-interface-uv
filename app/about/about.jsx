import AboutTheApp from "@/components/AboutTheApp";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import SunLogo from "@/components/SunLogo";
import styles from "./about.module.css";

/** Om appen ("about" i Figma, 402 × 928 px). */
export default function About() {
  return (
    <>
      <Screen minHeight={928}>
        <PageHeader title="Om appen" />

        {/* about-the-app */}
        <AboutTheApp className={styles.aboutCard} />

        {/* SunLogo/Default */}
        <SunLogo className={styles.sunLogo} />
      </Screen>

      <Navbar />
    </>
  );
}
