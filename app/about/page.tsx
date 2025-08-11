"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Zap, Globe, Award, TrendingUp } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: "1M+", label: "Active Users", icon: Users },
  { number: "99.9%", label: "Uptime", icon: Zap },
  { number: "150+", label: "Countries", icon: Globe },
  { number: "50+", label: "Collub", icon: Award }
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
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = headerRef.current;
    const stats = statsRef.current;
    const team = teamRef.current;
    const mission = missionRef.current;

    // Header animation
    if (header) {
      gsap.from(header, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
    }

    // Stats animation
    if (stats.length > 0) {
      gsap.set(stats, { opacity: 0, scale: 0.8 });
      
      ScrollTrigger.create({
        trigger: stats[0],
        start: "top 80%",
        onEnter: () => {
          gsap.to(stats, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
          });
        }
      });
    }

    // Team animation
    if (team.length > 0) {
      gsap.set(team, { opacity: 0, y: 80, rotationY: -15 });
      
      ScrollTrigger.create({
        trigger: team[0],
        start: "top 80%",
        onEnter: () => {
          gsap.to(team, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
          });
        }
      });
    }

    // Mission animation
    if (mission) {
      gsap.set(mission, { opacity: 0, y: 50 });
      
      ScrollTrigger.create({
        trigger: mission,
        start: "top 80%",
        onEnter: () => {
          gsap.to(mission, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black orbitron neon-text mb-6">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Were building the future of SaaS with cutting-edge technology and neon-powered innovation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              ref={el => el && (statsRef.current[index] = el)}
              className="glass-strong hover:neon-glow transition-all duration-300 rounded-3xl border-2 border-white/10 text-center p-8"
            >
              <CardContent className="p-0">
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <div className="text-4xl font-black orbitron neon-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div ref={missionRef} className="mb-20">
          <div className="glass-strong rounded-3xl p-12 border-2 border-white/10 text-center">
            <Target className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold orbitron neon-text mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              To revolutionize how businesses operate by providing cutting-edge SaaS solutions that combine artificial intelligence, 
              quantum-ready security, and intuitive design. We believe technology should empower, not complicate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="glass px-4 py-2 text-sm">Innovation First</Badge>
              <Badge className="glass px-4 py-2 text-sm">User-Centric</Badge>
              <Badge className="glass px-4 py-2 text-sm">Security Focused</Badge>
              <Badge className="glass px-4 py-2 text-sm">Global Impact</Badge>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold orbitron neon-text mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              Talented individuals united by a passion for innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                ref={el => el && (teamRef.current[index] = el)}
                className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold orbitron group-hover:neon-text transition-all duration-300 mb-2">
                    {member.name}
                  </h3>
                  <Badge className="glass mb-4">{member.role}</Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-strong rounded-3xl border-2 border-white/10 p-8 text-center">
            <CardContent className="p-0">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold orbitron mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                Pushing boundaries with cutting-edge technology and forward-thinking solutions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong rounded-3xl border-2 border-white/10 p-8 text-center">
            <CardContent className="p-0">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold orbitron mb-4">Collaboration</h3>
              <p className="text-muted-foreground">
                Building amazing products through teamwork and shared expertise.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong rounded-3xl border-2 border-white/10 p-8 text-center">
            <CardContent className="p-0">
              <TrendingUp className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold orbitron mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                Delivering the highest quality solutions that exceed expectations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}