import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Screen from "@/components/Screen";
import SettingsCard from "@/components/SettingsCard";
import SunLogo from "@/components/SunLogo";

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
          className="ml-[22px] mt-[27.54px]"
        />

        {/* location-permissions */}
        <SettingsCard
          title="Lokation"
          settings={["Appen må bruge din live lokation"]}
          height={141}
          className="ml-[22px] mt-[18px]"
        />

        {/* SunLogo/Default */}
        <SunLogo className="ml-[124px] mt-[87px]" />
      </Screen>

      <Navbar />
    </>
  );
}
