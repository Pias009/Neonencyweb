"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const content = contentRef.current;

    if (section && content) {
      gsap.set(content, { opacity: 0, y: 50, scale: 0.95 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div
          ref={contentRef}
          className="relative glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center border-2 border-white/20 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          />

          <div className="relative z-10">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-cyan-400 animate-pulse" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black orbitron neon-text mb-4 sm:mb-6">
              Ready to Experience the Future?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using NEONENCY to transform
              their business with cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto group glass-strong hover:neon-glow transition-all duration-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg orbitron font-medium rounded-xl sm:rounded-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60"
                >
                  <span className="neon-text">Get Started Today</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300 text-cyan-400" />
                </Button>
              </Link>

              <Link href="/products" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto glass hover:glass-strong transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg orbitron font-medium rounded-xl sm:rounded-2xl"
                >
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
