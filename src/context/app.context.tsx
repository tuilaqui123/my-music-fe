"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  img_thumb?: string;
}

export interface Upload {
  link?: string; // Trường hợp import từ YouTube
  files?: File[]; // Trường hợp upload file nhạc
  artwork?: File | null; // Ảnh bìa album
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
  description?: string;
}

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
  currentTrack: Track | null;
  isPlaying: boolean;
  // future: playlists, artists, albums, etc.
}

export interface Actions {
  // Quản lý player
  setCurrentTrack: (track: Track | null) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;

  uploadTracks: (upload: Upload) => Promise<void>;

  // Quản lý danh sách
  // addToQueue: (track: Track) => void;
  // removeFromQueue: (trackId: string) => void;
  // clearQueue: () => void;

  // Quản lý loading / trạng thái
  // setLoading: (loading: boolean) => void;

  // Quản lý playlist
  // createPlaylist: (name: string) => void;
  // addToPlaylist: (playlistId: string, track: Track) => void;
  // removeFromPlaylist: (playlistId: string, trackId: string) => void;
}

interface AppContextValue {
  config: Config;
  state: Data;
  actions: Actions;
  // future: methods to update user, theme, etc.
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  //=======================================================================================================================

  // Config (cố định, ít thay đổi)
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3001";
  const config: Config = {
    domain,
    user: null,
    theme: {
      primaryColor: "#1DB954",
      secondaryColor: "#191414",
    },
  };

  //=======================================================================================================================

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

  const state: Data = {
    tracks,
    currentTrack,
    isPlaying,
  };

  //=======================================================================================================================

  const actions: Actions = {
    setCurrentTrack: (track) => {
      setCurrentTrack(track);
      if (track) setIsPlaying(true);
    },
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    togglePlay: () => setIsPlaying((p) => !p),

    // Upload track
    uploadTracks: async (upload) => {
      try {
        const formData = new FormData();

        // Nếu upload file
        if (upload.files && upload.files.length > 0) {
          upload.files.forEach((file) => formData.append("files", file));
        }

        // Artwork
        if (upload.artwork) {
          formData.append("artwork", upload.artwork);
        }

        // Metadata
        if (upload.link) formData.append("link", upload.link);
        if (upload.title) formData.append("title", upload.title);
        if (upload.artist) formData.append("artist", upload.artist);
        if (upload.album) formData.append("album", upload.album);
        if (upload.genre) formData.append("genre", upload.genre);
        if (upload.description)
          formData.append("description", upload.description);

        const res = await axios.post(`${domain}/upload`, formData, {
          headers: { "Content-Type": "application/json" },
        });

        // Nếu API trả về track mới → thêm vào state
        if (res.data) {
          setTracks((prev) => [...prev, res.data]);
        }

        console.log("✅ Upload success:", res.data);
      } catch (error) {
        console.error("❌ Upload error:", error);
        throw error;
      }
    },
  };

  //=======================================================================================================================

  return (
    <AppContext.Provider value={{ config, state, actions }}>
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
