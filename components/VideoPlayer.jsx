"use client";

export default function VideoPlayer({ video, videoRef, onOpen }) {
  return <button type="button" className="about-video-link" onClick={onOpen} aria-label="Open this Attil Instagram video">
    <video ref={videoRef} className="about-video" muted loop playsInline preload="auto" poster={video.poster}>
      <source src={video.src} type="video/mp4" />
    </video>
  </button>;
}