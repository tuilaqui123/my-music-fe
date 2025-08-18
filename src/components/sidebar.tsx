import { Home, Library, Search, Music, Users, Disc, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Sidebar() {
  const mainNavItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
    { icon: Library, label: "Your Library" },
  ]

  const libraryItems = [
    { icon: Heart, label: "Liked Songs" },
    { icon: Music, label: "Recently Played" },
    { icon: Disc, label: "Albums" },
    { icon: Users, label: "Artists" },
  ]

  const playlists = ["My Playlist #1", "Chill Vibes", "Workout Mix", "Road Trip", "Study Focus", "Party Hits"]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="font-heading text-2xl font-bold text-sidebar-foreground">Vibes</h1>
      </div>

      {/* Main Navigation */}
      <div className="px-3 mb-6">
        {mainNavItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={`w-full justify-start mb-2 ${
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </div>

      {/* Library Section */}
      <div className="px-3 mb-6">
        <h3 className="text-sidebar-foreground font-semibold mb-3 px-3">Your Library</h3>
        {libraryItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start mb-1 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>

      {/* Playlists */}
      <div className="px-3 flex-1">
        <h3 className="text-sidebar-foreground font-semibold mb-3 px-3">Playlists</h3>
        <ScrollArea className="h-full">
          {playlists.map((playlist) => (
            <Button
              key={playlist}
              variant="ghost"
              className="w-full justify-start mb-1 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Music className="mr-3 h-4 w-4" />
              {playlist}
            </Button>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}
