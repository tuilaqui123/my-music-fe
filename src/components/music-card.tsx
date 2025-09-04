"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, Heart } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context/app.context";

interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  img_thumb?: string;
}

export default function MusicCard({
  track,
  onClick,
}: {
  track: Track;
  onClick: () => void;
}) {
  const { config } = useAppContext();
  return (
    <Card
      key={track.id}
      onClick={onClick}
      className="bg-card hover:bg-accent transition-colors cursor-pointer h-auto group">
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-full rounded-md overflow-hidden aspect-video relative">
            <Image
              src={`${config.domain}/thumbnails/${track.name}.jpg`}
              alt={`http://localhost:3001/thumbnails/${track.name}.jpg`}
              width={500}
              height={500}
              className="w-full h-full object-cover shadow-xl shadow-white"
            />
            <div className="flex items-center absolute bottom-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity">
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Play className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="w-full h-[70px]">
            <div className="flex-1 min-w-0">
              <div className="flex flex-row justify-between items-center mb-1">
                <p className="font-semibold truncate">{track.name}</p>
                <span className="text-sm text-muted-foreground w-[15%]">
                  {track.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {track.artist} • {track.album}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
