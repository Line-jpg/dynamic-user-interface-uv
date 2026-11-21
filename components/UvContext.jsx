"use client";

import { createContext, useContext, useState } from "react";

// Deler den aktuelle UV-værdi (på urets tidspunkt) mellem TodayUv og baggrunden.
const UvContext = createContext({ uv: null, setUv: () => {} });

export function UvProvider({ children }) {
  const [uv, setUv] = useState(null);
  return <UvContext.Provider value={{ uv, setUv }}>{children}</UvContext.Provider>;
}

export function useUv() {
  return useContext(UvContext);
}
