"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const reviews = [
  { name: "Mansur Ilahi", image: "/images/review1.png", text: "Lunch at Attil was nothing short of spectacular. The chicken briyani was perfectly cooked and beautifully presented.", rating: 5 },
  { name: "Priya S.", image: "/images/review2.png", text: "A warm atmosphere, generous portions, and flavours that made the whole family want to come back.", rating: 5 },
  { name: "Arun Kumar", image: "/images/review3.jpg", text: "The grills were smoky and tender, and the service made the evening feel effortless.", rating: 5 },
];

function Stars({ rating, active }) {
  return <div className={`home-stars ${active ? "is-active" : ""}`} aria-label={`${rating} out of 5 stars`}>{[0, 1, 2, 3, 4].map((star) => <span key={star} style={{ animationDelay: `${star * 110}ms` }}>★</span>)}</div>;
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % reviews.length), 2000); return () => window.clearInterval(timer); }, []);

  const visibleReviews = [reviews[active], reviews[(active + 1) % reviews.length]];
  return <section className="home-section home-reviews" id="reviews"><div className="home-section-heading"><div><p className="home-eyebrow">02 / THE TABLE SPEAKS</p><h2>Real words.<br /><em>Warm memories.</em></h2></div><p>Good food is best remembered through the people who shared it. A few words from the Attil table.</p></div><div className="home-review-carousel" aria-live="polite">{visibleReviews.map((review, index) => <article className={`home-review-card ${index === 0 ? "is-focused" : "is-muted"}`} key={`${review.name}-${active}`}><div className="home-review-person"><Image src={review.image} alt={review.name} width={64} height={64} /><div><strong>{review.name}</strong><small>Verified guest</small></div></div><Stars rating={review.rating} active={index === 0} /><p>“{review.text}”</p></article>)}</div><div className="home-review-footer"><strong>4.3</strong><span>★ ★ ★ ★ ★</span><small>Based on 263 reviews · {active + 1} / {reviews.length}</small></div></section>;
}