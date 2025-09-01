import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import {
  Playfair_Display,
  Source_Sans_3 as Source_Sans_Pro,
} from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MainContent } from "@/components/main-content";
import { BottomNavigation } from "@/components/bottom-navigation";
import { MusicPlayer } from "@/components/music-player";
import { AppProvider } from "@/context/app.context";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Vibes - Personal Music App",
  description: "Your personal music streaming experience",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${playfairDisplay.variable} ${sourceSansPro.variable}`}>
        <AppProvider>
          <div className="h-screen bg-background text-foreground flex flex-col">
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-1">
              <Sidebar />
              {children}
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex-1 flex flex-col">
              <MainContent />
              <BottomNavigation />
            </div>

            {/* Music Player - Always visible at bottom */}
            <MusicPlayer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
