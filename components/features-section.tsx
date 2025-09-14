"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Cpu, Rocket, Brain, Globe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Experience d blazing-fast performance with our optimized infrastructure and edge computing technology.",
  },
  {
    icon: Shield,
    title: "Ultra Secure",
    description:
      "Enterprise-grade security with end-to-end encryption and advanced threat protection systems.",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description:
      "Leverage artificial intelligence to automate workflows and gain intelligent insights from your data.",
  },
  {
    icon: Rocket,
    title: "Scalable",
    description:
      "Seamlessly scale from startup to enterprise with our flexible and robust cloud infrastructure.",
  },
  {
    icon: Brain,
    title: "Smart Analytics",
    description:
      "Advanced analytics and machine learning algorithms provide actionable business intelligence.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Worldwide CDN network ensures optimal performance and availability across all continents.",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards.length > 0) {
      // Set initial states
      gsap.set(cards, { opacity: 0, y: 100, rotationY: -15 });

      // Create scroll-triggered animation
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
      });

      // Parallax effect for cards
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const y = self.progress * (index % 2 === 0 ? -30 : 30);
            gsap.set(card, { y });
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black orbitron neon-text mb-6">Features</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the power of next-generation technology with features designed for the future
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:animate-pulse">
                    <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold orbitron mb-4 group-hover:neon-text transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
