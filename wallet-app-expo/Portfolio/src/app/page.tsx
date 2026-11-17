import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TerminalSection } from '@/components/sections/TerminalSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ServicesSection />
      <ProjectsSection />
      <StatsSection />
      <ExperienceSection />
      <TerminalSection />
      <ContactSection />
    </>
  );
}