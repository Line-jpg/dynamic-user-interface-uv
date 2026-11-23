"use client";

import { useSyncExternalStore } from "react";
import {
  REDUCED_MOTION_ATTRIBUTE,
  REDUCED_MOTION_STORAGE_KEY,
  SYSTEM_REDUCED_MOTION_QUERY,
} from "./reducedMotionScript";

/*
 * Reduceret bevægelse — ét sted, der styrer alle animationer i appen.
 *
 * Indstillingen ligger som attributten data-reduced-motion="true|false" på <html>.
 * app/globals.css slår alle CSS-animationer og -overgange fra, når den er "true".
 * Komponenter med animationer i JavaScript (fx urets bølge) læser den med useReducedMotion().
 *
 * Scriptet, der sætter attributten før første tegning, ligger i lib/reducedMotionScript.js.
 * Brugerens valg gemmes i localStorage. Har brugeren ikke valgt noget, følges
 * styresystemets indstilling (prefers-reduced-motion: reduce).
 */

const STORAGE_KEY = REDUCED_MOTION_STORAGE_KEY;
const ATTRIBUTE = REDUCED_MOTION_ATTRIBUTE;
const SYSTEM_QUERY = SYSTEM_REDUCED_MOTION_QUERY;

const listeners = new Set();

/** Brugerens gemte valg: true/false, eller null hvis brugeren ikke har valgt. */
function savedPreference() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === null ? null : value === "true";
  } catch {
    return null;
  }
}

/** Sætter attributten på <html> ud fra brugerens valg eller systemets indstilling. */
function applyPreference() {
  const reduced = savedPreference() ?? window.matchMedia(SYSTEM_QUERY).matches;
  document.documentElement.setAttribute(ATTRIBUTE, String(reduced));
  listeners.forEach((listener) => listener());
}

/** Gemmer brugerens valg og slår bevægelse til/fra med det samme i hele appen. */
export function setReducedMotion(reduced) {
  try {
    localStorage.setItem(STORAGE_KEY, String(reduced));
  } catch {
    // localStorage kan være utilgængelig (fx privat browsing); valget gælder så kun nu.
  }
  // Kunne valget ikke gemmes, slås det alligevel til/fra for denne visning
  if (savedPreference() === null) {
    document.documentElement.setAttribute(ATTRIBUTE, String(reduced));
    listeners.forEach((listener) => listener());
  } else {
    applyPreference();
  }
}

function subscribe(listener) {
  listeners.add(listener);

  // Følg systemets indstilling, så længe brugeren ikke selv har valgt
  const media = window.matchMedia(SYSTEM_QUERY);
  const onSystemChange = () => {
    if (savedPreference() === null) applyPreference();
  };
  // Hold andre faner med appen i takt
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY) applyPreference();
  };

  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return document.documentElement.getAttribute(ATTRIBUTE) === "true";
}

/** true, når animationer skal være slået fra. På serveren antages false. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
