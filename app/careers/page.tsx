"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, ArrowRight, Sparkles, Newspaper } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';


// Register ScrollTrigger plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const expertise = [
  {
    title: "Web 2.0 Development",
    description: "Building dynamic, responsive, and interactive websites using modern web technologies.",
    icon: "🪙",
  },
  {
    title: "Blockchain devlopment,",
    description: "Developing secure and scalable blockchain solutions, smart contracts, and decentralized applications.",

    icon: "🌐",
  },
  {
    title: "Web 3.0 Development",
    description: "Creating decentralized applications (dApps) with blockchain integration and smart contracts.",
    icon: "🪙",
  },
  {
    title: "MERN Stack Development",
    description: "Developing full-stack web applications with MongoDB, Express.js, React, and Node.js.",
    icon: "⚛️",
  },
  {
    title: "PHP Development",
    description: "Building robust server-side applications, APIs, and CMS platforms like WordPress.",
    icon: "🐘",
  },
  {
    title: "Flutter Development",
    description: "Creating cross-platform mobile apps with beautiful UI and smooth performance using Flutter.",
    icon: "📱",
  },
];

const jobs = [

  {
    id: 1,
    title: "Flutter Developer",
    department: "Mobile Development",
    location: "Remote / Worldwide",
    type: "Full-time",
    level: "Senior",
    description: "Develop cross-platform mobile applications with Flutter, implementing beautiful UIs and smooth animations while ensuring high performance.",
    skills: ["Flutter", "Dart", "Firebase", "State Management", "REST APIs"],
    salary: "$120k - $180k",
  },
  {
    id: 2,
    title: "MERN Stack Backend Developer",
    department: "Backend Development",
    location: "Remote / Worldwide",
    type: "Full-time",
    level: "Senior",
    description: "Build scalable backend systems using Node.js, Express, and MongoDB, focusing on API development, database optimization, and system architecture.",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Microservices"],
    salary: "$130k - $190k",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / Worldwide",
    type: "Full-time",
    level: "Mid-Senior",
    description: "Create intuitive user interfaces and engaging user experiences for our digital products, from wireframing to high-fidelity prototypes.",
    skills: ["Figma", "User Research", "Prototyping", "UI Design", "Design Systems"],
    salary: "$110k - $160k",
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

const productDetails = {
  appName: "NeoStack",
  title: "Web3 Development Framework",
  description: "A comprehensive development framework for building secure, scalable decentralized applications.",
  roadmap: [
    "Smart Contract Development & Integration",
    "Blockchain Network Setup",
    "Web3 Frontend Implementation",
    "Security Auditing & Testing",
    "Mainnet Deployment"
  ],
  technologies: [
    { name: "Solidity", icon: "⚡" },
    { name: "Hardhat", icon: "🔨" },
    { name: "IPFS", icon: "📦" },
    { name: "Ethers.js", icon: "🌐" },
    { name: "Web3.js", icon: "🔗" },
    { name: "OpenZeppelin", icon: "🛡️" }
  ]
};

export default function CombinedPage() {
  const newsRef = useRef<HTMLDivElement>(null);
  const expertiseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations only on client side
    if (typeof window === "undefined") return;

    // Cleanup function
    const cleanup = () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

    // News header animation
    if (newsRef.current) {
      gsap.from(newsRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Expertise cards animation
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

    // Careers header animation
    if (headerRef.current) {
      gsap.from(headerRef.current, { 
        opacity: 0, 
        y: 60, 
        duration: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      });
    }

    // Job listings animation
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

    // Benefits section animation
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

    return cleanup;
  }, []);

  return (
    <div className="px-4 pt-32 pb-16 max-w-7xl mx-auto">
      {/* Product Section */}
      <div className="mb-32">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <TypeAnimation
              sequence={[
                productDetails.appName,
                1000,
                `${productDetails.appName} - ${productDetails.title}`,
                2000,
              ]}
              wrapper="h1"
              speed={50}
              className="text-4xl md:text-5xl font-bold orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
              repeat={1}
            />
            <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
              {productDetails.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Roadmap */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Development Roadmap</h3>
              <div className="space-y-4">
                {productDetails.roadmap.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      {index + 1}
                    </div>
                    <p className="text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                {productDetails.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6 mb-32">
        <h2 className="text-4xl font-bold orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 text-center">
          Open Positions
        </h2>
        {jobs.map((job, index) => (
          <Card
            key={job.id}
            ref={el => jobsRef.current[index] = el}
            className="group bg-gradient-to-br from-gray-900 to-gray-800 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-500 border border-gray-700 hover:border-cyan-400/30 rounded-3xl overflow-hidden"
          >
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <CardTitle className="text-2xl orbitron group-hover:text-cyan-400 transition-all duration-300">
                      {job.title}
                    </CardTitle>
                    <Badge className="bg-gray-700">{job.level}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-gray-700 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="md:ml-8 flex flex-col items-end gap-4">
                  <a 
                    href={`mailto:neonency.agency@gmail.com?subject=Application for ${job.title}&body=I am interested in the ${job.title} position at Neonency.%0D%0A%0D%0APosition Details:%0D%0A- Role: ${job.title}%0D%0A- Department: ${job.department}%0D%0A- Level: ${job.level}%0D%0A%0D%0APlease find my application attached.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="group/btn bg-cyan-600 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 rounded-xl px-6 py-3 orbitron font-medium">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Expertise / Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {expertise.map((item, index) => (
          <div
            key={index}
            ref={el => expertiseRefs.current[index] = el}
            className="p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 hover:border-cyan-400 hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Product Details - New Section */}
      <div className="mb-32">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <TypeAnimation
              sequence={[
                productDetails.appName,
                1000,
                `${productDetails.appName} - ${productDetails.title}`,
                2000,
              ]}
              wrapper="h1"
              speed={50}
              className="text-4xl md:text-5xl font-bold orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
              repeat={1}
            />
            <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
              {productDetails.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Roadmap */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Development Roadmap</h3>
              <div className="space-y-4">
                {productDetails.roadmap.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      {index + 1}
                    </div>
                    <p className="text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                {productDetails.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-cyan-600 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 rounded-xl px-8 py-3">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Careers Header */}
      <div ref={headerRef} className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Careers
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Join our team of innovators and help build the future of SaaS technology
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>100+ Team Members</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span>Remote-First</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span>Innovation-Driven</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div ref={benefitsRef} className="mb-20">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 text-center">
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-800 rounded-2xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}