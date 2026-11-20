"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Svg from "./Svg";

const items = [
  { href: "/", label: "UV-indeks", icon: "nav-indeks" },
  { href: "/sunsafety", label: "Solsikkerhed", icon: "nav-solhat" },
  { href: "/settings", label: "Indstillinger", icon: "nav-settings" },
  { href: "/about", label: "Information", icon: "nav-info" },
];

function Icon({ icon, active }) {
  const name = active ? `${icon}-active` : icon;
  if (icon === "nav-solhat") {
    return (
      <span className="relative block h-4 w-[30px]">
        {active ? (
          <span className="absolute inset-[0_-4.12%_-8.36%_-4.12%]">
            <Svg name={name} className="block size-full max-w-none" />
          </span>
        ) : (
          <Svg name={name} />
        )}
      </span>
    );
  }
  if (icon === "nav-settings") {
    return (
      <span className="relative block size-6 overflow-clip">
        <span className="absolute inset-[9.6%_7.12%_8.61%_6.17%]">
          <span
            className={`absolute ${active ? "inset-[-2.08%_-9.51%_-14.64%_-9.52%]" : "inset-[-2.08%_-3.56%_-2.01%_-3.56%]"}`}
          >
            <Svg name={name} className="block size-full max-w-none" />
          </span>
        </span>
      </span>
    );
  }
  return (
    <span className="relative block size-6">
      <Svg name={name} />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[77px] items-center justify-between overflow-clip rounded-t-[24px] bg-navbar px-[50px] py-6 shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            aria-current={active ? "page" : undefined}
            className="relative shrink-0"
          >
            <Icon icon={item.icon} active={active} />
          </Link>
        );
      })}
    </nav>
  );
}
