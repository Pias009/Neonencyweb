"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "neonecy.agency@gmail.com",
    description: "Drop us a line anytime"
  },
  
 
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = headerRef.current;
    const form = formRef.current;
    const contact = contactRef.current;

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

    // Form animation
    if (form) {
      gsap.set(form, { opacity: 0, x: -50 });
      
      ScrollTrigger.create({
        trigger: form,
        start: "top 80%",
        onEnter: () => {
          gsap.to(form, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out"
          });
        }
      });
    }

    // Contact info animation
    if (contact.length > 0) {
      gsap.set(contact, { opacity: 0, y: 50 });
      
      ScrollTrigger.create({
        trigger: contact[0],
        start: "top 80%",
        onEnter: () => {
          gsap.to(contact, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    setIsLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black orbitron neon-text mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business? Lets start the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef}>
            <Card className="glass-strong border-2 border-white/10 hover:border-cyan-400/30 transition-all duration-500 rounded-3xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="w-8 h-8 text-cyan-400" />
                    <h2 className="text-3xl font-bold orbitron neon-text">
                      Send Message
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium orbitron">Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="glass rounded-xl border-2 border-white/10 focus:border-cyan-400/50 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium orbitron">Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="glass rounded-xl border-2 border-white/10 focus:border-cyan-400/50 transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium orbitron">Company</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className="glass rounded-xl border-2 border-white/10 focus:border-cyan-400/50 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium orbitron">Subject *</label>
                    <Select value={formData.subject} onValueChange={(value) => handleChange('subject', value)}>
                      <SelectTrigger className="glass rounded-xl border-2 border-white/10 focus:border-cyan-400/50 transition-all duration-300">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="glass-strong border-2 border-white/20 rounded-xl">
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium orbitron">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="glass rounded-xl border-2 border-white/10 focus:border-cyan-400/50 transition-all duration-300 min-h-[120px] resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full glass-strong hover:neon-glow transition-all duration-500 px-8 py-4 text-lg orbitron font-medium rounded-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span className="neon-text">Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                ref={el => el && (contactRef.current[index] = el)}
                className="glass-strong hover:neon-glow transition-all duration-300 rounded-3xl border-2 border-white/10 hover:border-cyan-400/30"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold orbitron mb-1">{info.title}</h3>
                      <p className="text-muted-foreground text-sm">{info.description}</p>
                      <p className="font-medium text-lg">{info.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

           

            {/* FAQ Link */}
            <Card className="glass-strong rounded-3xl border-2 border-white/10 p-6">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold orbitron mb-4">Quick Answers</h3>
                <p className="text-muted-foreground mb-4">
                  Looking for immediate help? Check out our frequently asked questions.
                </p>
                <Button 
                  variant="outline"
                  className="glass hover:glass-strong transition-all duration-300 rounded-xl orbitron font-medium"
                >
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}