"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, Globe2, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: "1M+", label: "Active Users", icon: Users },
  { number: "99.9%", label: "Uptime", icon: Zap },
  { number: "150+", label: "Countries", icon: Globe2 },
  { number: "50+", label: "Collaborations", icon: Award }
];

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech, previously at Google and Tesla.",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Sarah Johnson",
    role: "CTO",
    bio: "Former SpaceX engineer specializing in scalable systems and AI.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Design",
    bio: "Award-winning designer with experience at Apple and Airbnb.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Emily Wang",
    role: "VP of Engineering",
    bio: "Full-stack expert and open-source contributor with 12+ years experience.",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];


export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const teamRef = useRef<HTMLDivElement[]>([]);
  const servicesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = headerRef.current;

    if (header) gsap.from(header, { opacity: 0, y: 100, duration: 1, ease: "power3.out", delay: 0.2 });

    if (statsRef.current.length > 0) {
      gsap.set(statsRef.current, { opacity: 0, scale: 0.8 });
      ScrollTrigger.create({ trigger: statsRef.current[0], start: "top 80%", onEnter: () => gsap.to(statsRef.current, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }) });
    }

    if (teamRef.current.length > 0) {
      gsap.set(teamRef.current, { opacity: 0, y: 80 });
      ScrollTrigger.create({ trigger: teamRef.current[0], start: "top 80%", onEnter: () => gsap.to(teamRef.current, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }) });
    }

    if (servicesRef.current.length > 0) {
      gsap.set(servicesRef.current, { opacity: 0, y: 60 });
      ScrollTrigger.create({ trigger: servicesRef.current[0], start: "top 80%", onEnter: () => gsap.to(servicesRef.current, { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power3.out" }) });
    }

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <div className="pt-32 pb-16 px-4 bg-gray-1000">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl orbitron text-cyan-300 text-whit mb-6">About Us</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            We bridge Web2 and Web3 technologies, offering SaaS, PHP, MERN, and Flutter development to deliver innovative digital solutions.
          </p>
        </div>

        {/* Stats */}
      

        {/* BinGi Development */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20">
          <div className="md:col-span-1">
            <h2 className="text-4xl font-bold orbitron text-cyan-400 mb-4">BinGi Development</h2>
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
        {/* Neonecy Intro & Mission Section */}
<div className="mb-20">
  {/* Introduction */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
    <div>
      <img
        src="/images/neonecy-intro.jpg"
        alt="Neonecy Introduction"
        className="rounded-3xl shadow-xl glass-3d border border-white/20 w-full h-auto object-cover"
      />
    </div>
    <div>
      <h3 className="text-lg text-cyan-300 mb-2">About us</h3>
      <h2 className="text-3xl md:text-4xl font-bold orbitron text-white mb-4">Neonecy Introduction</h2>
      <p className="text-white/80 leading-relaxed">
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
      <p className="text-white/80 leading-relaxed">
        Our mission is to empower brands through powerful digital transformation. We aim to simplify technology for our clients and create impactful digital solutions
        that drive engagement, growth, and long-term success. Whether it’s crafting custom websites, running data-driven ad campaigns, or enhancing online presence,
        we are committed to turning ideas into measurable results.
      </p>
    </div>
    <div>
      <img
        src="/images/neonecy-mission.jpg"
        alt="Neonecy Mission"
        className="rounded-3xl shadow-xl glass-3d border border-white/20 w-full h-auto object-cover"
      />
    </div>
  </div>

  {/* What Makes Us Different */}
  <div className="text-center mb-12">
    <h3 className="text-lg text-cyan-300 mb-2">Our Mission</h3>
    <h2 className="text-3xl md:text-4xl font-bold orbitron text-white mb-4">What Makes NEONECY Different</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      { title: "Client-Centric Approach", desc: "We start every project by understanding your unique business needs. No one-size-fits-all solutions." },
      { title: "Full Digital Services", desc: "From web development and UI/UX design to SEO, branding, and marketing — everything under one roof." },
      { title: "Agile & Transparent Process", desc: "Our agile workflow keeps you in the loop at every step with clear progress tracking and quick iterations." },
      { title: "Innovation with Purpose", desc: "We embrace new technologies and creative thinking, but always in service of meaningful results." }
    ].map((item, i) => (
      <div
        key={i}
        className="glass-3d p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md hover:neon-glow transform hover:scale-105 transition-all duration-300"
      >
        <h3 className="text-xl font-bold orbitron text-white mb-3">{item.title}</h3>
        <p className="text-white/80 text-sm">{item.desc}</p>
      </div>
    ))}
  </div>
</div>


      

      
          </div>
        </div>
      
  );
}
