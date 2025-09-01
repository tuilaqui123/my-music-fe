"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MusicCard from "@/components/music-card";
import { useAppContext } from "@/context/app.context";

export interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  img_thumb?: string;
}

export default function Page() {
  const tracks: Track[] = [];

  const { data } = useAppContext();

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div>
              <h2 className="font-heading text-3xl font-bold mb-2">
                Good evening
              </h2>
              <p className="text-muted-foreground">
                Ready to discover your next favorite song?
              </p>
            </div>

            {/* Recently Played */}
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-4">
                Recently Played
              </h3>
              <div className="space-y-2 grid grid-cols-5 gap-5">
                {data.tracks.map((track) => (
                  <MusicCard key={track.id} track={track} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
