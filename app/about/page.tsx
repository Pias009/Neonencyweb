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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              ref={el => el && (statsRef.current[index] = el)}
              className="glass-3d hover:neon-glow transition-transform duration-500 rounded-3xl border border-white/20 text-center p-8 shadow-xl backdrop-blur-md transform hover:scale-105"
            >
              <CardContent className="p-0">
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <div className="text-4xl font-black orbitron text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-white font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

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

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold orbitron text-cyan-400 mb-4">Meet Our Team</h2>
            <p className="text-xl text-white">Small, skilled, and passionate professionals delivering end-to-end solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                ref={el => el && (teamRef.current[index] = el)}
                className="group glass-3d hover:neon-glow transition-all duration-500 border border-white/20 rounded-3xl overflow-hidden transform hover:scale-105 shadow-2xl backdrop-blur-md"
              >
                <div className="relative">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover rounded-t-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold orbitron group-hover:text-cyan-400 transition-colors duration-300 mb-2">{member.name}</h3>
                  <Badge className="glass-3d text-white mb-4">{member.role}</Badge>
                  <p className="text-white text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      
          </div>
        </div>
      
  );
}
