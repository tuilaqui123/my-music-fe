"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", path: "/" },
    { id: "tracks", label: "Tracks", path: "/tracks" },
    { id: "playlists", label: "Playlists", path: "/playlist" },
    { id: "artists", label: "Artists", path: "/artists" },
    { id: "genres", label: "Genres", path: "/genres" },
  ];

  const recentlyPlayed = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      cover: "/blinding-lights-album-cover.png",
    },
    {
      id: 2,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      duration: "2:54",
      cover: "/watermelon-sugar-album-cover.png",
    },
    {
      id: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      cover: "/levitating-album-cover.png",
    },
  ];

  const featuredPlaylists = [
    {
      id: 1,
      name: "Today's Top Hits",
      description: "The most played songs right now",
      cover: "/top-hits-playlist-cover.png",
    },
    {
      id: 2,
      name: "Chill Vibes",
      description: "Relax and unwind with these tracks",
      cover: "/chill-vibes-playlist-cover.png",
    },
    {
      id: 3,
      name: "Workout Mix",
      description: "High energy songs for your workout",
      cover: "/Coldzy & @HURRYKNG - BLEED (Official Music Video).jpg",
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header with tabs */}
      {/* <div className="p-6 border-b border-border">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-heading text-lg font-semibold pb-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div> */}

      <div className="p-6 border-b border-border">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <Link
              href={tab.path}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-heading text-lg font-semibold pb-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}>
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {activeTab === "home" && (
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
                <div className="space-y-2">
                  {recentlyPlayed.map((track) => (
                    <Card
                      key={track.id}
                      className="bg-card hover:bg-accent/10 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">
                              {track.title}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {track.artist} • {track.album}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-muted-foreground">
                              {track.duration}
                            </span>
                            <Button size="sm" variant="ghost">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Featured Playlists */}
              <div>
                <h3 className="font-heading text-2xl font-semibold mb-4">
                  Made for You
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredPlaylists.map((playlist) => (
                    <Card
                      key={playlist.id}
                      className="bg-card hover:bg-accent/10 transition-colors cursor-pointer group border p-3">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <img
                            src={playlist.cover || "/placeholder.svg"}
                            alt={playlist.name}
                            className="w-full aspect-square rounded-lg object-cover"
                          />
                          <Button
                            size="sm"
                            className="absolute bottom-2 right-2 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-5 w-5" />
                          </Button>
                        </div>
                        <h4 className="font-semibold mb-1">{playlist.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {playlist.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== "home" && (
            <div className="text-center py-12">
              <h3 className="font-heading text-2xl font-semibold mb-2">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h3>
              <p className="text-muted-foreground">
                This section is coming soon. Stay tuned for more features!
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
