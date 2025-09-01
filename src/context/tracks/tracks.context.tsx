"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getTracks } from "./tracks.service";

export interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  img_thumb?: string;
}

export interface TracksContextValue {
  tracks: Track[];
  // loading: boolean;
  // reload: () => {};
}

const TracksContext = createContext<TracksContextValue | null>(null);

export function TracksProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTracks();
      setTracks(data);
    })();
  }, []);

  return (
    <TracksContext.Provider value={{ tracks }}>
      {children}
    </TracksContext.Provider>
  );
}

export const useTracks = () => {
  const ctx = useContext(TracksContext);
  if (!ctx) throw new Error("useTracks must be used inside TracksProvider");
  return ctx;
};
