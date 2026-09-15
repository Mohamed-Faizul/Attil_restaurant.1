import { NextResponse } from "next/server";

export const revalidate = 300;

const fallbackVideos = Array.from({ length: 4 }, (_, index) => ({
  id: `attil-local-video-${index + 1}`,
  src: "/ui-2.mp4",
  href: "https://www.instagram.com/attil_multicuisine/?hl=en",
  caption: `Attil Instagram video ${String(index + 1).padStart(2, "0")}`,
}));

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!accessToken || !userId) {
    return NextResponse.json({ videos: fallbackVideos, configured: false, fallback: true });
  }

  const params = new URLSearchParams({
    fields: "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp",
    limit: "25",
    access_token: accessToken,
  });
  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/${userId}/media?${params}`, { next: { revalidate: 300 } });
    if (!response.ok) return NextResponse.json({ videos: fallbackVideos, configured: true, fallback: true });

    const payload = await response.json();
    const videos = (payload.data || [])
      .filter((item: { media_type?: string; media_url?: string }) => item.media_type === "VIDEO" && item.media_url)
      .slice(0, 6)
      .map((item: { id: string; media_url: string; thumbnail_url?: string; permalink: string; caption?: string; timestamp?: string }) => ({
        id: item.id,
        src: item.media_url,
        poster: item.thumbnail_url,
        href: item.permalink,
        caption: item.caption || "Attil Multi Cuisine Restaurant",
        timestamp: item.timestamp,
      }));
    return NextResponse.json({ videos: videos.length ? videos : fallbackVideos, configured: true, fallback: !videos.length });
  } catch {
    return NextResponse.json({ videos: fallbackVideos, configured: true, fallback: true });
  }
}