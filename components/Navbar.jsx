"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Svg from "./Svg";
import styles from "./Navbar.module.css";

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
      <span className={styles.sunHatIcon}>
        {active ? (
          <span className={styles.sunHatActiveArt}>
            <Svg name={name} layout="block" />
          </span>
        ) : (
          <Svg name={name} />
        )}
      </span>
    );
  }
  if (icon === "nav-settings") {
    return (
      <span className={styles.settingsIcon}>
        <span className={styles.settingsIconArea}>
          <span className={active ? styles.settingsActiveArt : styles.settingsArt}>
            <Svg name={name} layout="block" />
          </span>
        </span>
      </span>
    );
  }
  return (
    <span className={styles.icon}>
      <Svg name={name} />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className={styles.navigation}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            aria-current={active ? "page" : undefined}
            className={styles.navigationLink}
          >
            <Icon icon={item.icon} active={active} />
          </Link>
        );
      })}
    </nav>
  );
}
