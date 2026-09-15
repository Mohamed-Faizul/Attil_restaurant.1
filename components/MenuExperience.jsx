"use client";

import { useEffect, useState } from "react";
import { categoryIds, menuCategories } from "@/lib/menuData";
import CategorySelector from "@/components/CategorySelector";
import MenuItemGallery from "@/components/MenuItemGallery";

export default function MenuExperience() {
  const [activeId, setActiveId] = useState("south");
  const activeCategory = menuCategories.find((category) => category.id === activeId) || menuCategories[0];

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("category");
    if (categoryIds.includes(id)) setActiveId(id);
  }, []);

  const selectCategory = (id) => {
    if (!categoryIds.includes(id)) return;
    setActiveId(id);
    window.history.replaceState({}, "", `/menu?category=${id}`);
  };

  return <main className="menu-experience">
    <section className="menu-intro section-wrap">
      <div className="menu-intro-copy"><p className="eyebrow">THE DIGITAL MENU / 06 CUISINES</p><h1>Choose your<br /><em>kind of hungry.</em></h1><p>Six kitchens, one table. Pick a cuisine to explore, or scan its QR marker from wherever you are seated.</p></div>
      <div className="menu-intro-stamp"><span>ATTIL</span><small>EST. 2019<br />ANDIPATTI</small></div>
    </section>
    <section className="menu-selector section-wrap"><div className="menu-section-heading"><div><p className="eyebrow">01 / FIND YOUR FLAVOUR</p><h2>Start with a<br /><em>point of view.</em></h2></div><p>Tap a card to open the gallery. The QR button creates a direct menu link for that cuisine; the scan button opens your camera.</p></div><CategorySelector categories={menuCategories} activeId={activeId} onSelect={selectCategory} /></section>
    <section className="menu-gallery-section"><div className="section-wrap menu-gallery-head"><div><p className="eyebrow">02 / {activeCategory.eyebrow}</p><h2>{activeCategory.name}</h2></div><p>{activeCategory.description}</p></div><MenuItemGallery category={activeCategory} /></section>
  </main>;
}