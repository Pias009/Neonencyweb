"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hero = heroRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const button = buttonRef.current;

    if (hero && logo && text && button) {
      const tl = gsap.timeline();

      gsap.set([logo, text, button], { opacity: 0, y: 100 });

      tl.to(logo, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      })
        .to(
          text,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          button,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.to(logo, {
            scale: 1 - progress * 0.7,
            y: progress * -200,
            x: progress * -300,
            duration: 0.3,
            ease: "none",
          });

          gsap.to([text, button], {
            opacity: 1 - progress,
            y: progress * 50,
            duration: 0.3,
            ease: "none",
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Neon Glow Logo */}
       <div ref={logoRef} className="mb-8 flex justify-center">
  <div className="relative">
    <Image
      src="/images/logo.jpg"
      alt="Neonency Logo"
      width={200}
      height={200}
      priority // ensures logo is loaded immediately for better LCP
      className="object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.7)]"
    />
    <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" />
  </div>
</div>

        {/* Hero Text */}
        <div ref={textRef} className="mb-8 space-y-6">
          <h1 className="text-6xl md:text-8xl font-black orbitron neon-text leading-tight">
            NEONENCY
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Next-generation SaaS platform powered by NEONECY technology and
            inspired innovation
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI-Powered</span>
            </div>
            <div className="w-1 h-1 bg-purple-400 rounded-full" />
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Future-Ready</span>
            </div>
            <div className="w-1 h-1 bg-pink-400 rounded-full" />
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Innovation-First</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div ref={buttonRef}>
          <Button
            size="lg"
            className="group glass-strong hover:neon-glow transition-all duration-500 px-8 py-4 text-lg orbitron font-medium rounded-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60"
          >
            <span className="neon-text">Explore the Future</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 text-cyan-400" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
