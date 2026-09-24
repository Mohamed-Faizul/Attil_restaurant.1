"use client";

import { useEffect, useRef, useState } from "react";

const instagramUrl = "https://www.instagram.com/attil_multicuisine/?utm_source=ig_embed&ig_rid=AWfMB-X2WBe4Lj2m58FAncY";

export default function InstagramVideoSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`instagram-video-section${isVisible ? " is-visible" : ""}`} aria-label="Attil on Instagram">
    <div className="instagram-video-wrap">
      <video className="instagram-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="/insta.mp4" type="video/mp4" />
      </video>
      <div className="instagram-video-overlay" />
      <a className="instagram-video-button" href={instagramUrl} target="_blank" rel="noreferrer">Follow On Instagram <span>↗</span></a>
    </div>
  </section>;
}
