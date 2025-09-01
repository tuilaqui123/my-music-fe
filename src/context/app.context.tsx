"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Định nghĩa type rõ ràng
interface Config {
  domain: string;
  user?: any;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  // future: auth tokens, user preferences, etc.
}

interface Data {
  tracks: any[];
  // future: playlists, artists, albums, etc.
}

interface AppContextValue {
  config: Config;
  data: Data;

  // future: methods to update user, theme, etc.
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3001";

  // Config (cố định, ít thay đổi)
  const config: Config = {
    domain,
    user: null,
    theme: {
      primaryColor: "#1DB954",
      secondaryColor: "#191414",
    },
  };

  // Data (state động, có thể load từ API)
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${domain}/tracks`)
      .then((res) => {
        setTracks(res.data);
      })
      .catch((err) => console.error("Error fetching tracks:", err));
  }, [domain]);

  const data: Data = {
    tracks,
  };

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

// Debug log to verify context data
// <pre>{JSON.stringify(data.tracks, null, 2)}</pre>;
