"use client";

import { useState } from "react";
import { faqs } from "@/data/restaurant";

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return <section className="section-wrap faq-section" aria-labelledby="faq-heading">
    <p className="eyebrow">GOOD TO KNOW</p>
    <h2 id="faq-heading">Questions, <em>answered.</em></h2>
    {faqs.map((item, index) => <div className="faq-item" key={item.question}>
      <button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>
        {item.question}
        <span>{open === index ? "−" : "+"}</span>
      </button>
      {open === index && <p>{item.answer}</p>}
    </div>)}
  </section>;
}
