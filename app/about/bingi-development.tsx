"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BingiDevelopment() {
  const sectionRef = useRef<HTMLDivElement>(null);

  
  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20">
      <div className="md:col-span-1">
        <h2 className="text-4xl font-bold text-cyan-300 mb-4">BinGi Development</h2>
        <p className="text-lg text-white leading-relaxed">
          One of our flagship initiatives is the development of BinGi, a cutting-edge platform that aims to reshape the landscape of digital finance. BinGi offers seamless currency exchanges, secure transactions, and a user-friendly interface powered by the latest web and blockchain technologies.
        </p>
      </div>

      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-3d rounded-2xl p-6 border border-white/20 hover:neon-glow transition-all duration-300 flex flex-col items-start space-y-2 shadow-xl backdrop-blur-md transform hover:scale-105">
          <div className="w-10 h-10 flex items-center justify-center bg-cyan-400/10 rounded-full text-cyan-400">🏆</div>
          <h3 className="text-xl font-bold orbitron text-white">Big Project</h3>
          <p className="text-white text-sm">As we continue building and scaling BinGi, NEONECY is proud to be at the forefront of innovation</p>
        </div>

        <div className="glass-3d rounded-2xl p-6 border border-white/20 hover:neon-glow transition-all duration-300 flex flex-col items-start space-y-2 shadow-xl backdrop-blur-md transform hover:scale-105">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-400/10 rounded-full text-purple-400">👆</div>
          <h3 className="text-xl font-bold orbitron text-white">Best Project in Last Year</h3>
          <p className="text-white text-sm">As we continue building and scaling BinGi, NEONECY is proud to be at the forefront of innovation</p>
        </div>
      </div>
    </div>
  );
}
