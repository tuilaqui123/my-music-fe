"use client";

import { createContext, useContext } from "react";

interface AppContextValue {
  config: {
    domain: any;
  };
  data: {};
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3001";

  const config = { domain };

  const data = {};

  return (
    <AppContextWrapper config={config} data={data}>
      {children}
    </AppContextWrapper>
  );
}

function AppContextWrapper({
  children,
  config,
  data,
}: {
  children: React.ReactNode;
  config: any;
  data: any;
}) {
  return (
    <AppContext.Provider value={{ config, data }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};
