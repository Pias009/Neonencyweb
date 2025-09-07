"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import LoadingAnimation from '@/components/loading-animation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LoadingAnimation />
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Toaster />
    </ThemeProvider>
  );
}
