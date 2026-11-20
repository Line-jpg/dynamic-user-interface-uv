"use client";

import { useCallback, useState } from "react";
import SkinTypesModal from "./SkinTypesModal";
import { skinTypes } from "./skinTypes";

/** "skin-type" og "personal-tips" fra Figma. Klik på hudtype-tallet for at åbne oversigten over hudtyper. */
export default function SkinTypeSection() {
  const [selected, setSelected] = useState(1);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const type = skinTypes.find((t) => t.id === selected);

  return (
    <>
      {/* skin-type */}
      <section className="ml-[22px] mt-[24.6px] w-[360px] rounded-[25px] border-3 border-white bg-[rgba(15,15,15,0.2)] px-[27px] py-[26px] text-white">
        <div className="flex h-[90px] flex-col items-start gap-[11px]">
          <div className="relative h-10 w-[143px] shrink-0">
            <h2 className="absolute left-0 top-[10.5px] h-[19px] text-base font-bold leading-[19.2px]">Hudtype</h2>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`Hudtype ${type.id}. Se alle hudtyper`}
              onClick={() => setOpen(true)}
              className="absolute left-[100px] top-0 flex w-[43px] cursor-pointer flex-col items-center justify-center rounded-full border border-white p-[10px] text-base font-bold leading-[19.2px] text-[#693d3d]"
              style={{ backgroundColor: type.color }}
            >
              {type.id}
            </button>
          </div>
          <p className="h-[39px] w-full text-sm leading-[19.2px]">{type.description}</p>
        </div>
      </section>

      {/* personal-tips */}
      <section className="ml-[21px] mt-5 h-[429px] w-[360px] rounded-[30px] border-3 border-white bg-glass px-5 py-10 text-sm leading-[19.2px] text-white">
        <h2 className="text-base font-bold leading-[26.4px]">Personlige tips til: Hudtype {type.id}</h2>
        <div className="h-[3px] w-[34px] bg-white" />
        <ul className="w-[316px] list-disc">
          <li className="ms-[21px] mt-[13px] h-[83.6px]">
            For at mindske din sol eksponering, undgå solen i tidsrummet 12-15, og sørg altid for at benytte en vandfast
            solcreme med høj factor.
          </li>
          <li className="ms-[21px] mt-[14px] h-[74px]">
            Hvis du stadig vil nyde solen, overvej at bruge solbeskyttelse i form af en løs langærmet t-shirt, solbriller
            og en hat.
          </li>
          <li className="ms-[21px] mt-[6px] h-[46px]">Husk at hydrere dig selv ved at drikke vand i løbet af dagen.</li>
          <li className="ms-[21px] mt-[14px] h-[63px]">
            For flere tips og information om UV eksponering og sol sikkerhed, besøg{" "}
            <a href="https://www.solkampagnen.dk" target="_blank" rel="noreferrer" className="underline">
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
