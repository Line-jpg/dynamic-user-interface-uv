/*
 * Fælles nøgler for "Reduceret bevægelse" og scriptet, der sætter indstillingen før siden tegnes.
 * Ligger i sin egen fil, så serverens layout kan bruge den (lib/reducedMotion.js er kun til browseren).
 */

export const REDUCED_MOTION_STORAGE_KEY = "uv-reduced-motion";
export const REDUCED_MOTION_ATTRIBUTE = "data-reduced-motion";
export const SYSTEM_REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Køres i <head> før siden tegnes (se app/layout.jsx), så animationer aldrig når at starte,
 * hvis brugeren har slået dem fra. Uden gemt valg følges styresystemets indstilling.
 */
export const reducedMotionScript = `(function(){try{var s=localStorage.getItem("${REDUCED_MOTION_STORAGE_KEY}");var r=s===null?window.matchMedia("${SYSTEM_REDUCED_MOTION_QUERY}").matches:s==="true";document.documentElement.setAttribute("${REDUCED_MOTION_ATTRIBUTE}",String(r))}catch(e){}})();`;
