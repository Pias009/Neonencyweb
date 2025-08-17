'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Search, Code, Database, ArrowRight, Terminal } from 'lucide-react';

export default function ApiGenerator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            API Generator
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Generate robust and scalable APIs with our advanced tooling system
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Code, title: 'Multiple Endpoints', desc: 'Generate RESTful endpoints automatically' },
            { icon: Database, title: 'Database Integration', desc: 'Connect with various database systems' },
            { icon: Terminal, title: 'CLI Support', desc: 'Command-line interface for rapid development' },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border-2 border-gray-800 hover:border-cyan-500/30 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm"
            >
              <feature.icon className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search API endpoints..."
              className="w-full py-4 pl-12 pr-4 rounded-xl bg-gray-800/50 border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-300"
            />
          </div>
        </div>
      </main>

      {/* Coming Soon Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-400">
            We are working hard to bring you the next generation of API development tools.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}