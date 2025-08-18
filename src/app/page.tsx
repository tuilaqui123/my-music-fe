import { MusicPlayer } from "@/components/music-player";
import { Sidebar } from "@/components/sidebar";
import { MainContent } from "@/components/main-content";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function HomePage() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1">
        <Sidebar />
        <MainContent />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex-1 flex flex-col">
        <MainContent />
        <BottomNavigation />
      </div>

      {/* Music Player - Always visible at bottom */}
      <MusicPlayer />
    </div>
  );
}
