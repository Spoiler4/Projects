import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Footer } from '@/components/layout/Footer';
import { AIWidget } from '@/components/sections/AIWidget';

export const metadata: Metadata = {
  title: 'Charles — Senior Full Stack Developer & Software Engineer',
  description: 'World-class portfolio featuring cutting-edge Next.js, Three.js, and Mobile App development.',
  openGraph: {
    title: 'Charles — Senior Full Stack Developer',
    description: 'Explore the futuristic digital portfolio of Charles.',
    url: 'https://example.com',
    siteName: 'Charles Portfolio',
    images: [{ url: 'https://example.com/og.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-dark-bg text-white selection:bg-accent-cyan selection:text-dark-bg">
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <CommandPalette />
          <main>{children}</main>
          <AIWidget />
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}