"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const cuisines = [
  { name: "South Indian", label: "REGIONAL HERITAGE", image: "/images/south indian.jpg", description: "Aromatic dosas, idlis, and authentic Chettinad delicacies.", examples: "Dosas · Idlis · Chettinad" },
  { name: "North Indian", label: "RICH & AROMATIC", image: "/images/north indian.jpg", description: "Rich curries, butter chicken, and tandoori specialties.", examples: "Curries · Butter chicken · Tandoori" },
  { name: "Chinese & Indo-Chinese", label: "FIERY WOK HEAT", image: "/images/chinese.jpg", description: "Sizzling woks, noodles, and bold Indo-Chinese fusion.", examples: "Woks · Noodles · Fusion" },
  { name: "Tandoor & Clay Oven", label: "GLOWING CHARCOAL", image: "/images/Tandoor & Clay Oven.jpg", description: "Smoky kebabs, naans, and clay-oven perfection.", examples: "Kebabs · Naans · Clay oven" },
  { name: "Grills", label: "LIVE FIRE", image: "/images/grills.jpg", description: "Succulent cuts kissed by flame and finished with Attil spice.", examples: "Al Faham · Sizzlers · Classics" },
  { name: "Mutton", label: "SLOW & SAVOURY", image: "/images/mutton.jfif", description: "Tender, deeply seasoned mutton dishes made for slow, generous sharing.", examples: "Seekh · Curry · Specials" },
];

export default function MenuSection() {
  const [selected, setSelected] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const getCardOffset = (index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    if (column === 0) return { x: -100, y: 0 };
    if (column === 2) return { x: 100, y: 0 };
    return { x: 0, y: row === 0 ? -100 : 100 };
  };

  return (
    <section className="home-section home-menu" id="cuisines" ref={sectionRef}>
      <div className="home-section-heading">
        <div><p className="home-eyebrow">01 / THE FLAVOUR MAP</p><h2>Many regions.<br /><em>One table.</em></h2></div>
        <p>Specialized cuisines, familiar rituals, and a little room for discovery. Choose a region to see what is waiting.</p>
      </div>
      <div className="home-cuisine-grid">
        {cuisines.map((cuisine, index) => (
          <motion.button
            className={`home-cuisine-card home-cuisine-${index + 1}`}
            key={cuisine.name}
            type="button"
            onClick={() => setSelected(cuisine)}
            initial={getCardOffset(index)}
            animate={hasEntered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getCardOffset(index) }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.065 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Image src={cuisine.image} alt={`${cuisine.name} cuisine at Attil`} fill sizes="(max-width: 700px) 100vw, 33vw" />
            <span className="home-cuisine-shade" />
            <span className="home-cuisine-copy"><small>{cuisine.label}</small><strong>{cuisine.name}</strong><i>VIEW DETAILS ↗</i></span>
          </motion.button>
        ))}
      </div>
      <Link className="home-menu-cta home-button home-button-amber" href="/menu">Explore Full Menu <span>↗</span></Link>
      {selected && <div className="home-modal-backdrop" role="presentation" onClick={() => setSelected(null)}><div className="home-dish-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} details`} onClick={(event) => event.stopPropagation()}><button className="home-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close details">×</button><Image src={selected.image} alt="" fill sizes="100vw" /><div className="home-modal-shade" /><div className="home-modal-copy"><p className="home-eyebrow">{selected.label}</p><h3>{selected.name}</h3><p>{selected.description}</p><span>{selected.examples}</span><a className="home-button home-button-amber" href="/menu">See the full menu <span>↗</span></a></div></div></div>}
    </section>
  );
}