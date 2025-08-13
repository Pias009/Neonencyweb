"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, ArrowRight, Sparkles, Newspaper } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Expertise / Skills Data
const expertise = [
  {
    title: "Web 2.0 Development",
    description:
      "Building dynamic, responsive, and interactive websites using modern web technologies.",
    icon: "🌐",
  },
  {
    title: "Web 3.0 Development",
    description:
      "Creating decentralized applications (dApps) with blockchain integration and smart contracts.",
    icon: "🪙",
  },
  {
    title: "MERN Stack Development",
    description:
      "Developing full-stack web applications with MongoDB, Express.js, React, and Node.js.",
    icon: "⚛️",
  },
  {
    title: "PHP Development",
    description:
      "Building robust server-side applications, APIs, and CMS platforms like WordPress.",
    icon: "🐘",
  },
  {
    title: "Flutter Development",
    description:
      "Creating cross-platform mobile apps with beautiful UI and smooth performance using Flutter.",
    icon: "📱",
  },
];

// Careers Data
const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    level: "Senior",
    description:
      "Join our engineering team to build next-generation SaaS products with cutting-edge technology.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL"],
    salary: "$150k - $200k",
  },
  {
    id: 2,
    title: "AI/ML Research Scientist",
    department: "Research",
    location: "New York / Remote",
    type: "Full-time",
    level: "Senior",
    description:
      "Lead AI research initiatives and develop machine learning models for our product ecosystem.",
    skills: ["Python", "TensorFlow", "PyTorch", "ML Ops", "Statistics"],
    salary: "$180k - $250k",
  },
  {
    id: 3,
    title: "Product Designer",
    department: "Design",
    location: "Los Angeles / Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "Design beautiful, intuitive user experiences that delight our customers and drive business growth.",
    skills: ["Figma", "Prototyping", "User Research", "Design Systems", "3D Design"],
    salary: "$120k - $160k",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Seattle / Remote",
    type: "Full-time",
    level: "Senior",
    description:
      "Build and maintain scalable infrastructure to support our growing platform and user base.",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "Monitoring"],
    salary: "$140k - $180k",
  },
  {
    id: 5,
    title: "Marketing Director",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    level: "Director",
    description:
      "Lead marketing initiatives and build brand awareness for our innovative SaaS platform.",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Content", "Growth"],
    salary: "$160k - $220k",
  },
  {
    id: 6,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Chicago / Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "Help our customers achieve success and drive growth through strategic partnerships.",
    skills: ["Communication", "Analytics", "CRM", "Project Management", "SaaS"],
    salary: "$80k - $110k",
  },
];

const benefits = [
  "Competitive salary + equity",
  "Unlimited PTO",
  "Premium health insurance",
  "Remote-first culture",
  "Learning stipend",
  "Top-tier equipment",
  "Flexible hours",
  "Team retreats",
];

export default function CombinedPage() {
  const newsRef = useRef(null);
  const expertiseRefs = useRef([]);
  const headerRef = useRef(null);
  const jobsRef = useRef([]);
  const benefitsRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Animate News Header
    if (newsRef.current) {
      gsap.from(newsRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Animate Expertise
    if (expertiseRefs.current.length) {
      gsap.set(expertiseRefs.current, { opacity: 0, y: 60 });
      ScrollTrigger.create({
        trigger: expertiseRefs.current[0],
        start: "top 85%",
        onEnter: () => {
          gsap.to(expertiseRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
      });
    }

    // Animate Careers Header
    if (headerRef.current) {
      gsap.from(headerRef.current, { opacity: 0, y: 60, duration: 1 });
    }

    // Animate Jobs
    if (jobsRef.current.length) {
      gsap.set(jobsRef.current, { opacity: 0, y: 80 });
      ScrollTrigger.create({
        trigger: jobsRef.current[0],
        start: "top 80%",
        onEnter: () => {
          gsap.to(jobsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    }

    // Animate Benefits
    if (benefitsRef.current) {
      gsap.set(benefitsRef.current, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: benefitsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(benefitsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="px-4 pt-32 pb-16 max-w-7xl mx-auto">
      {/* SaaS Product News */}
      <div ref={newsRef} className="text-center mb-20">
        <Newspaper className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h1 className="text-5xl md:text-6xl font-yellow orbitron text-yellow-400 drop-shadow-lg mb-4">
          SaaS Product News
        </h1>
        <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
          Stay updated with the latest features, updates, and insights from our product team.
        </p>
      </div>

      {/* Expertise / Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {expertise.map((item, index) => (
          <div
            key={index}
            ref={(el) => (expertiseRefs.current[index] = el)}
            className="p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 hover:border-cyan-400 hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Careers Header */}
      <div ref={headerRef} className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-black orbitron neon-text mb-6">
          Careers
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Join our team of innovators and help build the future of SaaS technology
        </p>
        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>100+ Team Members</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span>Remote-First</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span>Innovation-Driven</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div ref={benefitsRef} className="mb-20">
        <div className="glass-strong rounded-3xl p-8 border-2 border-white/10">
          <h2 className="text-3xl font-bold orbitron neon-text mb-8 text-center">
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 glass rounded-2xl hover:neon-glow transition-all duration-300"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold orbitron neon-text mb-8 text-center">
          Open Positions
        </h2>
        {jobs.map((job, index) => (
          <Card
            key={job.id}
            ref={(el) => (jobsRef.current[index] = el)}
            className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden"
          >
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <CardTitle className="text-2xl orbitron group-hover:neon-text transition-all duration-300">
                      {job.title}
                    </CardTitle>
                    <Badge className="glass">{job.level}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="glass text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="md:ml-8 flex flex-col items-end space-y-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold orbitron neon-text">
                      {job.salary}
                    </div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                  <Button className="group/btn glass hover:neon-glow transition-all duration-300 rounded-xl px-6 py-3 orbitron font-medium">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
