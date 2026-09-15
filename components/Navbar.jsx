"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [["Home", "/"], ["Menu", "/menu"], ["About", "/about"], ["Contact", "/contact"]];

function NavItem({ label, href, onClick, button = false }) {
  return <Link className={button ? "home-button home-button-amber home-nav-item" : "home-nav-item"} href={href} onClick={onClick} data-cursor={label.toUpperCase()}><span>{button ? "Book a Table" : label}</span>{button && <span>↗</span>}<span className="home-nav-label" aria-hidden="true">{button ? "Book a Table" : label}</span></Link>;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="home-nav">
      <Link href="/" className="home-logo" aria-label="Attil home">
        <Image src="/images/logo.png" alt="Attil Multi Cuisine Restaurant" width={80} height={40} priority />
      </Link>
      <button className="home-nav-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? "×" : "☰"}
      </button>
      <nav className={open ? "home-nav-links is-open" : "home-nav-links"}>
        {links.map(([label, href]) => <NavItem key={href} label={label} href={href} onClick={() => setOpen(false)} />)}
        <NavItem label="Book a Table" href="/contact" onClick={() => setOpen(false)} button />
      </nav>
    </header>
  );
}