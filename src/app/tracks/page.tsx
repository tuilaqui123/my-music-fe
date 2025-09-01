import { ScrollArea } from "@/components/ui/scroll-area";
import MusicCard from "@/components/music-card";

export interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  img_thumb?: string;
}

export async function getTracks() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3001";
  const res = await fetch(`${domain}/tracks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tracks");
  return res.json();
}

export default async function Page() {
  const tracks: Track[] = await getTracks();

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
                {tracks.map((track) => (
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
