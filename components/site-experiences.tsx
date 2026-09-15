"use client";

import Image from "next/image";
import Link from "next/link";
import SharedFooter from "@/components/Footer";
import SharedNavbar from "@/components/Navbar";
import MenuExperience from "@/components/MenuExperience";
import AboutSecondSection from "@/components/AboutSecondSection";
import AboutThirdSection from "@/components/AboutThirdSection";
import InstagramVideoCarousel from "@/components/InstagramVideoCarousel";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cuisines, faqs, images, restaurant, reviews, specialties, type Dish } from "@/data/restaurant";

function Button({ children, href }: { children: ReactNode; href: string }) {
  return <Link className="btn btn-amber" href={href} data-cursor="EXPLORE">{children}<span>↗</span></Link>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const enter = (event: Event) => {
      const target = event.target as HTMLElement;
      const value = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (cursor.current) cursor.current.textContent = value || "";
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", enter); };
  }, []);
  return <div className="cursor-orb" ref={cursor} aria-hidden="true" />;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }, { threshold: .16 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Hero() {
  const slides = [images.hero, images.north, images.south, images.chinese];
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, [slides.length]);
  return <section className="hero-stage"><div className="hero-media">{slides.map((image, index) => <Image key={image.src} src={image.src} alt={image.alt} fill priority={index === 0} sizes="100vw" className={index === active ? "is-active" : ""} />)}</div><div className="hero-grid" /><div className="hero-copy"><Eyebrow>ATTIL MULTI CUISINE RESTAURANT</Eyebrow><h1>Where flavour<br /><em>meets the moment.</em></h1><p>Authentic global flavours, a warm table, and the feeling that dinner can be an occasion.</p><div className="hero-actions"><Button href="/menu">Explore menu</Button><Link href="/about" className="btn btn-outline">Discover Attil <span>↗</span></Link></div><div className="hero-dots">{slides.map((slide, index) => <button key={slide.src} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show hero slide ${index + 1}`} />)}</div></div><div className="hero-index">0{active + 1}<span>/ 04</span></div></section>;
}

function CuisineSection() {
  const [active, setActive] = useState(0);
  return <section className="section-wrap" id="cuisines"><Reveal className="section-intro"><div><Eyebrow>01 / THE FLAVOUR MAP</Eyebrow><h2>Many regions.<br /><em>One table.</em></h2></div><p>Specialized cuisines, familiar rituals, and a little room for discovery. Touch a region to see what is waiting.</p></Reveal><div className="cuisine-layout">{cuisines.map((cuisine, index) => <button key={cuisine.name} className={active === index ? "cuisine-tile active" : "cuisine-tile"} onClick={() => setActive(index)} data-cursor="VIEW"><Image src={cuisine.image.src} alt={cuisine.image.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /><span className="tile-shade" /><span className="tile-meta">{cuisine.label}</span><strong>{cuisine.name}</strong>{active === index && <span className="tile-detail"><small>{cuisine.description}</small><i>{cuisine.examples.join(" · ")}</i></span>}</button>)}</div></section>;
}

function SpecialtySlider() {
  const [active, setActive] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const dish = specialties[active];
  const move = (direction: number) => setActive((value) => (value + direction + specialties.length) % specialties.length);
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => setStart(event.clientX);
  const pointerUp = (event: PointerEvent<HTMLDivElement>) => { if (start === null) return; const delta = event.clientX - start; if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1); setStart(null); };
  return <section className="feature-band" id="specialties"><div className="section-wrap feature-inner"><Reveal className="section-intro"><div><Eyebrow>02 / SIGNATURES</Eyebrow><h2>Made to be<br /><em>remembered.</em></h2></div><div className="slider-arrows"><button onClick={() => move(-1)} aria-label="Previous dish">←</button><button onClick={() => move(1)} aria-label="Next dish">→</button></div></Reveal><div className="feature-card" onPointerDown={pointerDown} onPointerUp={pointerUp}><div className="feature-copy"><Eyebrow>FEATURED PLATE 0{active + 1}</Eyebrow><h3>{dish.name}</h3><p>{dish.description}</p><Button href="/menu">Explore this plate</Button></div><Image src={dish.image.src} alt={dish.image.alt} width={760} height={520} className="feature-image" /></div></div></section>;
}

function Reviews() {
  const [active, setActive] = useState(0);
  const review = reviews[active];
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % reviews.length), 7000); return () => window.clearInterval(timer); }, []);
  return <section className="section-wrap reviews-panel" id="reviews"><Reveal className="section-intro"><div><Eyebrow>03 / THE TABLE SPEAKS</Eyebrow><h2>Real words.<br /><em>Warm memories.</em></h2></div><p>Collected from the restaurant's published Google review content.</p></Reveal><div className="review-stage"><div className="review-rating"><strong>{restaurant.sourceReviewScore}</strong><span>★ ★ ★ ★ ★</span><small>Based on {restaurant.sourceReviewCount} reviews</small></div><div className="review-quote"><div className="animated-stars">{[0, 1, 2, 3, 4].map((star) => <span key={star} className={star < review.rating ? "lit" : ""} style={{ animationDelay: `${star * 120}ms` }}>★</span>)}</div><blockquote>{review.text}</blockquote><p>{review.name}</p><div className="review-controls"><button onClick={() => setActive((value) => (value + reviews.length - 1) % reviews.length)}>←</button><span>0{active + 1} / 0{reviews.length}</span><button onClick={() => setActive((value) => (value + 1) % reviews.length)}>→</button></div></div></div></section>;
}

function CTA() { return <section className="cta-panel" id="reserve"><div><Eyebrow>THE TABLE IS SET</Eyebrow><h2>Come hungry.<br /><em>Leave curious.</em></h2><p>Find Attil at the Theni Madurai Main Road junction, near Jakkampatti.</p></div><Button href="/contact">Plan your visit</Button></section>; }

export function HomePage() { return <><Cursor /><SharedNavbar /><main><Hero /><CuisineSection /><SpecialtySlider /><Reviews /><CTA /></main><SharedFooter /></>; }

function PageHero({ eyebrow, title, image = images.hero }: { eyebrow: string; title: ReactNode; image?: { src: string; alt: string } }) { return <section className="page-hero"><Image src={image.src} alt={image.alt} fill sizes="100vw" priority /><div className="page-hero-shade" /><div className="page-hero-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1></div></section>; }

export function MenuPage() { return <><Cursor /><SharedNavbar /><MenuExperience /><SharedFooter /></>; }

function Gallery() { const gallery = [images.interior, images.south, images.tandoor, images.biryani, images.grills]; const [active, setActive] = useState(0); return <section className="section-wrap gallery-section"><Reveal className="section-intro"><div><Eyebrow>THE ROOM / THE PLATE</Eyebrow><h2>Made for the<br /><em>whole table.</em></h2></div><a className="text-link" href={restaurant.instagram} target="_blank" rel="noreferrer">FOLLOW ON INSTAGRAM ↗</a></Reveal><div className="gallery-grid">{gallery.map((image, index) => <button key={image.src} className={active === index ? "gallery-item active" : "gallery-item"} onClick={() => setActive(index)} data-cursor="VIEW"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, 25vw" /></button>)}</div></section>; }

export function AboutPage() { return <><Cursor /><SharedNavbar /><PageHero eyebrow="A TABLE WITH A STORY" title={<>Where tradition<br /><em>keeps moving.</em></>} image={images.interior} /><AboutSecondSection /><AboutThirdSection /><InstagramVideoCarousel /><SharedFooter /></>; }

function ContactForm() { const [sent, setSent] = useState(false); return <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><Eyebrow>LET'S TALK FOOD</Eyebrow><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Phone<input required placeholder="Your number" /></label><label>Message<textarea required rows={4} placeholder="Tell us what is on your mind" /></label><button className="btn btn-amber" type="submit">{sent ? "Message received ✓" : "Send message ↗"}</button></form>; }

function ContactDetails() { return <div className="contact-details"><Eyebrow>FIND ATTIL</Eyebrow>{[["PHONE", restaurant.phone], ["EMAIL", restaurant.email], ["ADDRESS", restaurant.address]].map(([label, value]) => <div className="contact-line" key={label}><small>{label}</small><strong>{value}</strong></div>)}<div className="map-card"><div className="map-pin">ATTIL</div><span>9.97° N · 77.62° E</span><div className="map-actions"><button type="button">+</button><button type="button">−</button><a className="btn btn-outline" href={restaurant.maps} target="_blank" rel="noreferrer">Get directions ↗</a></div></div></div>; }

function FAQ() { const [open, setOpen] = useState<number | null>(null); return <section className="section-wrap faq-section"><Eyebrow>GOOD TO KNOW</Eyebrow><h2>Questions, <em>answered.</em></h2>{faqs.map((item, index) => <div className="faq-item" key={item.question}><button onClick={() => setOpen(open === index ? null : index)}>{item.question}<span>{open === index ? "−" : "+"}</span></button>{open === index && <p>{item.answer}</p>}</div>)}</section>; }

export function ContactPage() { return <><Cursor /><SharedNavbar /><PageHero eyebrow="COME FIND US" title={<>Let's make<br /><em>it a table.</em></>} image={images.contact} /><main className="section-wrap contact-layout"><ContactDetails /><ContactForm /></main><FAQ /><a className="whatsapp" href={`https://wa.me/91${restaurant.phone}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">◌</a><SharedFooter /></>; }
