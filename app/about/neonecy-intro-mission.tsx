"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function NeonecyIntroMission() {
  const sectionRef = useRef<HTMLDivElement>(null);

 

  return (
    <div ref={sectionRef} className="mb-20">
      {/* Introduction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <Image
            src="/images/neonecy-intro.jpg"
            alt="Neonecy Introduction"
            width={600}
            height={400}
            className="rounded-3xl shadow-xl glass-3d border border-white/20 w-full h-auto object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg text-cyan-300 mb-2">About us</h3>
          <h2 className="text-3xl md:text-4xl font-bold orbitron text-white mb-4">Neonecy Introduction</h2>
          <p className="text-white leading-relaxed">
            At NEONECY, we are a multidisciplinary digital agency that combines creativity, technology, and strategy to build meaningful digital experiences.
            Based in Bangladesh and serving clients globally, we specialize in delivering high-impact web development, digital marketing, UI/UX design, SEO, and branding solutions.
            Our team is passionate about helping businesses grow in the digital era with innovative, scalable, and results-driven strategies.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h3 className="text-lg text-cyan-300 mb-2">Our Mission</h3>
          <h2 className="text-3xl md:text-4xl font-bold orbitron text-white mb-4">Neonecy Mission</h2>
          <p className="text-white leading-relaxed">
            Our mission is to empower brands through powerful digital transformation. We aim to simplify technology for our clients and create impactful digital solutions
            that drive engagement, growth, and long-term success. Whether it&apos;s crafting custom websites, running data-driven ad campaigns, or enhancing online presence,
            we are committed to turning ideas into measurable results.
          </p>
        </div>
        <div>
          <Image
            src="/images/neonecy-mission.jpg"
            alt="Neonecy Mission"
            width={600}
            height={400}
            className="rounded-3xl shadow-xl glass-3d border border-white/20 w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}