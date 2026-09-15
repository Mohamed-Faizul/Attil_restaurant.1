"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function RestaurantInterior() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return <section className={`home-interior ${isVisible ? "is-visible" : ""}`} ref={sectionRef} aria-labelledby="interior-heading"><div className="home-interior-image"><Image src="/images/restaurant-interior.webp" alt="The warm interior of Attil Multi Cuisine Restaurant" fill sizes="100vw" /></div><div className="home-interior-content"><p className="home-eyebrow">THE ATTIL EXPERIENCE</p><h2 id="interior-heading">A table made<br /><em>for lingering.</em></h2><p>Warm light, generous plates, and the easy rhythm of a meal shared well. Come in for the food, stay for the feeling.</p></div><a className="home-button home-button-light home-interior-cta" href="/contact">Reserve now <span>↗</span></a></section>;
}