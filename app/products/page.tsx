"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Zap, Shield, Brain, Rocket, Eye, Star, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: "NeonCloud Pro",
    category: "Infrastructure",
    price: "$99/month",
    rating: 4.9,
    icon: Zap,
    description: "Enterprise-grade cloud infrastructure with AI optimization and quantum-ready security.",
    features: ["99.99% Uptime", "Auto-scaling", "Global CDN", "24/7 Support"],
    image: "https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg?auto=compress&cs=tinysrgb&w=800",
    longDescription: "NeonCloud Pro delivers unparalleled performance with our next-generation cloud infrastructure. Built for enterprises that demand reliability, scalability, and cutting-edge security features."
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
    longDescription: "SecureShield AI uses advanced machine learning algorithms to provide comprehensive protection against cyber threats, ensuring your data remains secure in an evolving digital landscape."
  },
  {
    id: 3,
    name: "IntelliAnalytics",
    category: "Analytics",
    price: "$199/month",
    rating: 4.9,
    icon: Brain,
    description: "Advanced AI analytics platform for predictive insights and intelligent business decisions.",
    features: ["Predictive Analytics", "Real-time Insights", "Custom Dashboards", "ML Models"],
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
    longDescription: "IntelliAnalytics transforms your data into actionable insights using state-of-the-art machine learning and predictive analytics to drive informed business decisions."
  },
  {
    id: 4,
    name: "RocketDeploy",
    category: "DevOps",
    price: "$79/month",
    rating: 4.7,
    icon: Rocket,
    description: "Lightning-fast deployment platform with automated CI/CD and container orchestration.",
    features: ["One-Click Deploy", "Auto CI/CD", "Container Support", "Blue-Green Deploy"],
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800",
    longDescription: "RocketDeploy streamlines your deployment process with advanced automation, making it easier than ever to ship code fast and reliably across any environment."
  }
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [filter, setFilter] = useState('All');
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              ref={el => el && (cardsRef.current[index] = el)}
              className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 glass">
                  {product.category}
                </Badge>
                <div className="absolute top-4 right-4 flex items-center space-x-1 glass rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl orbitron group-hover:neon-text transition-all duration-300">
                    {product.name}
                  </CardTitle>
                  <product.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="glass text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-2xl font-bold orbitron neon-text">
                      {product.price}
                    </span>
                    <Button 
                      size="sm"
                      className="group/btn glass hover:neon-glow transition-all duration-300 rounded-xl"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Detail Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="glass-strong border-2 border-cyan-400/30 rounded-3xl max-w-2xl">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <selectedProduct.icon className="w-12 h-12 text-cyan-400" />
                    <div>
                      <DialogTitle className="text-3xl orbitron neon-text">
                        {selectedProduct.name}
                      </DialogTitle>
                      <Badge className="glass mt-2">{selectedProduct.category}</Badge>
                    </div>
                  </div>
                  <DialogDescription className="text-lg text-muted-foreground">
                    {selectedProduct.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded-2xl"
                  />

                  <div>
                    <h4 className="text-xl font-bold orbitron mb-4">Key Features</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold orbitron neon-text">
                        {selectedProduct.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium">{selectedProduct.rating}</span>
                      </div>
                    </div>
                    <Button 
                      className="glass-strong hover:neon-glow transition-all duration-300 rounded-xl px-8 py-3 orbitron font-medium"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}