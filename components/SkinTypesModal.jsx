"use client";

import { useEffect, useRef } from "react";
import Svg from "./Svg";
import { skinTypes } from "./skinTypes";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Hudtyper"
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[643.778px] w-[359.111px] flex-col items-start gap-[12.222px] rounded-[22.222px] border-[3.333px] border-white bg-[rgba(74,74,74,0.7)] p-[22.222px]"
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Luk"
          onClick={onClose}
          className="absolute left-[314.44px] top-[18.89px] size-[13.333px] cursor-pointer"
        >
          <span className="absolute inset-[-6.25%]">
            <Svg name="close-icon" className="block size-full max-w-none" />
          </span>
        </button>

        {skinTypes.map((type, i) => (
          // De to første blokke er 125 px høje i Figma, de to sidste 153 px
          <div key={type.id} className={`relative w-[308px] shrink-0 ${i < 2 ? "h-[125px]" : "h-[153px]"}`}>
            <div className="absolute left-0 top-0 h-[44.444px] w-[158.889px]">
              <p className="absolute left-0 top-[11.67px] h-[21.111px] w-[94.444px] text-[17.778px] font-bold leading-[21.333px] text-white">
                Hudtype
              </p>
              <button
                type="button"
                aria-label={`Vælg hudtype ${type.id}`}
                aria-pressed={selected === type.id}
                onClick={() => onSelect(type.id)}
                className={`absolute left-[111.11px] top-0 flex w-[47.778px] cursor-pointer flex-col items-center justify-center rounded-full border-[1.111px] border-black p-[11.111px] text-[17.778px] font-bold leading-[21.333px] text-[#101010] ${
                  selected === type.id ? "outline-2 outline-offset-2 outline-white" : ""
                }`}
                style={{ backgroundColor: type.color }}
              >
                {type.id}
              </button>
            </div>
            <p className="absolute left-0 top-[56.67px] w-[308.889px] text-[15.556px] leading-[21.333px] text-white">
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
