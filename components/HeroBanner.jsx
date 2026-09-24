import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="home-hero" id="hero" aria-label="Attil restaurant introduction">
      <video className="home-hero-video" autoPlay muted loop playsInline poster="/images/hero.jpg" aria-hidden="true">
        <source src="/herovideo.mp4" type="video/mp4" />
      </video>
      <div className="home-hero-overlay" />
      <div className="home-hero-grid" />
      <div className="home-hero-copy">
        <p className="home-eyebrow">ATTIL MULTI CUISINE RESTAURANT</p>
        <h1>Welcome to <span className="home-hero-logo" aria-label="Attil"><Image src="/attil%20copy.png" alt="Attil" width={240} height={120} priority /></span></h1>
        <p>Where every plate carries a story, every spice has a purpose, and every table is made for staying awhile.</p>
        <div className="home-hero-actions">
          <a className="home-button home-button-amber" href="/menu">Explore menu <span>↗</span></a>
          <a className="home-button home-button-outline" href="#cuisines">View cuisines <span>↓</span></a>
        </div>
      </div>
      <div className="home-hero-meta"><span>EST. 2019</span><span>ANDIPATTI · TAMIL NADU</span><span>OPEN DAILY</span></div>
    </section>
  );
}