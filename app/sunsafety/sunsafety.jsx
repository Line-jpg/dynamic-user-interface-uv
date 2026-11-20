import MinimiseExposure from "@/components/MinimiseExposure";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import SkinTypeSection from "@/components/SkinTypeSection";
import SunLogo from "@/components/SunLogo";
import UvConditions from "@/components/UvConditions";

/** Solsikkerhed ("sun-safety" i Figma, 402 × 2164 px). */
export default function SunSafety() {
  return (
    <>
      <Screen minHeight={2164}>
        <PageHeader title="Solsikkerhed" />
        <SkinTypeSection />
        <MinimiseExposure />
        <UvConditions />
        {/* Hover orbit / Preview */}
        <SunLogo className="mx-auto mt-[32.94px]" />
      </Screen>

      <Navbar />
    </>
  );
}
