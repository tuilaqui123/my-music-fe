import {
  Home,
  Library,
  Search,
  Music,
  Users,
  Disc,
  Heart,
  ListMusic,
  Star,
  CloudUpload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export function Sidebar() {
  const mainNavItems = [
    { icon: Home, label: "Home", active: true, path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Music, label: "Recently Played", path: "/recently-played" },
    { icon: Library, label: "Your Library", path: "/tracks" },
    { icon: CloudUpload, label: "Upload", path: "/upload" },
  ];

  const libraryItems = [
    { icon: Library, label: "Tracks", active: true, path: "/tracks" },
    { icon: Disc, label: "Albums", path: "/albums" },
    { icon: ListMusic, label: "Playlists", path: "/playlists" },
    { icon: Users, label: "Artists", path: "/artists" },
    { icon: Star, label: "Genres", path: "/genres" },
  ];

  const playlists = [
    "My Playlist #1",
    "Chill Vibes",
    "Workout Mix",
    "Road Trip",
    "Study Focus",
    "Party Hits",
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="font-heading text-2xl font-bold text-sidebar-foreground">
          Vibes
        </h1>
      </div>

      {/* Main Navigation */}
      <div className="px-3 mb-6">
        {mainNavItems.map((item) => (
          <Button
            key={item.label}
            asChild
            variant={item.active ? "default" : "ghost"}
            className={`w-full justify-start mb-2 ${
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}>
            <Link href={item.path}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Library Section */}
      <div className="px-3 mb-6">
        <h3 className="text-sidebar-foreground font-semibold mb-3 px-3">
          Your Library
        </h3>
        {libraryItems.map((item) => (
          <Button
            key={item.label}
            asChild
            variant={item.active ? "default" : "ghost"}
            className={`w-full justify-start mb-2 ${
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}>
            <Link href={item.path}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Playlists */}
      <div className="px-3 flex-1">
        <h3 className="text-sidebar-foreground font-semibold mb-3 px-3">
          Playlists
        </h3>
        <ScrollArea className="h-full">
          {playlists.map((playlist) => (
            <Button
              key={playlist}
              variant="ghost"
              className="w-full justify-start mb-1 text-sidebar-foreground hover:bg-sidebar-accent">
              <Music className="mr-3 h-4 w-4" />
              {playlist}
            </Button>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
