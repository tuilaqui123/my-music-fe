import { Track } from "./tracks.context";

export async function getTracks(): Promise<Track[]> {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3001";
  console.log("domain", domain);
  const res = await fetch(`${domain}/tracks`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tracks");
  }

  return res.json();
}
