"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Music, ImageIcon, X, Youtube } from "lucide-react";
import { useAppContext } from "@/context/app.context";

export default function UploadPage() {
  const { actions } = useAppContext();

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Track details state
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleArtworkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArtwork(e.target.files[0]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleYoutubeUrl = () => {
    if (youtubeUrl.trim()) {
      console.log("[v0] Processing YouTube URL:", youtubeUrl);
    }
  };

  const handleUpload = async () => {
    try {
      await actions.uploadTracks({
        files: uploadedFiles,
        artwork,
        link: youtubeUrl,
        title,
        artist,
        album,
        genre,
        description,
      });
      alert("Upload thành công!");
    } catch {
      alert("Upload thất bại!");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex-1 flex flex-col">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Upload Your Music
          </h1>
          <p className="text-slate-400 text-lg">
            Share your tracks with the world. Upload audio files or import from
            YouTube.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Files
              </CardTitle>
              <CardDescription>
                Drag and drop your audio files here, or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}>
                <Music className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-300 mb-2">
                  Drop your audio files here
                </p>
                <p className="text-slate-500 text-sm mb-4">
                  Supports MP3, WAV, FLAC up to 100MB
                </p>
                <Input
                  type="file"
                  multiple
                  accept="audio/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-transparent">
                    Browse Files
                  </Button>
                </Label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="flex-1 h-px bg-slate-600"></div>
                  <span className="text-sm">OR</span>
                  <div className="flex-1 h-px bg-slate-600"></div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-500" />
                    <Label className="text-slate-300">
                      Import from YouTube
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste YouTube URL here..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 flex-1"
                    />
                    <Button
                      onClick={handleYoutubeUrl}
                      disabled={!youtubeUrl.trim()}
                      className="bg-red-600 hover:bg-red-700 text-white">
                      Import
                    </Button>
                  </div>
                  <p className="text-slate-500 text-xs">
                    Paste a YouTube URL to import audio (respects copyright and
                    terms of service)
                  </p>
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="text-white font-medium">Uploaded Files</h4>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Music className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300 text-sm">
                          {file.name}
                        </span>
                        <span className="text-slate-500 text-xs">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-slate-400 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Track Details Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Track Details</CardTitle>
              <CardDescription>
                Add information about your track
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">
                  Track Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter track title"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artist" className="text-slate-300">
                  Artist Name
                </Label>
                <Input
                  id="artist"
                  placeholder="Enter artist name"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="album" className="text-slate-300">
                  Album
                </Label>
                <Input
                  id="album"
                  placeholder="Enter album name"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-slate-300">
                  Genre
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white w-full">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 w-full">
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="hip-hop">Hip Hop</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="r&b">R&B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your track..."
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
                />
              </div>

              {/* Album Artwork Upload */}
              <div className="space-y-2">
                <Label className="text-slate-300">Album Artwork</Label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors">
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Upload album artwork</p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="artwork-upload"
                  />
                  <Label htmlFor="artwork-upload">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 cursor-pointer">
                      Choose Image
                    </Button>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleUpload}
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white px-8 py-3">
            Upload Track
          </Button>
        </div>
      </div>
    </div>
  );
}
