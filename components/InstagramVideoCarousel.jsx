"use client";

import { useEffect, useRef, useState } from "react";
import { instagramProfile, instagramVideosEndpoint } from "@/lib/socialMedia";
import VideoPlayer from "@/components/VideoPlayer";

export default function InstagramVideoCarousel() {
  const [videos, setVideos] = useState([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const video = videos[active];

  useEffect(() => {
    fetch(instagramVideosEndpoint).then((response) => response.json()).then((payload) => setVideos(payload.videos || [])).catch(() => setVideos([])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (paused || videos.length < 2) return undefined;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % videos.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, videos.length]);

  useEffect(() => {
    if (!video) return;
    videoRef.current?.load();
    if (!paused) videoRef.current?.play().catch(() => {});
  }, [active, paused, video]);

  if (loading) return <section className="about-video-section about-video-empty" aria-label="Loading Attil Instagram videos"><p>Loading Instagram content...</p></section>;
  if (!video) return <section className="about-video-section about-video-empty" aria-label="Attil Instagram videos"><p>Loading Instagram content...</p><a href={instagramProfile} target="_blank" rel="noreferrer">VISIT ATTIL ON INSTAGRAM ↗</a></section>;

  const move = (direction) => setActive((value) => (value + direction + videos.length) % videos.length);
  return <section className="about-video-section" aria-label="Attil on Instagram">
    <div className="about-video-frame" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <VideoPlayer key={video.id} video={video} videoRef={videoRef} onOpen={() => window.open(instagramProfile, "_blank", "noopener,noreferrer")} />
      <button type="button" className="about-video-toggle" onClick={() => { if (videoRef.current?.paused) { videoRef.current.play(); setPaused(false); } else { videoRef.current?.pause(); setPaused(true); } }} aria-label={paused ? "Play video" : "Pause video"}>{paused ? "▶" : "Ⅱ"}</button>
      <button type="button" className="about-video-arrow is-prev" onClick={() => move(-1)} aria-label="Previous Instagram video">←</button><button type="button" className="about-video-arrow is-next" onClick={() => move(1)} aria-label="Next Instagram video">→</button>
      <div className="about-video-meta"><span>{video.caption}</span><a href={instagramProfile} target="_blank" rel="noreferrer">FOLLOW ATTIL ↗</a></div>
      <div className="about-video-dots" aria-label="Video selection">{videos.map((item, index) => <button key={item.id} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show video ${index + 1}`} />)}</div>
    </div>
  </section>;
}