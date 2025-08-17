"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const differentItems = [
  { title: "Client-Centric Approach", desc: "We start every project by understanding your unique business needs. No one-size-fits-all solutions." },
  { title: "Full Digital Services", desc: "From web development and UI/UX design to SEO, branding, and marketing — everything under one roof." },
  { title: "Agile & Transparent Process", desc: "Our agile workflow keeps you in the loop at every step with clear progress tracking and quick iterations." },
  { title: "Innovation with Purpose", desc: "We embrace new technologies and creative thinking, but always in service of meaningful results." }
];

export function WhatMakesUsDifferent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  

  return (
    <div ref={sectionRef} className="text-center mb-12">
      <h3 className="text-lg text-cyan-300 mb-2">Our Mission</h3>
      <h2 className="text-3xl md:text-4xl font-bold orbitron text-white mb-4">What Makes NEONECY Different</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {differentItems.map((item, i) => (
          <div
            key={i}
            className="glass-3d p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md hover:neon-glow transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-bold orbitron text-white mb-3">{item.title}</h3>
            <p className="text-white text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
