"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const newsArticles = [
  {
    title: "Introducing Quantum-Ready SaaS Security",
    date: "Aug 10, 2025",
    category: "Security",
    description:
      "Our latest update integrates quantum-resistant encryption, ensuring your business stays ahead of future threats.",
    image:
      "https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "#",
  },
  {
    title: "AI Workflow Automation Now Live",
    date: "July 28, 2025",
    category: "AI",
    description:
      "Boost productivity with our new AI-powered automation engine, streamlining repetitive tasks effortlessly.",
    image:
      "https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "#",
  },
  {
    title: "Global Expansion to 150+ Countries",
    date: "June 15, 2025",
    category: "Growth",
    description:
      "Our platform is now available in more than 150 countries, empowering businesses worldwide.",
    image:
      "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "#",
  },
];

export default function NewsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const newsRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const header = headerRef.current;
    const cards = newsRefs.current;

    if (header) {
      gsap.from(header, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    }

    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 80%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <Newspaper className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
         <h1 className="text-5xl md:text-6xl font-yellow-bold orbitron neon-text mb-4">
  SaaS Product <span className="text-pink-400">News</span>
</h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest features, updates, and insights from
            our product team.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <Card
              key={index}
              ref={(el) => el && (newsRefs.current[index] = el)}
              className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="glass px-3 py-1 text-sm">
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                <h3 className="text-2xl font-bold orbitron group-hover:neon-text transition-all duration-300 mb-3">
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {article.description}
                </p>
                <Link
                  href={article.link}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
