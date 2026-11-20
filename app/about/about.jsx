import AboutTheApp from "@/components/AboutTheApp";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import SunLogo from "@/components/SunLogo";

/** Om appen ("about" i Figma, 402 × 928 px). */
export default function About() {
  return (
    <>
      <Screen minHeight={928}>
        <PageHeader title="Om appen" />

        {/* about-the-app */}
        <AboutTheApp className="ml-[22px] mt-[27.6px]" />

        {/* SunLogo/Default */}
        <SunLogo className="ml-[124px] mt-[68.94px]" />
      </Screen>

      <Navbar />
    </>
  );
}
