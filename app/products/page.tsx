"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Zap, ArrowRight, Eye, Info } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: "TK Token",
    shortTitle: "Empowering Bangladesh's Digital Economy",
    category: "Financial",
    icon: Zap,
    description: "Purchase TK Token to empower Bangladesh's digital economy.",
    features: ["Buy with BNB Smart Chain", "Secure Transactions", "Empower Digital Economy"],
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    longDescription: "Our product is a cutting-edge Web3 platform designed to revolutionize the digital economy in Bangladesh. Built on the principles of decentralization and transparency, TK Token provides a secure and efficient way to conduct transactions. We leverage the power of blockchain technology to ensure that every transaction is immutable and tamper-proof.",
    techStack: [
      { name: "BNB Smart Chain", icon: "💰", description: "The backbone of our platform, providing a secure and scalable infrastructure for transactions." },
      { name: "Solidity", icon: "📜", description: "The smart contracts that power our token and ensure the integrity of the platform." },
      { name: "Next.js", icon: "⚛️", description: "The frontend of our application is built with Next.js for a fast and responsive user experience." },
      { name: "ethers.js", icon: "🔗", description: "We use ethers.js to interact with the BNB Smart Chain and manage wallet connections." }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video
  }
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products[0]) | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = headerRef.current;
    const cards = cardsRef.current;

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
  }, []);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-5">
            PRODUCTS
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our suite of cutting-edge products designed to accelerate your digital transformation. We focus on building decentralized applications using Web3 technologies to create a more open and transparent digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              ref={el => el && (cardsRef.current[index] = el)}
              className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden h-full relative"
            >
              <div className="flex flex-col lg:flex-row h-full">
                <div className="relative w-full lg:w-1/2 h-[580px] lg:h-[250px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 glass">
                    {product.category}
                  </Badge>
                </div>

                <div className="w-full lg:w-1/2 p-6 flex flex-col">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl orbitron group-hover:neon-text transition-all duration-300 text-green-500">
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
                    </div>
                  </CardContent>
                  <div className="mt-auto pt-6 flex gap-4">
                      <a href="https://adminpay.neonecy.com/" target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button 
                          size="sm"
                          className="group/btn glass hover:neon-glow transition-all duration-300 rounded-xl w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Buy Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </a>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedProduct(product)}
                        className="group/btn glass hover:neon-glow transition-all duration-300 rounded-xl w-full opacity-0 group-hover:opacity-100"
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Product Info
                      </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl w-full glass-strong border-2 border-cyan-400/30 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-3xl orbitron neon-text">{selectedProduct.name}</DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                {selectedProduct.longDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div>
                <h3 className="text-xl font-bold orbitron mb-4">Tech Stack</h3>
                <div className="space-y-4">
                  {selectedProduct.techStack.map((tech, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <span className="text-3xl">{tech.icon}</span>
                      <div>
                        <h4 className="font-bold">{tech.name}</h4>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold orbitron mb-4">Video</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={selectedProduct.videoUrl}
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
