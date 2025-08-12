"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (navRef.current && typeof window !== "undefined") {
      const nav = navRef.current;

      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          if (self.direction === 1) {
            // Scrolling down
            gsap.to(nav, {
              y: -100,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            // Scrolling up
            gsap.to(nav, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      });

      ScrollTrigger.create({
        start: "top -200",
        onToggle: (self) => {
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              scale: self.isActive ? 0.6 : 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (!mounted) return null;

  const isAdmin = pathname.startsWith("/admin");

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass-strong rounded-b-3xl mx-4 mt-2"
    >
      <div className="flex items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div
            ref={logoRef}
            className="transition-transform duration-300 relative w-10 h-10"
          >
            <Image
              src="/images/logo.jpg"
              alt="Neonency Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <span className="text-2xl font-bold orbitron neon-text group-hover:animate-pulse">
            NEONENCY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {!isAdmin &&
            navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 hover:glass hover:neon-glow group ${
                  pathname === item.href ? "glass neon-glow" : ""
                }`}
              >
                <span className="orbitron font-medium group-hover:neon-text transition-all duration-300">
                  {item.label}
                </span>
              </Link>
            ))}

          {!isAdmin && (
            <Link
              href="/admin"
              className="px-6 py-2 rounded-xl glass-strong hover:neon-glow transition-all duration-300 orbitron font-medium"
            >
              Admin
            </Link>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="glass rounded-xl hover:neon-glow transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-purple-400" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="glass rounded-xl"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-purple-400" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="glass rounded-xl"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-6 pb-6 space-y-4 px-4">
          {!isAdmin &&
            navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-all duration-300 hover:glass hover:neon-glow ${
                  pathname === item.href ? "glass neon-glow" : ""
                }`}
              >
                <span className="orbitron font-medium">{item.label}</span>
              </Link>
            ))}

          {!isAdmin && (
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl glass-strong hover:neon-glow transition-all duration-300"
            >
              <span className="orbitron font-medium">Admin</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
