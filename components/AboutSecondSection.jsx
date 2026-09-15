"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ZigzagElement({ children, className, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`about-zigzag-element ${className} ${visible ? "is-visible" : ""}`} style={{ "--zigzag-delay": `${delay}ms` }}>{children}</div>;
}

export default function AboutSecondSection() {
  return <section className="about-zigzag" aria-labelledby="story-heading">
    <div className="about-zigzag-inner">
      <ZigzagElement className="about-zigzag-heading" delay={0}><p className="eyebrow">THE ATTIL STORY</p><h2 id="story-heading">A culinary journey<br /><em>awaits.</em></h2></ZigzagElement>
      <ZigzagElement className="about-zigzag-copy" delay={550}><p>At Attil Multi Cuisine Restaurant, great food brings people together. The restaurant combines the warmth of traditional hospitality with contemporary elegance, creating a place for intimate dinners and grand celebrations.</p><p>The chefs master their respective cuisines, bringing authentic flavours and traditional techniques to every table.</p></ZigzagElement>
      <ZigzagElement className="about-zigzag-image" delay={1100}><Image src="/Interior/PARTY-HALL.webp" alt="Attil restaurant party hall" width={400} height={300} sizes="(max-width: 760px) 100vw, 400px" /></ZigzagElement>
    </div>
  </section>;
}