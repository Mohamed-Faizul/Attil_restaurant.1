"use client";

import Image from "next/image";
import { useState } from "react";
import { categoryUrl } from "@/lib/menuData";
import QRScanner from "@/components/QRScanner";

export default function CategorySelector({ categories, activeId, onSelect }) {
  const [scannerCategory, setScannerCategory] = useState(null);
  const [qrCategory, setQrCategory] = useState(null);

  return <>
    <div className="menu-category-grid" aria-label="Choose a cuisine">
      {categories.map((category, index) => <div className={`menu-category-card ${activeId === category.id ? "is-active" : ""}`} key={category.id} style={{ "--category-delay": `${index * 70}ms` }}>
        <button type="button" className="menu-category-select" onClick={() => onSelect(category.id)} aria-pressed={activeId === category.id}>
          <Image src={category.preview.src} alt={category.preview.alt} fill sizes="(max-width: 700px) 50vw, 16vw" />
          <span className="menu-category-shade" />
          <span className="menu-category-copy"><small>{category.eyebrow}</small><strong>{category.name}</strong></span>
        </button>
        <div className="menu-category-actions">
          <button type="button" onClick={() => setQrCategory(qrCategory === category.id ? null : category.id)} aria-label={`Show ${category.name} QR code`} title="Show QR code">QR</button>
          <button type="button" onClick={() => setScannerCategory(category)} aria-label={`Scan ${category.name} QR code`} title="Scan QR code">⌾</button>
        </div>
        {qrCategory === category.id && <div className="menu-qr-popover"><Image src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(categoryUrl(category.id))}`} alt={`QR code for ${category.name}`} width={180} height={180} /><small>Scan to open this menu</small></div>}
      </div>)}
    </div>
    {scannerCategory && <QRScanner category={scannerCategory} onDetected={(id) => { onSelect(id); setScannerCategory(null); }} onClose={() => setScannerCategory(null)} />}
  </>;
}