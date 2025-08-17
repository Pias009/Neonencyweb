"use client";

import { BingiDevelopment } from './bingi-development';
import { NeonecyIntroMission } from './neonecy-intro-mission';
import { WhatMakesUsDifferent } from './what-makes-us-different';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black orbitron neon-text mb-4">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a team of innovators and creators, passionate about building the future of the web.
          </p>
        </div>
        <BingiDevelopment />
        <NeonecyIntroMission />
        <WhatMakesUsDifferent />
      </div>
    </div>
  );
}
