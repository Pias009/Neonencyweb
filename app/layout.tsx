import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainLayout from '@/components/main-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'NEONENCY - Futuristic SaaS Solutions',
  description: 'Next-generation SaaS platform with cutting-edge technology and neon-powered innovation.',
  keywords: 'SaaS, technology, neon, futuristic, innovation',
  openGraph: {
    title: 'NEONENCY - Futuristic SaaS Solutions',
    description: 'Next-generation SaaS platform with cutting-edge technology and neon-powered innovation.',
    type: 'website',
    locale: 'en_US',
    siteName: 'NEONENCY',
  },
  
  icons: {
    icon: '/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}