"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const message = "Stay awhile. Taste everything.";

export default function AboutThirdSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`about-golden-section ${visible ? "is-visible" : ""}`} aria-labelledby="experience-heading">
    <div className="about-golden-inner">
      <div className="about-golden-stage">
        <Image className="about-golden-image" src="/Interior/ATTIL.webp" alt="The Attil restaurant interior" width={380} height={253} sizes="(max-width: 760px) 92vw, 380px" />
        <div className="about-golden-copy"><p className="about-golden-kicker">THE ATTIL EXPERIENCE</p><h2 id="experience-heading">A table made<br /><em>for lingering.</em></h2><p className="about-typewriter" aria-label={message}>{[...message].map((letter, index) => <span key={`${letter}-${index}`} style={{ "--letter-delay": `${index * 60}ms` }}>{letter === " " ? "\u00a0" : letter}</span>)}</p></div>
      </div>
    </div>
  </section>;
}