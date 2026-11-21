"use client";

import { useEffect, useRef } from "react";
import Svg from "./Svg";
import { skinTypes } from "./skinTypes";
import styles from "./SkinTypesModal.module.css";

/** "skin-types" fra Figma: oversigt over de fire hudtyper. Klik på et tal for at vælge hudtype. */
export default function SkinTypesModal({ selected, onSelect, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Hudtyper"
        onClick={(e) => e.stopPropagation()}
        className={styles.dialog}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Luk"
          onClick={onClose}
          className={styles.closeButton}
        >
          <span className={styles.closeIcon}>
            <Svg name="close-icon" layout="block" />
          </span>
        </button>

        {skinTypes.map((type, i) => (
          // De to første blokke er 125 px høje i Figma, de to sidste 153 px
          <div key={type.id} className={`${styles.skinType} ${i < 2 ? styles.skinTypeShort : styles.skinTypeTall}`}>
            <div className={styles.skinTypeHeader}>
              <p className={styles.skinTypeLabel}>
                Hudtype
              </p>
              <button
                type="button"
                aria-label={`Vælg hudtype ${type.id}`}
                aria-pressed={selected === type.id}
                onClick={() => onSelect(type.id)}
                className={`${styles.skinTypeButton} ${selected === type.id ? styles.skinTypeButtonSelected : ""}`}
                style={{ backgroundColor: type.color }}
              >
                {type.id}
              </button>
            </div>
            <p className={styles.skinTypeDescription}>
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
