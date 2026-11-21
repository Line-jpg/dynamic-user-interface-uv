"use client";

import { useCallback, useState } from "react";
import SkinTypesModal from "./SkinTypesModal";
import { skinTypes } from "./skinTypes";
import shared from "@/styles/shared.module.css";
import styles from "./SkinTypeSection.module.css";

/** "skin-type" og "personal-tips" fra Figma. Klik på hudtype-tallet for at åbne oversigten over hudtyper. */
export default function SkinTypeSection() {
  const [selected, setSelected] = useState(1);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const type = skinTypes.find((t) => t.id === selected);

  return (
    <>
      {/* skin-type */}
      <section className={styles.skinTypeCard}>
        <div className={styles.skinTypeContent}>
          <div className={styles.skinTypeHeader}>
            <h2 className={styles.skinTypeLabel}>Hudtype</h2>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`Hudtype ${type.id}. Se alle hudtyper`}
              onClick={() => setOpen(true)}
              className={styles.skinTypeButton}
              style={{ backgroundColor: type.color }}
            >
              {type.id}
            </button>
          </div>
          <p className={styles.skinTypeDescription}>{type.description}</p>
        </div>
      </section>

      {/* personal-tips */}
      <section className={`${shared.glassCard} ${styles.tipsCard}`}>
        <h2 className={shared.cardTitle}>Personlige tips til: Hudtype {type.id}</h2>
        <div className={shared.cardTitleUnderline} />
        <ul className={styles.tipsList}>
          <li className={`${styles.tip} ${styles.tipAvoidMidday}`}>
            For at mindske din sol eksponering, undgå solen i tidsrummet 12-15, og sørg altid for at benytte en vandfast
            solcreme med høj factor.
          </li>
          <li className={`${styles.tip} ${styles.tipClothing}`}>
            Hvis du stadig vil nyde solen, overvej at bruge solbeskyttelse i form af en løs langærmet t-shirt, solbriller
            og en hat.
          </li>
          <li className={`${styles.tip} ${styles.tipHydration}`}>Husk at hydrere dig selv ved at drikke vand i løbet af dagen.</li>
          <li className={`${styles.tip} ${styles.tipMoreInfo}`}>
            For flere tips og information om UV eksponering og sol sikkerhed, besøg{" "}
            <a href="https://www.solkampagnen.dk" target="_blank" rel="noreferrer" className={styles.link}>
              www.solkampagnen.dk
            </a>
          </li>
        </ul>
      </section>

      {open && (
        <SkinTypesModal
          selected={selected}
          onSelect={(id) => {
            setSelected(id);
            close();
          }}
          onClose={close}
        />
      )}
    </>
  );
}
