"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    level: "Senior",
    description: "Join our engineering team to build next-generation SaaS products with cutting-edge technology.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL"],
    salary: "$150k - $200k"
  },
  {
    id: 2,
    title: "AI/ML Research Scientist",
    department: "Research",
    location: "New York / Remote",
    type: "Full-time",
    level: "Senior",
    description: "Lead AI research initiatives and develop machine learning models for our product ecosystem.",
    skills: ["Python", "TensorFlow", "PyTorch", "ML Ops", "Statistics"],
    salary: "$180k - $250k"
  },
  {
    id: 3,
    title: "Product Designer",
    department: "Design",
    location: "Los Angeles / Remote",
    type: "Full-time",
    level: "Mid",
    description: "Design beautiful, intuitive user experiences that delight our customers and drive business growth.",
    skills: ["Figma", "Prototyping", "User Research", "Design Systems", "3D Design"],
    salary: "$120k - $160k"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Seattle / Remote",
    type: "Full-time",
    level: "Senior",
    description: "Build and maintain scalable infrastructure to support our growing platform and user base.",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "Monitoring"],
    salary: "$140k - $180k"
  },
  {
    id: 5,
    title: "Marketing Director",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    level: "Director",
    description: "Lead marketing initiatives and build brand awareness for our innovative SaaS platform.",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Content", "Growth"],
    salary: "$160k - $220k"
  },
  {
    id: 6,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Chicago / Remote",
    type: "Full-time",
    level: "Mid",
    description: "Help our customers achieve success and drive growth through strategic partnerships.",
    skills: ["Communication", "Analytics", "CRM", "Project Management", "SaaS"],
    salary: "$80k - $110k"
  }
];

const benefits = [
  "Competitive salary + equity",
  "Unlimited PTO",
  "Premium health insurance",
  "Remote-first culture",
  "Learning stipend",
  "Top-tier equipment",
  "Flexible hours",
  "Team retreats"
];

export default function CareersPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement[]>([]);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = headerRef.current;
    const jobs = jobsRef.current;
    const benefits = benefitsRef.current;

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

    // Jobs stagger animation
    if (jobs.length > 0) {
      gsap.set(jobs, { opacity: 0, y: 80 });
      
      ScrollTrigger.create({
        trigger: jobs[0],
        start: "top 80%",
        onEnter: () => {
          gsap.to(jobs, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
          });
        }
      });
    }

    // Benefits animation
    if (benefits) {
      gsap.set(benefits, { opacity: 0, y: 50 });
      
      ScrollTrigger.create({
        trigger: benefits,
        start: "top 80%",
        onEnter: () => {
          gsap.to(benefits, {
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

        {/* Benefits Section */}
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
              ref={el => el && (jobsRef.current[index] = el)}
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
                    
                    <Button 
                      className="group/btn glass hover:neon-glow transition-all duration-300 rounded-xl px-6 py-3 orbitron font-medium"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-strong rounded-3xl p-12 border-2 border-white/20 hover:border-cyan-400/30 transition-all duration-500">
            <h3 className="text-3xl font-bold orbitron neon-text mb-4">
              Don't See Your Role?
            </h3>
            <p className="text-xl text-muted-foreground mb-6">
              We're always looking for talented individuals to join our team.
            </p>
            <Button 
              size="lg"
              className="glass-strong hover:neon-glow transition-all duration-500 px-8 py-4 text-lg orbitron font-medium rounded-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60"
            >
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}