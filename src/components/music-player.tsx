"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Repeat,
  Shuffle,
  MoreHorizontal,
  VolumeOff,
} from "lucide-react";
import { useAppContext } from "@/context/app.context";

export function MusicPlayer() {
  const { state, config } = useAppContext();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([100]);
  const [isMuted, setIsMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load new track when state.currentTrack changes
  useEffect(() => {
    if (state.currentTrack && audioRef.current) {
      const url = `${config.domain}/musics/${state.currentTrack.name}.mp3`;
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [state.currentTrack, config.domain]);

  // Sync volume with slider
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  // Listen for metadata + timeupdate
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration > 0) {
        setProgress([Math.floor((audio.currentTime / audio.duration) * 100)]);
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [state.currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleMute = () => {
    if (isMuted) {
      // Unmute -> khôi phục volume trước đó
      setVolume([lastVolume || 50]);
      setIsMuted(false);
    } else {
      // Mute -> lưu lại volume cũ rồi set 0
      setLastVolume(volume[0]);
      setVolume([0]);
      setIsMuted(true);
    }
  };

  return (
    <div className="bg-card border-t border-border p-4">
      {/* hidden audio element */}
      <audio ref={audioRef} />

      <div className="flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <img
            src={`${config.domain}/thumbnails/${state.currentTrack?.name}.jpg`}
            alt={state.currentTrack?.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="font-semibold truncate">{state.currentTrack?.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {state.currentTrack?.artist}
            </p>
          </div>
          <Button size="sm" variant="ghost">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="cursor-pointer">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <Button size="sm" variant="ghost">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90"
              onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button size="sm" variant="ghost">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button size="sm" variant="ghost">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-muted-foreground">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={progress}
              onValueChange={(val) => {
                if (audioRef.current && duration) {
                  const newTime = (duration * val[0]) / 100;
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
                setProgress(val);
              }}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <button onClick={toggleMute}>
            {isMuted || volume[0] === 0 ? (
              <VolumeOff className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}
