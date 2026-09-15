"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function DishImage({ item, index, categoryName, isVisible }) {
  const [loaded, setLoaded] = useState(false);
  return <div className={`menu-gallery-image ${loaded ? "is-loaded" : ""}`}>
    {!loaded && <span className="menu-image-loader" aria-label="Loading image" />}
    {isVisible && <Image src={item.image.src} alt={item.image.alt} width={320} height={265} sizes="(max-width: 767px) 100vw, 320px" onLoad={() => setLoaded(true)} />}
    <span className="menu-gallery-number">0{index + 1}</span>
    <span className="menu-gallery-category">{categoryName}</span>
  </div>;
}

function GalleryItem({ item, index, category }) {
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return <article ref={itemRef} className={`menu-gallery-item ${index % 2 ? "is-reversed" : ""} ${isVisible ? "is-visible" : ""}`} style={{ "--item-delay": `${item.animationDelay}ms` }}>
    <DishImage item={item} index={index} categoryName={category.name} isVisible={isVisible} />
    <div className="menu-gallery-copy"><p className="eyebrow">PLATE 0{index + 1}</p><h3>{item.name}</h3><p>{item.description}</p><span className="menu-gallery-rule" /></div>
    <span className={`menu-gallery-accent is-${item.accentPosition}`} aria-hidden="true" />
  </article>;
}

export default function MenuItemGallery({ category }) {
  return <div className="menu-gallery" key={category.id}>
    {category.items.map((item, index) => <GalleryItem item={item} index={index} category={category} key={item.image.src} />)}
  </div>;
}