"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Zap, Shield, Brain, Rocket, Eye, Star, ArrowRight, Play, Pause } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: "NeonCloud Pro",
    shortTitle: "Next-Gen Cloud Infrastructure",
    category: "Infrastructure",
    icon: Zap,
    description: "Enterprise-grade cloud infrastructure with AI optimization and quantum-ready security.",
    features: ["99.99% Uptime", "Auto-scaling", "Global CDN", "24/7 Support"],
    image: "https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg",
    video: "/videos/cloud-demo.mp4",
    longDescription: "NeonCloud Pro delivers unparalleled performance with our next-generation cloud infrastructure. Built for enterprises that demand reliability, scalability, and cutting-edge security features.",
    techStack: [
      { name: "Kubernetes", icon: "☸️" },
      { name: "Docker", icon: "🐳" },
      { name: "Terraform", icon: "🏗️" },
      { name: "Go", icon: "🔵" },
      { name: "gRPC", icon: "🌐" },
      { name: "Redis", icon: "🔄" }
    ],
    purpose: [
      "Scalable Microservices Deployment",
      "Container Orchestration",
      "Infrastructure as Code",
      "High-Performance Computing",
      "Real-time Data Processing"
    ]
  },
  {
    id: 2,
    name: "SecureShield AI",
    category: "Security",
    price: "$149/month",
    rating: 4.8,
    icon: Shield,
    description: "AI-powered cybersecurity platform with real-time threat detection and quantum encryption.",
    features: ["AI Threat Detection", "Zero-Day Protection", "Quantum Encryption", "Compliance Ready"],
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: "/videos/security-demo.mp4",
    longDescription: "SecureShield AI uses advanced machine learning algorithms to provide comprehensive protection against cyber threats, ensuring your data remains secure in an evolving digital landscape."
  },

];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [filter, setFilter] = useState('All');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  const toggleVideo = (productId: number) => {
    const video = videoRefs.current[productId];
    if (!video) return;

    if (playingVideo === String(productId)) {
      video.pause();
      setPlayingVideo(null);
    } else {
      // Pause all other videos
      Object.values(videoRefs.current).forEach(v => {
        if (v) v.pause();
      });
      
      video.currentTime = 0;
      video.play();
      setPlayingVideo(String(productId));
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = headerRef.current;
    const cards = cardsRef.current;

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

    // Cards stagger animation
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 100, rotationY: -10 });
      
      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 80%",
        onEnter: () => {
          gsap.to(cards, {
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredProducts]);

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black orbitron neon-text mb-6">
            Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our suite of cutting-edge products designed to accelerate your digital transformation
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={`rounded-2xl px-6 py-2 orbitron transition-all duration-300 ${
                  filter === category 
                    ? 'glass-strong neon-glow border-cyan-400/30' 
                    : 'glass hover:glass-strong'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              ref={el => el && (cardsRef.current[index] = el)}
              className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left side - Image/Video */}
                <div className="relative w-full lg:w-1/2 h-96 lg:h-auto overflow-hidden">
                  <div 
                    className="relative h-full w-full cursor-pointer"
                    onClick={() => toggleVideo(product.id)}
                  >
                    {/* Video element */}
                    <video
                      ref={el => videoRefs.current[product.id] = el}
                      src={product.video}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        playingVideo === String(product.id) ? 'opacity-100' : 'opacity-0'
                      }`}
                      loop
                      muted
                      playsInline
                    />
                    
                    {/* Fallback image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        playingVideo === String(product.id) ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    
                    {/* Play/Pause button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 hover:bg-black/40">
                      {playingVideo === String(product.id) ? (
                        <Pause className="w-16 h-16 text-white/90 hover:text-white transition-colors" />
                      ) : (
                        <Play className="w-16 h-16 text-white/90 hover:text-white transition-colors" />
                      )}
                    </div>
                  </div>
                  
                  <Badge className="absolute top-4 left-4 glass">
                    {product.category}
                  </Badge>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 glass rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Right side - Product info */}
                <div className="w-full lg:w-1/2 p-6 flex flex-col">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl orbitron group-hover:neon-text transition-all duration-300">
                        {product.name}
                      </CardTitle>
                      <product.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="glass text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-auto pt-6">
                        <Button 
                          onClick={() => setSelectedProduct(product)}
                          size="sm"
                          className="group/btn glass hover:neon-glow transition-all duration-300 rounded-xl w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-2xl font-bold orbitron neon-text">
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Product Detail Modal */}
        <Dialog 
          open={!!selectedProduct} 
          onOpenChange={() => setSelectedProduct(null)}
          className="w-full"
        >
          <DialogContent className="glass-strong border-2 border-cyan-400/30 rounded-3xl max-w-[95vw] w-full h-[90vh]">
            {selectedProduct && (
              <div className="flex flex-col md:flex-row h-full">
                {/* Left side - Content */}
                <div className="w-full md:w-2/3 p-6 overflow-y-auto">
                  <DialogHeader className="mb-8">
                    <div className="flex items-center space-x-4">
                      <selectedProduct.icon className="w-12 h-12 text-cyan-400" />
                      <div>
                        <DialogTitle className="text-3xl orbitron neon-text">
                          {selectedProduct.name}
                        </DialogTitle>
                        <p className="text-lg text-cyan-400 mt-1">
                          {selectedProduct.shortTitle}
                        </p>
                        <Badge className="glass mt-2">
                          {selectedProduct.category}
                        </Badge>
                      </div>
                    </div>
                    <DialogDescription className="text-lg text-muted-foreground mt-4">
                      {selectedProduct.longDescription}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tech Stack Section */}
                    <div>
                      <h4 className="text-xl font-bold orbitron mb-4">Tech Stack</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProduct.techStack?.map((tech, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center space-x-2 p-3 glass rounded-lg hover:neon-glow transition-all duration-300"
                          >
                            <span className="text-2xl">{tech.icon}</span>
                            <span className="text-sm">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Purpose Section */}
                    <div>
                      <h4 className="text-xl font-bold orbitron mb-4">Key Purpose</h4>
                      <div className="space-y-3">
                        {selectedProduct.purpose?.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center space-x-3 p-2 glass rounded-lg"
                          >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                            <span className="text-sm text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="mt-8">
                    <h4 className="text-xl font-bold orbitron mb-4">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="glass text-xs px-4 py-2"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side - Video */}
                <div className="w-full md:w-1/3 h-full relative border-l border-white/10">
                  <div className="sticky top-0 h-full">
                    <div 
                      className="relative h-full cursor-pointer group"
                      onClick={() => {
                        // Add fullscreen handling
                        const videoElement = document.getElementById(`product-video-${selectedProduct.id}`);
                        if (videoElement instanceof HTMLVideoElement) {
                          if (videoElement.requestFullscreen) {
                            videoElement.requestFullscreen();
                          }
                        }
                      }}
                    >
                      <video
                        id={`product-video-${selectedProduct.id}`}
                        src={selectedProduct.video}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        autoPlay
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}